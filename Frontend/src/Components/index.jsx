import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Tabs } from "flowbite-react";
import axios from "axios";
import { useAuth } from "./context";
import { Button, TextField, Grid, Box } from '@mui/material';
import Logout from './logout';

export default function Index() {
    const { url, token } = useAuth();
    const navigate = useNavigate();
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axios.get(`${url}/departments`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setDepartments(response.data);
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };
        fetchDepartments();
    }, [url, token]);

    function sortDepartments(alphabet) {
        return departments.filter(department => department.name.charAt(0).toUpperCase() === alphabet);
    }

    function goto(department) {
        setSelectedDepartment(department);
        navigate(`/${department}`);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newDepartment = event.target.department.value;
        event.target.reset();

        try {
            const response = await axios.post(`${url}/DepartmentReq`,
                { 
                    department: newDepartment 
                },
                {
                    // headers: { Authorization: `Bearer ${token}` }
                });
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error adding department:', error);
        }
    };

    const handleTabChange = (alphabet) => {
        // Handle tab change if needed
    };

    return (
        <div style={{ 
            backgroundColor: 'black', 
            color: 'white', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            minHeight: '100vh', 
            padding: '20px' 
        }}>
            <Logout />
            <Typography variant="h1" style={{ 
                marginBottom: '10px', 
                textAlign: 'center',
                fontSize: '2.5rem'
            }}>Welcome to DalDoc</Typography>
            <Typography variant="h4" style={{ 
                marginBottom: '20px', 
                textAlign: 'center',
                fontSize: '1.5rem'
            }}>Find the study resources you need for all your classes. DalDoc has study documents, questions, and answers to help you study and learn.</Typography>
            <Typography variant="h2" style={{ 
                marginBottom: '20px', 
                textAlign: 'center',
                fontSize: '2rem'
            }}>Find Your Department</Typography>
            <Card style={{ 
                width: '80%', 
                marginBottom: '20px',
                backgroundColor: '#333',
                color: 'white'
            }}>
                <CardContent>
                    <Tabs aria-label="Tabs with underline" onChange={handleTabChange}>
                        {[...Array(26)].map((_, index) => (
                            <Tabs.Item key={index} title={String.fromCharCode(65 + index)} type="button" className="btn btn-primary">
                                <div style={{ 
                                    display: 'flex', 
                                    flexWrap: 'wrap', 
                                    justifyContent: 'space-around' 
                                }}>
                                    {sortDepartments(String.fromCharCode(65 + index)).map((department, deptIndex) => (
                                        <Box
                                            key={deptIndex}
                                            className={`department-item ${selectedDepartment === department.name ? 'selected' : ''}`}
                                            onClick={() => goto(department.name)}
                                            style={{ 
                                                cursor: 'pointer', 
                                                padding: '10px', 
                                                margin: '5px', 
                                                backgroundColor: '#444', 
                                                borderRadius: '5px', 
                                                transition: 'background-color 0.3s ease',
                                                width: '120px',
                                                textAlign: 'center'
                                            }}
                                        >
                                            {department.name}
                                        </Box>
                                    ))}
                                </div>
                            </Tabs.Item>
                        ))}
                    </Tabs>
                </CardContent>
            </Card>
            <Typography variant="h3" style={{ 
                marginBottom: '20px', 
                textAlign: 'center',
                fontSize: '1.5rem'
            }}>Any department Missing?</Typography>
            <form className="form" onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={8}>
                        <TextField
                            className="form-input"
                            name="department"
                            variant="outlined"
                            fullWidth
                            placeholder='Addition of a Department'
                            style={{ 
                                backgroundColor: 'white', 
                                color: 'black'
                            }} // Add background color style
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button type="submit" variant="contained" color="primary">Submit</Button>
                    </Grid>
                </Grid>
            </form>
            <Typography style={{ 
                marginTop: '20px', 
                color: 'green', 
                fontWeight: 'bold', 
                textAlign: 'center'
            }}>{message}</Typography>
        </div>
    );
}
