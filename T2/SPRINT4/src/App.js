// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Registrarse from './components/Registrarse';
import PerfilUsuario from './components/PerfilUsuario';
import ForoWiki from './components/ForoWiki';
import UsuarioContext from './components/UsuarioContext';
import { auth } from './firebase-config';
import { onAuthStateChanged, signOut } from 'firebase/auth';

function App() {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Guardar datos del usuario en el estado
                setUsuario({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                });
            } else {
                setUsuario(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <UsuarioContext.Provider value={{ usuario }}>
            <Router>
                <Routes>
                    <Route path="/registrarse" element={<Registrarse />} />
                    <Route path="/login" element={<Login onLogin={setUsuario} />} />
                    <Route path="/perfil" element={usuario ? <PerfilUsuario /> : <Navigate to="/login" />} />
                    <Route path="/" element={<ForoWiki />} />
                </Routes>
            </Router>
        </UsuarioContext.Provider>
    );
}

export default App;
