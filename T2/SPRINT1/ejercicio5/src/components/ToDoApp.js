import React, { useState, useEffect, useReducer } from 'react';

const initialState = {
  tareas: [],
  categorias: ['Trabajo', 'Personal', 'Estudio'],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'AGREGAR_TAREA':
      return {
        ...state,
        tareas: [...state.tareas, action.payload],
      };
    case 'TOGGLE_COMPLETADA':
      return {
        ...state,
        tareas: state.tareas.map((tarea) =>
          tarea.id === action.payload ? { ...tarea, completada: !tarea.completada } : tarea
        ),
      };
    case 'EDITAR_TAREA':
      return {
        ...state,
        tareas: state.tareas.map((tarea) =>
          tarea.id === action.payload.id ? { ...tarea, texto: action.payload.texto } : tarea
        ),
      };
    case 'ELIMINAR_TAREA':
      return {
        ...state,
        tareas: state.tareas.filter((tarea) => tarea.id !== action.payload),
      };
    case 'AGREGAR_CATEGORIA':
      return {
        ...state,
        categorias: [...state.categorias, action.payload],
      };
    default:
      return state;
  }
};

const useLocalStorageReducer = (key, reducer, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    const localData = localStorage.getItem(key);
    return localData ? JSON.parse(localData) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, dispatch];
};

const ToDoApp = () => {
  const [state, dispatch] = useLocalStorageReducer('tareasApp', reducer, initialState);
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [categoriaTarea, setCategoriaTarea] = useState(''); // Estado para la categoría de la tarea
  const [nuevaCategoria, setNuevaCategoria] = useState(''); // Estado para añadir una nueva categoría
  const [editandoId, setEditandoId] = useState(null);
  const [textoEditado, setTextoEditado] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('Todas');

  const agregarTarea = (e) => {
    e.preventDefault();
    if (nuevaTarea.trim() === '' || categoriaTarea.trim() === '') return;
    const tareaNueva = {
      id: Date.now(),
      texto: nuevaTarea,
      categoria: categoriaTarea,
      completada: false,
    };
    dispatch({ type: 'AGREGAR_TAREA', payload: tareaNueva });
    setNuevaTarea('');
    setCategoriaTarea('');
  };

  const agregarCategoria = (e) => {
    e.preventDefault();
    if (nuevaCategoria.trim() !== '' && !state.categorias.includes(nuevaCategoria)) {
      dispatch({ type: 'AGREGAR_CATEGORIA', payload: nuevaCategoria });
      setNuevaCategoria('');
    }
  };

  const editarTarea = (tarea) => {
    setEditandoId(tarea.id);
    setTextoEditado(tarea.texto);
  };

  const guardarEdicion = (id) => {
    dispatch({ type: 'EDITAR_TAREA', payload: { id, texto: textoEditado } });
    setEditandoId(null);
    setTextoEditado('');
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setTextoEditado('');
  };

  const tareasFiltradas = filtroCategoria === 'Todas'
    ? state.tareas
    : state.tareas.filter(tarea => tarea.categoria === filtroCategoria);

  return (
    <div>
      <h1>Gestor de Tareas</h1>
      <form onSubmit={agregarTarea}>
        <div>
        <input
            type="text"
            value={nuevaCategoria}
            onChange={(e) => setNuevaCategoria(e.target.value)}
            placeholder="Añade una nueva categoría"
          />
          <button onClick={agregarCategoria}>Añadir Categoría</button>
        </div>
        <br/>
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder="Introduce una tarea"
        />
         <select
          value={categoriaTarea}
          onChange={(e) => setCategoriaTarea(e.target.value)}
        >
          <option value="">Selecciona una categoría</option>
          {state.categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>            

        <button type="submit">Agregar Tarea</button>

      </form>
      {/* Listado de tareas filtradas */}
      <h3>Lista de tareas :</h3>

      {/* Selector de filtro de categoría */}
      <select
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
        >
          <option value="Todas">Todas las Categorías</option>
          {state.categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>


      <ul>
          {tareasFiltradas.map((tarea) => (
            <li key={tarea.id} style={{ textDecoration: tarea.completada ? 'line-through' : 'none' }}>
              {editandoId === tarea.id ? (
                <>
                  <input
                    type="text"
                    value={textoEditado}
                    onChange={(e) => setTextoEditado(e.target.value)}
                  />
                  <button onClick={() => guardarEdicion(tarea.id)}>Guardar</button>
                  <button onClick={cancelarEdicion}>Cancelar</button>
                </>
              ) : (
                <>
                  {tarea.texto} ({tarea.categoria})
                  <input
                    type="checkbox"
                    checked={tarea.completada}
                    onChange={() => dispatch({ type: 'TOGGLE_COMPLETADA', payload: tarea.id })}
                  />
                  <button onClick={() => {
                    setEditandoId(tarea.id);
                    setTextoEditado(tarea.texto);
                  }}>Editar</button>
                  <button onClick={() => dispatch({ type: 'ELIMINAR_TAREA', payload: tarea.id })}>
                    Eliminar
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
    </div>
  );
};

export default ToDoApp;