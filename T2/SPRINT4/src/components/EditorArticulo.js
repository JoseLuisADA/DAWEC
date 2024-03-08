import React, { useState, useEffect } from 'react';

function EditorArticulo({ articuloActual, onSave, onCancel }) {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');

  // Actualizar los campos del editor con los valores actuales del artículo
  useEffect(() => {
    if (articuloActual) {
      setTitulo(articuloActual.titulo);
      setContenido(articuloActual.contenido);
    } else {
      setTitulo('');
      setContenido('');
    }
  }, [articuloActual]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validar que el título y el contenido no estén vacíos
    if (!titulo.trim() || !contenido.trim()) {
      alert("El título y el contenido no pueden estar vacíos.");
      return;
    }

    const articuloData = { titulo, contenido, autorId: 'autorTemp', fechaCreacion: new Date() };

    try {
      onSave(articuloActual ? { ...articuloData, id: articuloActual.id } : articuloData);
    } catch (error) {
      console.error("Error al guardar el artículo: ", error);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <br/>
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Título del artículo"
      />
      <br/>
      <textarea
        value={contenido}
        onChange={(e) => setContenido(e.target.value)}
        placeholder="Contenido del artículo"
      />
      <br/>
      <button className="form-button" type="submit">Guardar</button>
      <br/>
      <button className="form-button-logout" type="button" onClick={onCancel}>Cancelar</button> {/* Botón para cancelar la creación/edición */}
    </form>
  );
}

export default EditorArticulo;
