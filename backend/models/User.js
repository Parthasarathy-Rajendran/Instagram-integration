const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    instagramId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    accessToken: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
