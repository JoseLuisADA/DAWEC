// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Registrarse from './components/Registrarse';
import PerfilUsuario from './components/PerfilUsuario';
import ForoWiki from './components/ForoWiki';
import UsuarioContext from './components/UsuarioContext'; // Asegúrate de importar UsuarioContext
import { auth } from './firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <UsuarioContext.Provider value={user}> {/* Envuelve tus componentes con UsuarioContext.Provider */}
      <Router>
        <Routes>
          <Route path="/registrarse" element={<Registrarse />} />
          <Route path="/login" element={<Login />} />
          <Route path="/perfil" element={user ? <PerfilUsuario /> : <Navigate to="/login" />} />
          <Route path="/" element={user ? <ForoWiki /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </UsuarioContext.Provider>
  );
}

export default App;
