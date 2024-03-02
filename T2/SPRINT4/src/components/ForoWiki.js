// src/components/ForoWiki.js
import React, { useContext, useState, useEffect } from 'react';
import ListaArticulos from './ListaArticulos';
import EditorArticulo from './EditorArticulo';
import UsuarioContext from './UsuarioContext';
import { db, auth } from '../firebase-config';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function ForoWiki() {
  const usuario = useContext(UsuarioContext);
  const [mostrarEditor, setMostrarEditor] = useState(false);
  const [articulos, setArticulos] = useState([]);
  const [articuloActual, setArticuloActual] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (articuloActual !== null) {
      setMostrarEditor(true);
    }
    fetchArticulos();
    fetchComentarios();
  }, [articuloActual]);

  // Obtener todos los artículos
  const fetchArticulos = async () => {
    const querySnapshot = await getDocs(collection(db, "articulo"));
    setArticulos(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  // Obtener todos los comentarios
  const fetchComentarios = async () => {
    const querySnapshot = await getDocs(collection(db, "comentario"));
    setComentarios(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  // Función para manejar la creación de un nuevo artículo o la edición de uno existente
  const handleGuardarArticulo = async (articulo) => {
    if (articulo.id) {
      await updateDoc(doc(db, "articulo", articulo.id), articulo);
    } else {
      await addDoc(collection(db, "articulo"), {
        ...articulo,
        autorId: usuario?.uid,
        fechaCreacion: new Date()
      });
    }
    setMostrarEditor(false);
    setArticuloActual(null); // Limpiar el artículo actual después de guardar
    fetchArticulos(); // Recargar los artículos
  };

  // Esta función no necesita ser async ya que `handleGuardarArticulo` ya maneja la asincronía
  const handleCrearArticulo = () => {
    setMostrarEditor(true);
    setArticuloActual(null); // Preparar para crear un nuevo artículo
  };

  const handleCancelarArticulo = () => {
    setMostrarEditor(false);
    setArticuloActual(null); 
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login'); 
};

  return (
    <div>
    <h1>Foro Sistale</h1>
    <hr/>
    {<img src={usuario.photoURL} alt="Avatar" style={{width: '100px', height: '100px', borderRadius: '50%'  }} />}
    <h4>{usuario.displayName}</h4>
   <hr/>
      <button className="form-button-logout" onClick={handleLogout}>Cerrar Sesión</button>
      {usuario && (
      <button className="form-button" onClick={handleCrearArticulo}>Crear Artículo</button>
    )}
    {mostrarEditor ? (
      <EditorArticulo
        articuloActual={articuloActual}
        onSave={handleGuardarArticulo}
        onCancel={handleCancelarArticulo}
      />
    ) : (
      <ListaArticulos articulos={articulos} onEditArticle={setArticuloActual} />
    )}
  </div>
  );
}

export default ForoWiki;
