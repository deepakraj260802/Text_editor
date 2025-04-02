// backend/server.js
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('./config/passport');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Mount authentication routes under /auth
app.use('/auth', require('./routes/auth'));
// Mount drive routes under /drive
app.use('/drive', require('./routes/drive'));

app.get('/', (req, res) => {
  res.send('Backend is running.');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// server.js
// require('dotenv').config();
// const express = require('express');
// const session = require('express-session');
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

// const app = express();

// // In-memory user store (reset on server restart)
// const users = [];

// // Configure session middleware
// app.use(session({
//   secret: process.env.JWT_SECRET, // Replace with a strong secret in production
//   resave: false,
//   saveUninitialized: true
// }));

// // Initialize Passport and enable session support.
// app.use(passport.initialize());
// app.use(passport.session());

// // Passport: Serialize user by storing their Google profile ID.
// passport.serializeUser((user, done) => {
//   done(null, user.profile.id);
// });

// // Deserialize the user by looking them up in our in-memory store.
// passport.deserializeUser((id, done) => {
//   const user = users.find(u => u.profile.id === id);
//   done(null, user);
// });

// // Configure the Google Strategy with passReqToCallback enabled to access the OAuth state.
// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,         // Your Google Client ID
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,   // Your Google Client Secret
//     callbackURL: 'http://localhost:3000/auth/google/callback',
//     passReqToCallback: true
//   },
//   (req, accessToken, refreshToken, profile, done) => {
//     // Retrieve the mode from the OAuth state parameter: 'login' or 'signup'
//     const mode = req.query.state;
//     // Look for an existing user using their Google profile ID.
//     let user = users.find(u => u.profile.id === profile.id);

//     if (user) {
//       // If the user exists, update the access token and log them in.
//       user.accessToken = accessToken;
//       console.log('User exists, logging in:', profile.displayName);
//       return done(null, user);
//     } else {
//       if (mode === 'login') {
//         // If in login mode and user does not exist, fail authentication.
//         console.log('User does not exist; cannot log in.');
//         return done(null, false, { message: 'User does not exist. Please sign up first.' });
//       } else {
//         // If in signup mode, create a new user and add to the store.
//         user = { profile, accessToken };
//         users.push(user);
//         console.log('New user created:', profile.displayName);
//         return done(null, user);
//       }
//     }
//   }
// ));

// // Route to initiate Google OAuth for Login (state = 'login')
// app.get('/auth/google/login', passport.authenticate('google', {
//   scope: ['profile', 'email'],
//   state: 'login'
// }));

// // Route to initiate Google OAuth for Sign Up (state = 'signup')
// app.get('/auth/google/signup', passport.authenticate('google', {
//   scope: ['profile', 'email'],
//   state: 'signup'
// }));

// // Google OAuth callback route (common for both login and signup)
// app.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   (req, res) => {
//     // Successful authentication: redirect to home page.
//     res.redirect('/');
//   }
// );

// // A simple /login route to handle authentication failure.
// app.get('/login', (req, res) => {
//   res.send(`
//     <h1>Login Failed</h1>
//     <p>User does not exist. Please sign up first.</p>
//     <a href="/auth/google/signup">Sign Up with Google</a>
//   `);
// });

// // Home route: If authenticated, show welcome message; otherwise, show login and signup links.
// app.get('/', (req, res) => {
//   if (req.isAuthenticated()) {
//     res.send(`
//       <h1>Welcome, ${req.user.displayName}!</h1>
//       <p>Email: ${req.user.emails ? req.user.emails[0].value : 'No email available'}</p>
//       <a href="/logout">Logout</a>
//     `);
//   } else {
//     res.send(`
//       <h1>You are not logged in.</h1>
//       <a href="/auth/google/login">Login with Google</a><br/>
//       <a href="/auth/google/signup">Sign Up with Google</a>
//     `);
//   }
// });

// // Logout route
// app.get('/logout', (req, res, next) => {
//   req.logout(err => {
//     if (err) { return next(err); }
//     res.redirect('/');
//   });
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server started on http://localhost:${PORT}`);
// });



