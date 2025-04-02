// // frontend/src/App.js
// import React, { useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
// import Login from './components/Login';
// import Editor from './components/Editor';


// const Home = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // On initial load, check for token in the query string
//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search);
//     const token = queryParams.get('token');
//     if (token) {
//       localStorage.setItem('jwt', token);
//       // Remove token from URL after storing
//       navigate('/', { replace: true });
//     }
//   }, [location, navigate]);

//   // If token exists, show the Editor; otherwise, show Login
//   return localStorage.getItem('jwt') ? <Editor /> : <Login />;
// };

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/*" element={<Home />} />
//       </Routes>
//     </Router>
//   );
// }
// export default App;

// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Editor from './components/Editor';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(() => !!localStorage.getItem('jwt'));

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    if (token) {
      localStorage.setItem('jwt', token);
      setAuthenticated(true);
      navigate('/editor', { replace: true });
    }
  }, [location, navigate]);

  return authenticated ? <Editor /> : <Login />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;













