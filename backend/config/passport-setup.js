const passport = require('passport');
const InstagramStrategy = require('passport-instagram').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(new InstagramStrategy({
    clientID: process.env.INSTAGRAM_CLIENT_ID,
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/auth/instagram/callback'
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ instagramId: profile.id }).then(existingUser => {
        if (existingUser) {
            done(null, existingUser);
        } else {
            new User({
                instagramId: profile.id,
                username: profile.username,
                email: profile._json.email,  // Note: Instagram API requires permissions for email
                accessToken: accessToken,
            })
            .save()
            .then(user => {
                done(null, user);
            });
        }
    });
}));
