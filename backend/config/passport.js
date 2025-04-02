// // backend/config/passport.js
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

// // In-memory user store for demonstration purposes.
// // Replace this with a database in production.
// const users = [];

// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: 'http://localhost:5000/auth/google/callback',
//     passReqToCallback: true // Allows access to req for reading state
//   },
//   (req, accessToken, refreshToken, profile, done) => {
//     // Retrieve the mode from the state parameter ("login" or "signup")
//     const mode = req.query.state;
//     let user = users.find(u => u.profile.id === profile.id);

//     if (user) {
//       // User exists: update access token and log them in.
//       user.accessToken = accessToken;
//       console.log('User exists, logging in:', profile.displayName);
//       return done(null, user);
//     } else {
//       if (mode === 'login') {
//         // If login is attempted and user does not exist, fail authentication.
//         console.log('User does not exist, cannot login.');
//         return done(null, false, { message: 'User does not exist. Please sign up first.' });
//       } else {
//         // Mode is signup – create a new user.
//         user = { profile, accessToken };
//         users.push(user);
//         console.log('New user created:', profile.displayName);
//         return done(null, user);
//       }
//     }
//   }
// ));

// // Serialize user by storing the profile id
// passport.serializeUser((user, done) => {
//   done(null, user.profile.id);
// });

// // Deserialize user by finding them in our in-memory store
// passport.deserializeUser((id, done) => {
//   const user = users.find(u => u.profile.id === id);
//   done(null, user);
// });

// module.exports = passport;


// backend/config/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// In-memory user store for demonstration purposes.
const users = [];

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/auth/google/callback',
    passReqToCallback: true // So we can read req.query.state
  },
  (req, accessToken, refreshToken, profile, done) => {
    // Retrieve the mode from the state parameter ("login" or "signup")
    const mode = req.query.state;
    let user = users.find(u => u.profile.id === profile.id);

    if (user) {
      // User exists: update access token and log them in.
      user.accessToken = accessToken;
      console.log('User exists, logging in:', profile.displayName);
      return done(null, user);
    } else {
      if (mode === 'login') {
        // In login mode, if user does not exist, fail authentication.
        console.log('User does not exist; cannot log in.');
        return done(null, false, { message: 'User does not exist. Please sign up first.' });
      } else {
        // In signup mode, create a new user.
        user = { profile, accessToken };
        users.push(user);
        console.log('New user created:', profile.displayName);
        return done(null, user);
      }
    }
  }
));

// Serialize user by storing the Google profile id
passport.serializeUser((user, done) => {
  done(null, user.profile.id);
});

// Deserialize the user from our in-memory store
passport.deserializeUser((id, done) => {
  const user = users.find(u => u.profile.id === id);
  done(null, user);
});

module.exports = passport;


