import React from 'react';
import Articulo from './Articulo';

function ListaArticulos({ onEditArticle, onBorrarArticle, articulos, usuarioRol }) {
  return (
    <div>
      {articulos.map((articulo) => (
        <Articulo
          key={articulo.id}
          articulo={articulo}
          onEdit={() => onEditArticle(articulo)}
          onBorrar={() => onBorrarArticle(articulo.id)} // Asegúrate de que esto esté correctamente implementado
          usuarioRol={usuarioRol}
        />
      ))}
    </div>
  );
}

export default ListaArticulos;
