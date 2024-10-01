import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        // Redirect to Instagram OAuth URL
        const redirectUri = 'http://localhost:3000/auth/instagram/callback'; // Update this to your redirect URI
        window.location.href = `https://api.instagram.com/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`;
    };

    const handleOAuthCallback = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            try {
                const response = await axios.post('http://localhost:5000/api/auth/instagram', { code });
                const { instagramId, username, email, accessToken } = response.data;

                // Optionally, store user data in local state or context
                console.log({ instagramId, username, email, accessToken });
            } catch (err) {
                setError(err.response.data.error_message || 'Error during login');
            }
        }
    };

    // Call handleOAuthCallback when the component mounts
    React.useEffect(() => {
        handleOAuthCallback();
    }, []);

    return (
        <div>
            <h2>Register with Instagram</h2>
            <button onClick={handleLogin}>Login with Instagram</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Register;
