import React, { useState } from 'react';

const ToDoApp = () => {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');

  const agregarTarea = (e) => {
    e.preventDefault();
    if (nuevaTarea.trim() === '') return;
    const tareaNueva = {
      id: Date.now(),
      texto: nuevaTarea,
      completada: false,
    };
    setTareas([...tareas, tareaNueva]);
    setNuevaTarea('');
  };

  const toggleCompletada = (id) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
      )
    );
  };

  const eliminarTarea = (id) => {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
  };

  return (
    <div>
      <h1>Lista de Tareas</h1>
      <form onSubmit={agregarTarea}>
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
        />
        <button type="submit">Agregar Tarea</button>
      </form>
      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id} style={{ textDecoration: tarea.completada ? 'line-through' : 'none' }}>
            {tarea.texto}
            <input
              type="checkbox"
              checked={tarea.completada}
              onChange={() => toggleCompletada(tarea.id)}
            />
            <button onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoApp;
