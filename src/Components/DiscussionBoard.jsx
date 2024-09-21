import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, Button, TextField, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import * as signalR from '@microsoft/signalr';
import { useAuth } from "./context";

export default function DiscussionBoard() {
    const { url, token } = useAuth();
    const { department } = useParams();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [connection, setConnection] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`${url}/Comments`, {
                params: { department: department },
                // headers: { Authorization: `Bearer ${token}` }
            });
            setComments(response.data); // Adjust this based on the actual structure
            setLoading(false); // Set loading to false after fetching
        } catch (err) {
            console.error('Error fetching comments:', err);
            setError('Failed to load comments.');
            setLoading(false); // Ensure loading is false in case of error
        }
    };
    fetchComments();
    useEffect(() => {
        const joinChatRoom = async (department) => {
            //         if (connection) return;

            //         try {
            //             const conn = new signalR.HubConnectionBuilder()
            //                 .withUrl(`${url}/chat`, {
            //                     transport: signalR.HttpTransportType.WebSockets
            //                 })
            //                 .configureLogging(signalR.LogLevel.Information)
            //                 .build();

            //             conn.on("ReceiveMessage", (comment) => {
            //                 setComments(prevComments => [...prevComments, comment]);
            //             });

            //             await conn.start();
            //             await conn.invoke("JoinSpecificGroup", department);

            //             setConnection(conn);
            //             setLoading(false);
            //         } catch (err) {
            //             console.error('Error connecting to chat room:', err);
            //             setError('Failed to connect to the chat room.');
            //             setLoading(false);
            //         }
        };

        joinChatRoom(department);

        //     return () => {
        //         if (connection) {
        //             connection.stop();
        //         }
        //     };
    }, [department, connection]);

    const handleSubmit = async (e) => {
        // e.preventDefault();

        // if (!newComment.trim()) return;

        // try {
        //     await connection.invoke("SendMessage", department, newComment);
        //     setNewComment('');
        // } catch (err) {
        //     console.error('Error sending message:', err);
        //     setError('Failed to send message.');
        // }
    };

    return (
        <div style={styles.discussionBoardContainer}>
            <h2 style={styles.departmentHeading}>{department} Discussion Board</h2>
            {loading ? (
                <CircularProgress style={styles.circularProgress} />
            ) : error ? (
                <div style={styles.error}>{error}</div>
            ) : (
                <List style={styles.commentsList}>
                    {comments.map((comment, index) => (
                        <ListItem key={index} style={styles.commentListItem}>
                            <Card style={styles.commentCard}>
                                <ListItemText
                                    primary={comment.message}
                                    secondary={new Date(comment.timestamp).toLocaleString()}
                                    primaryTypographyProps={{ style: styles.commentText }}
                                    secondaryTypographyProps={{ style: styles.commentTimestamp }}
                                />
                            </Card>
                        </ListItem>
                    ))}
                </List>
            )}
            <form onSubmit={handleSubmit} style={styles.commentForm}>
                <TextField
                    placeholder="Start a discussion"
                    variant="outlined"
                    onChange={(e) => setNewComment(e.target.value)}
                    value={newComment}
                    style={styles.commentInput}
                />
                <Button type="submit" variant="contained" style={styles.postButton}>Post</Button>
            </form>
        </div>
    );
}

const styles = {
    discussionBoardContainer: {
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#1f1f1f',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        maxWidth: '1200px',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    departmentHeading: {
        marginBottom: '24px',
        fontSize: '28px',
        fontWeight: '600',
        color: '#20ebe4',
        textAlign: 'center',
    },
    commentsList: {
        width: '100%',
        maxHeight: '400px',
        overflowY: 'auto',
        padding: '0',
        marginBottom: '20px',
    },
    commentListItem: {
        marginBottom: '15px',
    },
    commentCard: {
        padding: '16px',
        backgroundColor: '#2c2c2c', // Slightly lighter dark background for better contrast
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
            transform: 'scale(1.02)',
        },
    },
    commentText: {
        color: '#e0e0e0', // Light gray for better contrast
    },
    commentTimestamp: {
        color: '#a0a0a0', // Gray for timestamp
    },
    commentForm: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        marginTop: '20px',
    },
    commentInput: {
        marginBottom: '10px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        fontSize: '16px',
    },
    postButton: {
        alignSelf: 'flex-end',
        width: '150px',
        height: '48px',
        backgroundColor: '#4caf50',
        color: '#fff',
        fontWeight: '600',
        textTransform: 'none',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        '&:hover': {
            backgroundColor: '#388e3c',
        },
    },
    error: {
        color: '#ff4d4d',
        marginBottom: '10px',
        textAlign: 'center',
    },
    circularProgress: {
        color: '#20ebe4',
    }
};
