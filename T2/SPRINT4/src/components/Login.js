// src/components/Login.js
import React, { useState } from 'react';
import { auth } from '../firebase-config.js'; // Asegúrate de que la ruta es correcta
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const login = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error) {
            console.error(error);
            setMessage('Error al iniciar sesión. Por favor, verifica tus credenciales.');
        }
    };

    return (
        <div className="form-container">
            <a href="http://localhost:3000/registrarse">Registrarse</a>
            <h2 className="form-title">Iniciar Sesión</h2>
            <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
            <button className="form-button" onClick={login}>Iniciar Sesión</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default SignIn;
