// src/components/Articulo.js
import React from 'react';

function Articulo({ articulo, onEdit }) {
 
  // Convertir el Timestamp de Firestore a un objeto Date y luego a un string de fecha
  const fechaCreacion = articulo.fechaCreacion.toDate(); // Convertir Timestamp a objeto Date

  // Formatear la fecha en el formato deseado: "día de mes de año"
  const fechaFormateada = fechaCreacion.toLocaleDateString("es-ES", {
      year: 'numeric', month: 'long', day: 'numeric'
  });

  // Formatear la hora en el formato deseado: "00:00"
  const horaFormateada = fechaCreacion.toLocaleTimeString("es-ES", {
      hour: '2-digit', minute: '2-digit'
  });

  // Combinar fecha y hora formateadas para mostrarlas juntas
  const fechaYHoraFormateadas = `${fechaFormateada} a las ${horaFormateada}`;

  return (
    <div>
      <h2>{articulo.titulo}</h2>
      <button onClick={() => onEdit(articulo)}>Editar artículo</button>
      <p>{articulo.contenido}</p>
      <p>{fechaYHoraFormateadas}</p> {/* Mostrar la fecha formateada */}
    </div>
  );
}

export default Articulo;
