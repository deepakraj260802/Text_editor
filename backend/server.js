// backend/server.js
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('./config/passport');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'https://enchanting-hotteok-537f42.netlify.app',
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

