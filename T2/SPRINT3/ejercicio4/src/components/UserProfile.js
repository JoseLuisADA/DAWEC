import React, { useState, useEffect } from 'react';
import { signOut, updateEmail } from 'firebase/auth';
import { auth, db, storage } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuthState } from 'react-firebase-hooks/auth';

function UserProfile() {
    const [user] = useAuthState(auth);
    const [name, setName] = useState('');
    const [newName, setNewName] = useState('');
    const [file, setFile] = useState(null);
    const [avatar, setAvatar] = useState('');
    const [userMessage, setUserMessage] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setName(docSnap.data().name);
                    setAvatar(docSnap.data().avatar);
                }
            };
            fetchData();
        }
    }, [user]);


    useEffect(() => {
        if (newEmail !== '' && !/^\S+@\S+\.\S+$/.test(newEmail)) {
            setEmailError('Formato de correo no válido.');
        } else {
            setEmailError('');
        }
    }, [newEmail]);

    const uploadImage = async () => {
        
        try{
            if (file == null || user == null) return;
            const fileRef = ref(storage, `avatars/${user.uid}`);
            await uploadBytes(fileRef, file);
            const photoURL = await getDownloadURL(fileRef);
            updateDoc(doc(db, "users", user.uid), {
                avatar: photoURL
            });
            setAvatar(photoURL);
            setUserMessage('Imagen de perfil actualizada correctamente.');
        } catch (error) {
            setUserMessage('Error al actualizar la imagen de perfil.');
        }

    };

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/signin'); 
    };

    const handleUpdateEmail = async () => {
        if (user) {
            try {
                await updateEmail(user, newEmail);
                setUserMessage('Correo electrónico actualizado correctamente.');
            } catch (error) {
                console.error(error);
                setUserMessage('Error al actualizar el correo electrónico.');
            }
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpdateName = async () => {
        try {
            await updateDoc(doc(db, "users", user.uid), {
                name: newName
            });
            setName(newName);
            setNewName('');
            setUserMessage('Nombre actualizado correctamente.');
        } catch (error) {
            setUserMessage('Error al actualizar el nombre.');
            console.log(error);
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Perfil de Usuario</h2>
            {avatar && <img src={avatar} alt="Avatar" style={{width: '100px', height: '100px', borderRadius: '50%'  }} />}
            <h3>{name}</h3>
            <h2 className="form-title">Editar perfil</h2>
            <p>Cambiar foto de perfil :</p>
            <input className="form-input" type="file" onChange={handleFileChange} />
            <button className="form-button" onClick={uploadImage}>Cambiar foto de perfil</button>
            <p>Cambiar nombre de usuario :</p>
            <input className="form-input" placeholder="Nuevo nombre de usuario" type="text" value={newName} onChange={(e) => setNewName(e.target.value)} required minLength="3"
            />
            <button className="form-button" onClick={handleUpdateName}>Cambiar nombre</button>
            <p>Cambiar Correo Electrónico:</p>
            <input className="form-input" type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="Nuevo correo electrónico"/>
            {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
            <button className="form-button" onClick={handleUpdateEmail}>Actualizar Correo Electrónico</button>
            <br/>
            <button className="form-button-logout" onClick={handleLogout}>Cerrar Sesión</button>
            {userMessage && <p>{userMessage}</p>}
        </div>
    );
}

export default UserProfile;
