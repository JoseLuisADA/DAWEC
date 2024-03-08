// src/components/Registrarse.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase-config'; // Asegúrate de que la ruta es correcta
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'; 
import { doc, setDoc } from "firebase/firestore";
import BotonesNavegacion from './BotonesNavegacion';

function SignUp() {
    const [nombre, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        if (email !== '' && !/^\S+@\S+\.\S+$/.test(email)) {
            setEmailError('Formato de correo no válido.');
        } else {
            setEmailError('');
        }
    }, [email]);

    useEffect(() => {
        if (password !== '' && password.length < 6) {
            setPasswordError('La contraseña debe tener al menos 6 caracteres.');
        } else {
            setPasswordError('');
        }
    }, [password]);
    
    const register = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            // Actualizar el perfil del usuario para incluir el displayName
            await updateProfile(user, {
                displayName: nombre
            });
    
            // Crear un documento en Firestore para el nuevo usuario con user.uid como ID
            await setDoc(doc(db, "usuario", user.uid), {
                usuarioID: `${user.uid}`,
                nombre: `${nombre}`, // Este es el nombre del usuario almacenado en Firestore
                avatar: "",
                rol: "usuario"
            });
            navigate('/login');
        } catch (error) {
            console.error("Error al registrar el usuario:", error);
            setMessage('Registro incorrecto.');
        }
    };

    return (
        <div className="form-container">
            <BotonesNavegacion/>
            <h2 className="form-title">Registrarse</h2>
            <input className="form-input" type="text" value={nombre} onChange={(e) => setName(e.target.value)} placeholder="Nombre de usuario" required />
            <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
            <input className="form-input" title="La contraseña debe tener al menos 6 caracteres" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required minLength="6" />
            {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
            <button className="form-button" onClick={register}>Registrarse</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default SignUp;
