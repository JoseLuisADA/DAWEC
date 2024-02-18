import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import UserProfile from './UserProfile.js';
import PrivateRoute from './PrivateRoute.js';

// Importa otros componentes necesarios

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;