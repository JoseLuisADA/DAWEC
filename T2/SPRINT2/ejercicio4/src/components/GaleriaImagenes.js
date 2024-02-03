import React, { Component } from 'react';
import './GaleriaImagenes.css';

class GaleriaImagenes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagenes: [],
      imagenSeleccionada: null,
    };
  }

  componentDidMount() {
    this.cargarImagenes();
  }

  cargarImagenes = async () => {
    const accesoUnsplash = 'HUsXpTu3c4sW-eHuKqzzr90qSfM8WHSax_YKpXuxCGQ'; // Reemplaza esto con tu clave de acceso
    const url = `https://api.unsplash.com/photos/random?client_id=${accesoUnsplash}&count=10`; // Carga 10 imágenes aleatorias

    try {
      const respuesta = await fetch(url);
      const datos = await respuesta.json();
      const imagenes = datos.map(img => ({
        id: img.id,
        src: img.urls.regular,
        titulo: img.alt_description || 'Sin título',
      }));
      this.setState({ imagenes });
    } catch (error) {
      console.error("Error cargando imágenes de Unsplash:", error);
    }
  };

  seleccionarImagen = (imagen) => {
    this.setState({ imagenSeleccionada: imagen });
  };

  cerrarModal = () => {
    this.setState({ imagenSeleccionada: null });
  };

  renderModal = () => {
    const { imagenSeleccionada } = this.state;
    if (!imagenSeleccionada) return null;

    return (
      <div className="modal" onClick={this.cerrarModal}>
        <img src={imagenSeleccionada.src} alt={imagenSeleccionada.titulo} />
      </div>
    );
  };

  render() {
    const { imagenes } = this.state;

    return (
      <div>
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
        {this.renderModal()}
      </div>
    );
  }
}

export default GaleriaImagenes;