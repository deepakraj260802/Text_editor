const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const jwt = require('jsonwebtoken');

// Initiate Google OAuth for Login (state = 'login')
router.get('/google/login', passport.authenticate('google', {
  scope: [
    'profile',
    'email',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/documents'
  ],
  state: 'login'
}));

// Initiate Google OAuth for Sign Up (state = 'signup')
router.get('/google/signup', passport.authenticate('google', {
  scope: [
    'profile',
    'email',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/documents'
  ],
  state: 'signup'
}));

// OAuth callback route for both flows
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: 'https://enchanting-hotteok-537f42.netlify.app/login' }),
  (req, res) => {
    // Create a JWT upon successful authentication and redirect to editor.
    const token = jwt.sign({ user: req.user }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.redirect(`https://enchanting-hotteok-537f42.netlify.app/?token=${token}`);
  }
);

module.exports = router;




