// src/components/ListaArticulos.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs } from "firebase/firestore";
import Articulo from './Articulo';
import FormularioComentario from './FormularioComentario';
import ListaComentarios from './ListaComentarios';

function ListaArticulos({ onEditArticle }) {
  const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    const fetchArticulos = async () => {
      const data = await getDocs(collection(db, "articulo"));
      setArticulos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    fetchArticulos();
  }, []);

  return (
    <div>
      {articulos.map((articulo) => (
        <div key={articulo.id}>
          <hr/>
          <Articulo articulo={articulo} onEdit={() => onEditArticle(articulo)} />
          <br/>
          <FormularioComentario articuloId={articulo.id} />
          <ListaComentarios articuloId={articulo.id} />
        </div>
      ))}
    </div>
  );
}

export default ListaArticulos;
