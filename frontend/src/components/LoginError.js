// src/components/LoginError.js
import React from 'react';

const LoginError = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Login Failed</h2>
      <p>User does not exist. Please sign up first.</p>
      <a href="https://text-editor-s3pa.onrender.com/auth/google/signup">Sign Up with Google</a>
    </div>
  );
};

export default LoginError;
