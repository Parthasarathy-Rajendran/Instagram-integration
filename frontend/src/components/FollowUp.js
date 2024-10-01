import React, { useState } from 'react';
import axios from 'axios';

const FollowUp = () => {
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/auth/setFollowUpMessage', { message });
        alert('Follow-up message updated!');
    };

    return (
        <div>
            <h2>Customize Follow-Up Message</h2>
            <form onSubmit={handleSubmit}>
                <textarea 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    placeholder="Enter your follow-up message"
                />
                <button type="submit">Save Message</button>
            </form>
        </div>
    );
};

export default FollowUp;
