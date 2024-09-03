import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from "./context";
import { useNavigate, Link } from 'react-router-dom';  // Import the Link component

function CreateAccount() {
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [messages, setMessages] = useState("");
    const { url } = useAuth();
    const navigate = useNavigate();  // Initialize useNavigate

    const handleSubmit = async (event) => {
        event.preventDefault();

        const dalEmailRegex = /@dal\.ca$/;
        if (!dalEmailRegex.test(email)) {
            setMessages("Email must end with @dal.ca.");
            return;
        }

        if (email !== confirmEmail) {
            setMessages("Email and Confirm Email do not match.");
            return;
        }

        if (password !== confirmPassword) {
            setMessages("Password and Confirm Password do not match.");
            return;
        }

        try {
            const res = await axios.post(`${url}/register`, { email, password });
            setMessages(res.data.message || "Account created successfully!");
        } catch (error) {
            const errorMessages = error.response?.data?.errors;
            if (typeof errorMessages === 'object') {
                const formattedMessages = Object.keys(errorMessages).map(key => (
                    <div key={key}>{`${errorMessages[key]}`}</div>
                ));
                setMessages(formattedMessages);
            } else {
                setMessages("Error creating account. Please try again.");
            }
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#000' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#1a1a1a', padding: '40px', borderRadius: '12px', boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)', width: '400px' }}>
                <div>
                    <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '30px' }}>Create an Account</h2>
                    {messages && <div style={{ textAlign: 'center', marginBottom: '20px', color: 'red' }}>{messages}</div>}
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="email" style={{ display: 'block', marginBottom: '10px', color: 'white' }}>Email address:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px', backgroundColor: '#333', color: 'white' }}
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="confirmEmail" style={{ display: 'block', marginBottom: '10px', color: 'white' }}>Confirm Email address:</label>
                        <input
                            type="email"
                            id="confirmEmail"
                            value={confirmEmail}
                            onChange={(e) => setConfirmEmail(e.target.value)}
                            required
                            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px', backgroundColor: '#333', color: 'white' }}
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="password" style={{ display: 'block', marginBottom: '10px', color: 'white' }}>Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px', backgroundColor: '#333', color: 'white' }}
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '10px', color: 'white' }}>Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px', backgroundColor: '#333', color: 'white' }}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    style={{
                        backgroundColor: '#4caf50',
                        color: 'white',
                        padding: '12px 24px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        width: '100%',
                        transition: 'background-color 0.3s ease',
                        marginBottom: '20px'  // Space between button and bottom
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#4caf50'}
                >
                    Create Account
                </button>
                <Link to="/" style={{ color: '#20ebe4', textAlign: 'center', display: 'block', textDecoration: 'none' }}>
                    Go Back
                </Link>
            </form>
        </div>
    );
}

export default CreateAccount;
