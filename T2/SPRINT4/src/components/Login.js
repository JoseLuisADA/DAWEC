// src/components/Login.js
import React, { useState } from 'react';
import { auth, db } from '../firebase-config.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import BotonesNavegacion from './BotonesNavegacion.js';

function SignIn({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Obtener los datos del usuario de la base de datos
            const userDocRef = doc(db, "usuario", user.uid);
            const userDocSnap = await getDoc(userDocRef);
            

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                const { rol } = userData;
                
                // Guardar el rol del usuario en el almacenamiento local junto con otros datos del usuario

            } else {
                console.log("No se encontraron datos para este usuario en la base de datos.");
            }

            // Llamar a la función de manejo de inicio de sesión pasada como prop
            onLogin(user);

            // Redirigir al usuario a la página principal
            navigate('/');
        } catch (error) {
            console.error(error);
            setMessage('Error al iniciar sesión. Por favor, verifica tus credenciales.');
        }
    };

    const handleInicio = () => {
        navigate('/');
      };

    return (
        <div className="form-container">
            <button className="form-button" onClick={handleInicio}>Inicio</button>
            <br/>
            <BotonesNavegacion/>
            <h2 className="form-title">Iniciar Sesión</h2>
            <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
            <button className="form-button" onClick={handleLogin}>Entrar</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default SignIn;