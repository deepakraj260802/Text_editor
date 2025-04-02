// // Example auth.js snippet
// const express = require('express');
// const router = express.Router();
// const passport = require('../config/passport');

// router.get('/google', passport.authenticate('google', {
//   scope: ['profile', 'email', 'https://www.googleapis.com/auth/drive.file']
// }));
// // This route initiates the Google OAuth flow with the required scopes
// router.get('/google', passport.authenticate('google', {
//   scope: [
//     'profile',
//     'email',
//     'https://www.googleapis.com/auth/drive.file',
//     'https://www.googleapis.com/auth/documents'
//   ]
// }));


// router.get('/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   (req, res) => {
//     // Create a JWT here and redirect (your existing code)
//     const jwt = require('jsonwebtoken');
//     const token = jwt.sign({ user: req.user }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.redirect(`http://localhost:3000/?token=${token}`);
//   }
// );

// module.exports = router;

// backend/routes/auth.js
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
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login' }),
  (req, res) => {
    // Create a JWT upon successful authentication and redirect to editor.
    const token = jwt.sign({ user: req.user }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.redirect(`http://localhost:3000/?token=${token}`);
  }
);

module.exports = router;




