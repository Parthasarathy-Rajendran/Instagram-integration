import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MessageMonitor = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get('http://localhost:5000/auth/current_user');
            setUser(res.data);
        };
        fetchUser();
    }, []);

    return (
        <div>
            <h2>Message Monitor</h2>
            {user ? (
                <div>
                    <h3>Welcome, {user.username}</h3>
                    <p>Your follow-up message: {user.followUpMessage}</p>
                    <p>Message Received At: {user.messageReceived ? new Date(user.messageReceived).toString() : 'No messages yet.'}</p>
                </div>
            ) : (
                <p>Please log in to see your messages.</p>
            )}
        </div>
    );
};

export default MessageMonitor;
