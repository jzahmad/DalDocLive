import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import axios from "axios";
import DiscussionBoard from './DiscussionBoard';
import { useAuth } from "./context";
import { Button, TextField, Grid } from '@mui/material';
import Logout from './logout';

export default function DepartmentInfo() {
    const { auth, token, url } = useAuth();
    const { department } = useParams();
    const navigate = useNavigate();

    const [value, setValue] = useState(0);
    const [searchInput, setSearchInput] = useState("");
    const [courses, setCourses] = useState([]);
    const [sendcourse, setSendCourse] = useState("");
    const [sendcode, setSendCode] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${url}/courses`, {
                    params: { department: department },
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, [department, url, token]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    function goto(course) {
        navigate(`/${department}/${course}`);
    }

    const filteredCourses = courses.filter(course =>
        course.toLowerCase().includes(searchInput.toLowerCase())
    );

    const handleSubmit = async (event) => {
        event.preventDefault();
        const send = sendcourse + sendcode;

        try {
            const response = await axios.post(`${url}/CourseReq`,
                { department: department, course: send }
            );
            setMessage(response.data.message);
            setSendCourse("");
            setSendCode("");
        } catch (error) {
            console.error('Error adding course:', error);
        }
    };

    return (
        <div style={styles.departmentInfoContainer}>
            <Logout />
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" style={styles.tabs}>
                <Tab label="Courses" style={styles.tab} />
                <Tab label="Q&A" style={styles.tab} />
            </Tabs>
            {value === 0 && (
                <div style={styles.coursesContainer}>
                    <Typography variant="h2" style={styles.departmentTitle}>{department}</Typography>
                    <Typography variant="h4" style={styles.courseCount}>Number of courses: {courses.length}</Typography>
                    <Typography variant="h3" style={styles.sectionTitle}>All Courses</Typography>
                    <TextField
                        className="search-input"
                        placeholder="Find your course"
                        value={searchInput}
                        onChange={handleInputChange}
                        style={styles.searchInput}
                    />
                    <Card className="card" style={styles.card}>
                        <CardContent>
                            {filteredCourses.map((course, index) => (
                                <Typography key={index} onClick={() => goto(course)} style={styles.courseItem}>
                                    {course}
                                </Typography>
                            ))}
                        </CardContent>
                    </Card>
                    <div style={styles.spacer} /> {/* Spacer for adding space between sections */}
                    <Typography variant="h3" style={styles.sectionTitle}>Any Course Missing?</Typography>
                    <form className="form" onSubmit={handleSubmit} style={styles.form}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={6}>
                                <TextField
                                    className="form-input"
                                    name="courseName"
                                    variant="outlined"
                                    fullWidth
                                    placeholder='Course Code'
                                    value={sendcourse}
                                    onChange={(e) => setSendCourse(e.target.value)}
                                    style={styles.formInput}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    className="form-input"
                                    name="courseCode"
                                    variant="outlined"
                                    fullWidth
                                    placeholder='Course Number'
                                    value={sendcode}
                                    onChange={(e) => setSendCode(e.target.value)}
                                    style={styles.formInput}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Button type="submit" variant="contained" color="primary" style={styles.submitBtn}>Submit</Button>
                            </Grid>
                        </Grid>
                    </form>
                    <Typography style={styles.message}>{message}</Typography>
                </div>
            )}
            {value === 1 && <DiscussionBoard />}
        </div>
    );
}

const styles = {
    departmentInfoContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: '#000',
        color: '#fff',
        minHeight: '100vh',
        position: 'relative',
    },
    title: {
        marginBottom: '20px',
        textAlign: 'center',
        color: '#20ebe4',
    },
    tabs: {
        width: '100%',
        marginBottom: '20px',
        zIndex: 1, // Ensure tabs are on top
    },
    tab: {
        fontWeight: 'bold',
        color: '#fff',
    },
    coursesContainer: {
        width: '100%',
        maxWidth: '1200px',
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#1f1f1f',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    },
    departmentTitle: {
        textAlign: 'center',
        marginBottom: '10px',
    },
    courseCount: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    sectionTitle: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    searchInput: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#fff',
        color: '#000',
    },
    card: {
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    courseItem: {
        cursor: 'pointer',
        padding: '10px',
        margin: '5px',
        backgroundColor: '#333',
        borderRadius: '5px',
        transition: 'background-color 0.3s ease',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#555',
        }
    },
    form: {
        marginTop: '20px',
        padding: '10px',
        backgroundColor: '#333',
        borderRadius: '8px',
    },
    formInput: {
        backgroundColor: '#fff',
        color: '#000',
    },
    submitBtn: {
        backgroundColor: '#4caf50',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        textTransform: 'uppercase',
    },
    message: {
        marginTop: '20px',
        color: 'green',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    spacer: {
        marginBottom: '30px', // Space between sections
    },
};
