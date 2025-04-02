// src/components/Signup.js
import React from 'react';
import './Signup.css';

const Signup = () => {
  const handleSignup = () => {
    console.log('Signup button clicked');
    // Redirect to backend signup endpoint on port 5000
    window.location.href = 'https://merry-melomakarona-c50f0e.netlify.app/signup';
  };

  return (
    <div className="signup-container">
      <h2>Create Your Letter App Account</h2>
      <p>If you don't have an account, please sign up.</p>
      <button className="signup-button" onClick={handleSignup}>
        Sign Up with Google
      </button>
      <p style={{ marginTop: '20px' }}>
        Already have an account? <a href="/">Sign in here</a>
      </p>
    </div>
  );
};

export default Signup;
