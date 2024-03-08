// src/components/Articulo.js
import React, { useContext } from 'react';
import UsuarioContext from './UsuarioContext';
import FormularioComentario from './FormularioComentario';
import ListaComentarios from './ListaComentarios';

function Articulo({ articulo, onEdit, onBorrar, usuarioRol }) {
  const { usuario } = useContext(UsuarioContext);

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
      <hr/>
      {usuarioRol === 'admin' && (
        <>
          <button className="form-button" onClick={() => onEdit(articulo)}>Editar artículo</button>
          <button className="form-button-logout" onClick={onBorrar}>Borrar artículo</button>
        </>
      )}
      <h2>{articulo.titulo}</h2>
      <p>{articulo.contenido}</p>
      <p>{fechaYHoraFormateadas}</p>
      {/* Mostrar formulario de comentario solo si hay usuario logueado */}
      {usuario && <FormularioComentario articuloId={articulo.id} />}
      {/* Lista de comentarios siempre visible para todos */}
      <ListaComentarios articuloId={articulo.id} />
    </div>
  );
}

export default Articulo;