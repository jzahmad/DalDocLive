import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "./context";
import Logout from './logout';

export default function Upload() {
    const { auth, url, token } = useAuth();
    const [documentType, setDocumentType] = useState('');
    const [type, setType] = useState("");
    const [term, setTerm] = useState('');
    const [year, setYear] = useState('');
    const [pdfData, setPdfData] = useState(null);

    const [showTerm, setShowTerm] = useState(false);
    const [showDes, setShowDes] = useState(false);
    const [showUpload, setShowUpload] = useState(false);
    const [message, setMessage] = useState("");

    const { course } = useParams();

    const handleDocumentTypeChange = (event) => {
        setDocumentType(event.target.value);
        setShowDes(true);
    };

    const handleTermChange = (event) => {
        setTerm(event.target.value);
    };

    const handleType = (event) => {
        setType(event.target.value);
        setShowTerm(true);
    };

    const handleYearChange = (event) => {
        setYear(event.target.value);
        setShowUpload(true);
    };

    const handleFileLoad = (event) => {
        const file = event.target.files[0];
        setPdfData(file);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("course", course);
        formData.append("type", type);
        formData.append('documentType', documentType);
        formData.append('term', term);
        formData.append('year', year);
        formData.append('file', pdfData);

        try {
            console.log(url,formData)
            const response = await axios.post(`${url}/Upload`, formData, {
                headers: {
                     'Content-Type': 'multipart/form-data'
                    , Authorization: `Bearer ${token}`
                }
            });
            setMessage(response.data);
        } catch (error) {
            setMessage('Error uploading file');
            console.error('Error uploading file:', error);
        }
    };

    // Determine if submit button should be enabled
    const isSubmitDisabled = !documentType || !type || !term || !year || !pdfData;

    return (
        <div style={styles.container}>
            <Logout />
            <h1 style={styles.header}>Upload the document for {course}</h1>
            <div style={styles.formGroup}>
                <label style={styles.label}>Select the Document Type:</label>
                <select onChange={handleDocumentTypeChange} style={styles.input}>
                    <option value="">--Select--</option>
                    <option value="A">Assignment</option>
                    <option value="Ou">Outlines</option>
                    <option value="E">Exams</option>
                    <option value="N">Notes</option>
                    <option value="Ot">Others</option>
                </select>
            </div>
            {showDes && (
                <div style={styles.formGroup}>
                    <label style={styles.label}>Add Description:</label>
                    <input placeholder='Assignment No, Prof for Outline & Notes' onChange={handleType} style={styles.input} />
                </div>
            )}
            {showTerm && (
                <div style={styles.formGroup}>
                    <label htmlFor="termSelect" style={styles.label}>Select the Term:</label>
                    <select id="termSelect" onChange={handleTermChange} style={styles.input}>
                        <option value="">--Select--</option>
                        <option value="Fall">Fall</option>
                        <option value="Winter">Winter</option>
                        <option value="Summer">Summer</option>
                    </select>
                    <label htmlFor="yearSelect" style={styles.label}>Enter the Year:</label>
                    <select id="yearSelect" onChange={handleYearChange} style={styles.input}>
                        <option value="">--Select--</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                    </select>
                </div>
            )}
            {showUpload && (
                <div style={styles.formGroup}>
                    <label style={styles.label}>Upload Document (PDF only):</label>
                    <input type="file" accept=".pdf" name="file" onChange={handleFileLoad} style={styles.input} />
                </div>
            )}
            <button onClick={handleSubmit} disabled={isSubmitDisabled} style={styles.submitBtn}>Submit</button>
            {message && <p style={styles.message}>{message}</p>}
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #333',
        borderRadius: '5px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        backgroundColor: '#000', // Black background color
        color: '#fff', // White text color
        marginBottom: '20px',
    },
    header: {
        textAlign: 'center',
        color: '#fff',
        marginBottom: '20px',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        color: '#fff',
        marginBottom: '5px',
        display: 'block',
    },
    input: {
        width: 'calc(100% - 22px)',
        borderRadius: '5px',
        border: '1px solid #555',
        padding: '10px',
        backgroundColor: '#222', // Darker background for inputs
        color: '#fff',
    },
    submitBtn: {
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        cursor: 'pointer',
        borderRadius: '5px',
        fontSize: '16px',
    },
    message: {
        marginTop: '10px',
        color: '#28a745',
        fontWeight: 'bold',
    }
};
