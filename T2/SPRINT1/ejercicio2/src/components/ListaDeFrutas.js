import React from 'react';

// Componente ListaDeFrutas
const ListaDeFrutas = ({ frutas }) => {
  return (
    <ul>
      {frutas.map((fruta, index) => (
        <li key={index}>
          {fruta.nombre}
          <img src={fruta.imagenUrl} alt={fruta.nombre} />
        </li>
      ))}
    </ul>
  );
};

export default ListaDeFrutas;