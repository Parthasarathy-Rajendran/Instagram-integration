const express = require('express');
const axios = require('axios');
const router = express.Router();
const User = require('../models/User'); // Your User model

const CLIENT_ID = process.env.INSTAGRAM_CLIENT_ID;
const CLIENT_SECRET = process.env.INSTAGRAM_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI; // Your redirect URI

router.post('/instagram', async (req, res) => {
    const { code } = req.body;

    try {
        // Step 1: Exchange code for access token
        const tokenResponse = await axios.post(`https://api.instagram.com/oauth/access_token`, {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: 'authorization_code',
            redirect_uri: REDIRECT_URI,
            code,
        });

        const { access_token, user } = tokenResponse.data;

        // Step 2: Retrieve additional user info
        const userProfileResponse = await axios.get(`https://graph.instagram.com/me?fields=id,username,email&access_token=${access_token}`);
        const profile = userProfileResponse.data;

        // Create or update user in the database
        const newUser = {
            instagramId: profile.id,
            username: profile.username,
            email: profile.email,  // Note: Ensure the app has permission to access the email
            accessToken: access_token,
        };

        // Check if user already exists
        let existingUser = await User.findOne({ instagramId: profile.id });
        if (existingUser) {
            // Update user if exists
            existingUser.accessToken = access_token; // Update access token if needed
            await existingUser.save();
        } else {
            // Create new user
            existingUser = new User(newUser);
            await existingUser.save();
        }

        return res.status(200).json(existingUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error_message: error.message });
    }
});

module.exports = router;
