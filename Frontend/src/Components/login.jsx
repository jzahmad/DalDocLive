import React, { useState } from "react";
import { useAuth } from "./context";
import { Link } from 'react-router-dom';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: ""
    });
    const auth = useAuth();
    const [message, setMessage] = useState("");

    const handleSubmitEvent = async (e) => {
        e.preventDefault();
        try {
            const response = await auth.loginAction(input);
            setMessage("Login successful!");
        } catch (error) {
            setMessage("Error: Invalid email or password.");
        }
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#000' }}>
            <form onSubmit={handleSubmitEvent} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#1a1a1a', padding: '40px', borderRadius: '12px', boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)', width: '400px', height: 'auto' }}>
                <div>
                    <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '30px' }}>Login</h2>
                    {message && <div style={{ textAlign: 'center', marginBottom: '20px', color: 'red' }}>{message}</div>}
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="user-email" style={{ display: 'block', marginBottom: '10px', color: 'white' }}>Email:</label>
                        <input
                            type="email"
                            id="user-email"
                            name="email"
                            placeholder="example@dal.ca"
                            onChange={handleInput}
                            value={input.email}
                            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px', backgroundColor: '#333', color: 'white' }}
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="password" style={{ display: 'block', marginBottom: '10px', color: 'white' }}>Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={handleInput}
                            value={input.password}
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
                    Submit
                </button>
                <Link to="/create" style={{ color: '#20ebe4', textAlign: 'center', display: 'block', textDecoration: 'none' }}>
                    Create Account
                </Link>
            </form>
        </div>
    );
};

export default Login;
