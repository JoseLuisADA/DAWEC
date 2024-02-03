import React, { Component } from 'react';
import './GaleriaImagenesAvanzada.css';

class GaleriaImagenesAvanzada extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagenes: [],
      imagenSeleccionada: null,
      paginaActual: 1,
      terminoBusqueda: '',
    };
  }

  componentDidMount() {
    this.cargarImagenes();
  }

  cargarImagenes = async (pagina = 1, terminoBusqueda = '') => {
    const accesoUnsplash = 'HUsXpTu3c4sW-eHuKqzzr90qSfM8WHSax_YKpXuxCGQ';
    let url = `https://api.unsplash.com/photos/?client_id=${accesoUnsplash}&page=${pagina}&per_page=10`;
    if (terminoBusqueda) {
      url = `https://api.unsplash.com/search/photos/?client_id=${accesoUnsplash}&query=${terminoBusqueda}&page=${pagina}&per_page=10`;
    }

    try {
      const respuesta = await fetch(url);
      const datos = await respuesta.json();
      const imagenes = datos.results ? datos.results : datos;
      this.setState({ imagenes: [...this.state.imagenes, ...imagenes.map(img => ({
          id: img.id,
          src: img.urls.regular,
          titulo: img.alt_description || 'Sin título',
        }))],
        paginaActual: pagina,
      });
    } catch (error) {
      console.error("Error cargando imágenes de Unsplash:", error);
    }
  };

  manejarBusqueda = (e) => {
    e.preventDefault();
    this.setState({ imagenes: [], paginaActual: 1 });
    this.cargarImagenes(1, this.state.terminoBusqueda);
  };

  cambiarTerminoBusqueda = (e) => {
    this.setState({ terminoBusqueda: e.target.value });
  };

  cargarMasImagenes = () => {
    const { paginaActual, terminoBusqueda } = this.state;
    this.cargarImagenes(paginaActual + 1, terminoBusqueda);
  };

  seleccionarImagen = (imagen) => {
    this.setState({ imagenSeleccionada: imagen });
  };

  cerrarModal = () => {
    this.setState({ imagenSeleccionada: null });
  };

  renderModal = () => {
    const { imagenSeleccionada, imagenes } = this.state;
    if (!imagenSeleccionada) return null;

    const indiceActual = imagenes.findIndex(img => img.id === imagenSeleccionada.id);
    const imagenAnterior = imagenes[indiceActual - 1];
    const imagenSiguiente = imagenes[indiceActual + 1];

    return (
      <div className="modal" onClick={this.cerrarModal}>
        <button disabled={!imagenAnterior} onClick={(e) => { e.stopPropagation(); this.seleccionarImagen(imagenAnterior); }}>Anterior</button>
        <img src={imagenSeleccionada.src} alt={imagenSeleccionada.titulo} />
        <button disabled={!imagenSiguiente} onClick={(e) => { e.stopPropagation(); this.seleccionarImagen(imagenSiguiente); }}>Siguiente</button>
      </div>
    );
  };

  render() {
    const { imagenes, terminoBusqueda } = this.state;

    return (
      <div>
        <form onSubmit={this.manejarBusqueda} className="barra-busqueda">
          <input type="text" value={terminoBusqueda} onChange={this.cambiarTerminoBusqueda} placeholder="Buscar imágenes..." />
          <button type="submit">Buscar</button>
        </form>
        <div className="galeria">
          {imagenes.map((imagen) => (
            <img
              key={imagen.id}
              src={imagen.src}
              alt={imagen.titulo}
              onClick={() => this.seleccionarImagen(imagen)}
            />
          ))}
        </div>
        {imagenes.length > 0 && <button onClick={this.cargarMasImagenes} className="cargar-mas">Cargar más</button>}
        {this.renderModal()}
      </div>
    );
  }
}

export default GaleriaImagenesAvanzada;
