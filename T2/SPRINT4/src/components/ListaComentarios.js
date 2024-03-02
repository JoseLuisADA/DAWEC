// src/components/ListaComentarios.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase-config';
import { collection, query, where, getDocs } from 'firebase/firestore';

function ListaComentarios({ articuloId }) {
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    const cargarComentarios = async () => {
      if (!articuloId) return; // Asegura que el articuloId no sea undefined

      const q = query(collection(db, "comentario"), where("articuloId", "==", articuloId));
      try {
        const querySnapshot = await getDocs(q);
        const comentariosCargados = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComentarios(comentariosCargados);
      } catch (error) {
        console.error("Error al cargar los comentarios: ", error);
      }
    };

    cargarComentarios();
  }, [articuloId]); // Re-carga los comentarios si cambia articuloId

  // Renderiza los comentarios
  return (
    <div>
      <h5>Comentarios:</h5>
      {comentarios.map((comentario) => (
        <div key={comentario.id}>
          <p>{comentario.texto}</p>
          {/* Puedes añadir más detalles del comentario aquí */}
        </div>
      ))}
    </div>
  );
}

export default ListaComentarios;
  