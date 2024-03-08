import React, { useEffect, useState } from 'react';
import { db } from '../firebase-config';
import { collection, query, where, onSnapshot } from 'firebase/firestore'; // Importa 'onSnapshot' para escuchar cambios en tiempo real

function ListaComentarios({ articuloId }) {
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    const cargarComentarios = async () => {
      if (!articuloId) return; // Asegura que el articuloId no sea undefined

      const q = query(collection(db, "comentario"), where("articuloId", "==", articuloId));
      try {
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const comentariosCargados = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setComentarios(comentariosCargados);
        });

        return () => unsubscribe(); // Detiene la escucha de cambios cuando el componente se desmonta
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
