import React from 'react';

class AppTareas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tareas: [],
      textoTarea: '',
      filtro: 'pendientes', // Se establece el filtro inicial a 'pendientes'
    };
  }

  componentDidMount() {
    const tareasAlmacenadas = JSON.parse(localStorage.getItem('tareas')) || [];
    this.setState({ tareas: tareasAlmacenadas });
  }

  componentDidUpdate() {
    localStorage.setItem('tareas', JSON.stringify(this.state.tareas));
  }

  manejarCambioInput = (event) => {
    this.setState({ textoTarea: event.target.value });
  };

  agregarTarea = () => {
    const { textoTarea, tareas } = this.state;
    if (textoTarea) {
      const nuevaTarea = { id: Date.now(), texto: textoTarea, completada: false };
      this.setState({ tareas: [...tareas, nuevaTarea], textoTarea: '' });
    }
  };

  toggleCompletada = (id) => {
    const tareasActualizadas = this.state.tareas.map((tarea) => {
      if (tarea.id === id) {
        return { ...tarea, completada: !tarea.completada };
      }
      return tarea;
    });
    this.setState({ tareas: tareasActualizadas });
  };

  eliminarTarea = (id) => {
    const tareasFiltradas = this.state.tareas.filter((tarea) => tarea.id !== id);
    this.setState({ tareas: tareasFiltradas });
  };

  cambiarFiltro = (filtro) => {
    this.setState({ filtro });
  };

  render() {
    const { tareas, textoTarea, filtro } = this.state;
    const tareasFiltradas = tareas.filter((tarea) => {
      if (filtro === 'completadas') return tarea.completada;
      if (filtro === 'pendientes') return !tarea.completada;
      return true;
    });

    return (
      <div>
        <input
          value={textoTarea}
          onChange={this.manejarCambioInput}
          placeholder="Añadir nueva tarea..."
        />
        <button onClick={this.agregarTarea}>Añadir</button>
        <div>
          <button onClick={() => this.cambiarFiltro('todas')}>Todas</button>
          <button onClick={() => this.cambiarFiltro('completadas')}>Completadas</button>
          <button onClick={() => this.cambiarFiltro('pendientes')}>Pendientes</button>
        </div>
        <ul>
          {tareasFiltradas.map((tarea) => (
            <li key={tarea.id}>
              {tarea.texto}
              <button onClick={() => this.toggleCompletada(tarea.id)}>
                {tarea.completada ? 'Incompletar' : 'Completar'}
              </button>
              <button onClick={() => this.eliminarTarea(tarea.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default AppTareas;
