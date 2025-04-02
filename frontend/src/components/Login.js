// // frontend/src/components/Login.js
// import React from 'react';
// import './Login.css';

// const Login = () => {
//   const handleLogin = () => {
//     // Redirect to your backend OAuth endpoint
//     window.location.href = 'http://localhost:5000/auth/google';
//   };

//   return (
//     <div className="login-container">
//       <h2>Welcome to Letter App</h2>
//       <p>Please sign in to start writing your letters.</p>
//       <button className="login-button" onClick={handleLogin}>
//         Sign in with Google
//       </button>
//     </div>
//   );
// };

// export default Login;


// src/components/Login.js
import React from 'react';
import './Login.css';

const Login = () => {
  const handleLogin = () => {
    console.log('Login button clicked');
    // Redirect to the backend login endpoint on port 5000
    window.location.href = 'https://merry-melomakarona-c50f0e.netlify.app/login';
  };

  const handleSignupRedirect = () => {
    console.log('Signup button clicked');
    // Redirect to the signup page (frontend route)
    window.location.href = 'https://merry-melomakarona-c50f0e.netlify.app/signup';
  };

  return (
    <div className="login-container">
      <h2>Welcome to Letter App</h2>
      <p>Please choose an option:</p>
      <div className="button-group">
        <button className="login-button" onClick={handleLogin}>
          Sign In with Google
        </button>
        <button className="signup-button" onClick={handleSignupRedirect}>
          Sign Up with Google
        </button>
      </div>
    </div>
  );
};

export default Login;







