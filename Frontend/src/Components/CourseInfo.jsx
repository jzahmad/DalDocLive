import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PdfViewer from '../PDFViewers/PdfViewer';
import PdfList from '../PDFViewers/PdfList';
import axios from 'axios';
import { useAuth } from "./context";
import Logout from './logout';

export default function CourseInfo() {
    const { auth, url } = useAuth();
    const { course } = useParams();

    const [value, setValue] = useState(0);
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState('');
    const [viewPdf, setViewPdf] = useState(false);
    const [pdffiles, setPdfFiles] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const fetchPdfs = async () => {
            try {
                const response = await axios.get(`${url}/pdf`, {
                    params: { course: course }
                });
                setPdfFiles(response.data.files);
            } catch (error) {
                console.error('Error fetching PDFs:', error);
            }
        };
        fetchPdfs();
    }, [course]);

    const Assignmnetsregex = /.*A.*$/;
    const Notesregex = /.*N.*$/;
    const Othersregex = /.*Ot.*$/;
    const Examsregex = /.*E.*$/;
    const Outlinesregex = /.*Ou.*$/;

    const Assignments = pdffiles.filter(pdf => Assignmnetsregex.test(pdf.fileName));
    const Outlines = pdffiles.filter(pdf => Outlinesregex.test(pdf.fileName));
    const Exams = pdffiles.filter(pdf => Examsregex.test(pdf.fileName));
    const Notes = pdffiles.filter(pdf => Notesregex.test(pdf.fileName));
    const Others = pdffiles.filter(pdf => Othersregex.test(pdf.fileName));

    const handlePdfClick = (pdfUrl, fileName) => {
        setSelectedPdf(pdfUrl);
        setSelectedFileName(fileName);
        setViewPdf(true);
    };

    const goBack = () => {
        setViewPdf(false);
    };

    return (
        <div style={styles.pageContainer}>
            <div style={styles.container}>
                {!viewPdf && (
                    <>
                        <Logout />
                        <h1 style={styles.heading}>{course}</h1>
                        <Link to={`/upload/${course}`} style={styles.uploadLink}>
                            Upload Missing Document
                        </Link>
                    </>
                )}
                {viewPdf && (
                    <button
                        onClick={goBack}
                        style={styles.goBackButton}
                    >
                        Go Back
                    </button>
                )}
                {!viewPdf && (
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                        style={styles.tabs}
                    >
                        <Tab label="Assignments" style={styles.tab} />
                        <Tab label="Outlines" style={styles.tab} />
                        <Tab label="Exams" style={styles.tab} />
                        <Tab label="Notes" style={styles.tab} />
                        <Tab label="Other" style={styles.tab} />
                    </Tabs>
                )}
                {(!viewPdf && value === 0) && (
                    <div className='container'>
                        <PdfList pdfFiles={Assignments} handlePdfClick={handlePdfClick} />
                    </div>
                )}
                {(!viewPdf && value === 1) && (
                    <div className='container'>
                        <PdfList pdfFiles={Outlines} handlePdfClick={handlePdfClick} />
                    </div>
                )}
                {(!viewPdf && value === 2) && (
                    <div className='container'>
                        <PdfList pdfFiles={Exams} handlePdfClick={handlePdfClick} />
                    </div>
                )}
                {(!viewPdf && value === 3) && (
                    <div className='container'>
                        <PdfList pdfFiles={Notes} handlePdfClick={handlePdfClick} />
                    </div>
                )}
                {(!viewPdf && value === 4) && (
                    <div className='container'>
                        <PdfList pdfFiles={Others} handlePdfClick={handlePdfClick} />
                    </div>
                )}
                {viewPdf && (
                    <PdfViewer selectedPdf={selectedPdf} fileName={selectedFileName} />
                )}
            </div>
        </div>
    );
}

const styles = {
    pageContainer: {
        backgroundColor: '#000000', // Black background for the entire page
        minHeight: '100vh', // Ensure it covers the full viewport height
        color: '#e0e0e0', // Light text color for contrast
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
    },
    container: {
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#1f1f1f', // Darker background for the content area
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        width: '100%',
        maxWidth: '900px', // Optional: Adjust as needed
    },
    heading: {
        marginBottom: '20px',
        color: '#20ebe4',
    },
    link: {
        color: '#3f51b5',
        textDecoration: 'none',
        marginBottom: '20px',
        display: 'block',
    },
    uploadLink: {
        color: '#3f51b5',
        textDecoration: 'none',
        marginBottom: '20px',
        display: 'block',
    },
    goBackButton: {
        backgroundColor: '#607d8b',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        marginBottom: '20px',
        cursor: 'pointer',
        borderRadius: '8px',
    },
    tabs: {
        marginBottom: '20px',
    },
    tab: {
        color: '#3f51b5',
        fontWeight: 'bold',
    },
};
