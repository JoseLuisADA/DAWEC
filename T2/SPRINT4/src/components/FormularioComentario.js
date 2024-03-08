import React, { useContext, useState } from 'react';
import { db } from '../firebase-config';
import { collection, addDoc } from "firebase/firestore";
import UsuarioContext from './UsuarioContext';

function FormularioComentario({ articuloId }) {
  const [comentario, setComentario] = useState('');
  const { usuario } = useContext(UsuarioContext); // Usa la destructuración para obtener 'usuario' del contexto

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comentario.trim()) {
      alert("El comentario no puede estar vacío.");
      return;
    }
    if (!usuario) {
      console.error("Usuario no logueado.");
      return; // Asegúrate de que haya un usuario logueado antes de intentar enviar un comentario
    }
    try {
      await addDoc(collection(db, "comentario"), {
        articuloId,
        texto: comentario,
        usuarioId: usuario.uid // Utiliza el ID del usuario obtenido del contexto
      });
      setComentario(''); // Limpiar el formulario después de enviar
    } catch (error) {
      console.error("Error al añadir el comentario: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        placeholder="Escribe un comentario..."
      />
      <br/>
      <br/>
      <button className="form-button" type="submit">Comentar</button>
    </form>
  );
}

export default FormularioComentario;