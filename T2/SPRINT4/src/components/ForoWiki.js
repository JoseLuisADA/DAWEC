import React, { useContext, useState, useEffect } from 'react';
import { collection, getDoc, getDocs, addDoc, updateDoc, doc, query, orderBy, onSnapshot, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import ListaArticulos from './ListaArticulos';
import UsuarioContext from './UsuarioContext';
import BotonesNavegacion from './BotonesNavegacion';
import EditorArticulo from './EditorArticulo';

function ForoWiki() {
  const { usuario } = useContext(UsuarioContext);
  const [mostrarEditor, setMostrarEditor] = useState(false);
  const [articulos, setArticulos] = useState([]);
  const [rolUsuario, setRolUsuario] = useState("");
  const navigate = useNavigate();
  const [articuloActual, setArticuloActual] = useState(null); // Aquí está la declaración de setArticuloActual

  useEffect(() => {
    const articulosQuery = query(collection(db, "articulo"), orderBy("fechaCreacion", "desc"));
    const unsubscribe = onSnapshot(articulosQuery, (snapshot) => {
      setArticulos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (usuario) {
      const obtenerRolUsuario = async () => {
        const userDocRef = doc(db, "usuario", usuario.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setRolUsuario(userDocSnap.data().rol);
        }
      };
      obtenerRolUsuario();
    }
  }, [usuario]);

  function handlePerfil(){
    navigate("/perfil");
  }


  const handleGuardarArticulo = async (articulo) => {
    try {
      if (articulo.id) {
        // Actualizar el artículo existente
        await updateDoc(doc(db, "articulo", articulo.id), {
          titulo: articulo.titulo,
          contenido: articulo.contenido,
          // Considera actualizar también la fecha de última edición aquí
        });
      } else {
        // Crear un nuevo artículo
        await addDoc(collection(db, "articulo"), {
          ...articulo,
          autorId: usuario.uid, // Asegúrate de que 'usuario.uid' sea el ID correcto del autor
          fechaCreacion: new Date() // Firebase utiliza objetos Timestamp, esto se convertirá automáticamente
        });
      }
    } catch (error) {
      console.error("Error al guardar el artículo: ", error);
      // Considera mostrar un mensaje al usuario si la operación falla
    }
    // Independientemente del resultado, cierra el editor y restablece el artículo actual
    setMostrarEditor(false);
    setArticuloActual(null);
  };

  const handleBorrarArticulo = async (idArticulo) => {
    try {
      await deleteDoc(doc(db, "articulo", idArticulo));
      console.log("Artículo eliminado con éxito");
    } catch (error) {
      console.error("Error al eliminar el artículo: ", error);
    }
  };

  const handleEditarArticulo = (articulo) => {
    if (rolUsuario === 'admin') {
      setMostrarEditor(true);
      setArticuloActual(articulo);
    } else {
      console.log("No tienes permiso para editar articulos");
    }
  };

  const handleCrearArticulo = () => {
    setMostrarEditor(true);
    setArticuloActual(null);
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login'); 
  };

  const handleInicio = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Foro Sistale</h1>
      {usuario ? (
        <>
          {usuario.photoURL && (
            <img src={usuario.photoURL} alt="Avatar" style={{width: '100px', height: '100px', borderRadius: '50%'}} />
          )}
          <h4>{usuario.displayName}</h4>
          <h4>{rolUsuario}</h4>
          <button className="form-button-logout" onClick={handleLogout}>Cerrar Sesión</button>

          <hr/>
          <button className="form-button" onClick={handleInicio}>Página de inicio</button>
          <button className="form-button" onClick={handlePerfil }>Perfil</button>
          {rolUsuario === 'admin' && (
          <button className="form-button" onClick={handleCrearArticulo}>Crear Artículo</button>
          )}
        </>
      ) : (
        <div>
          <hr/>
          <h4>Estás como invitado/a</h4>
          <hr/>
          <BotonesNavegacion/>
        </div>
      )}
      {mostrarEditor && (
        <EditorArticulo
        articuloActual={articuloActual}
        onSave={handleGuardarArticulo}
        onCancel={() => setMostrarEditor(false)}
      />
      )}
     <ListaArticulos
      articulos={articulos}
      onEditArticle={handleEditarArticulo}
      onBorrarArticle={handleBorrarArticulo}
      usuarioRol={rolUsuario}
      />
    </div>
  );
}

export default ForoWiki;