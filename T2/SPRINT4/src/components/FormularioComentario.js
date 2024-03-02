import React, { useContext, useState } from 'react'; // Añade useContext aquí
import { db } from '../firebase-config';
import { collection, addDoc } from "firebase/firestore";
import UsuarioContext from './UsuarioContext';

function FormularioComentario({ articuloId }) {
  const [comentario, setComentario] = useState('');
  const usuario = useContext(UsuarioContext); // Ahora useContext está definido y puede ser utilizado

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comentario.trim()) {
      alert("El comentario no puede estar vacío.");
      return;
    }
    try {
      await addDoc(collection(db, "comentario"), {
        articuloId,
        texto: comentario,
        usuarioId: usuario.uid // Asumiendo que quieres usar el ID del usuario aquí
        // Puedes añadir más campos como el autorId si es necesario
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
