import React from 'react';

class Cronometro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      segundos: 0,
      activo: false,
      intervalo: null
    };
  }

  iniciarCronometro = () => {
    if (!this.state.activo) {
      console.log('Cronómetro iniciado'); // Agregado para la prueba
      this.setState({
        activo: true,
        intervalo: setInterval(this.incrementarSegundo, 1000)
      });
    }
  };

  pausarCronometro = () => {
    if (this.state.activo) {
      console.log('Cronómetro pausado'); // Agregado para la prueba
      clearInterval(this.state.intervalo);
      this.setState({ activo: false, intervalo: null });
    }
  };

  reiniciarCronometro = () => {
    console.log('Cronómetro reiniciado'); // Agregado para la prueba
    clearInterval(this.state.intervalo);
    this.setState({ segundos: 0, activo: false, intervalo: null });
  };

  incrementarSegundo = () => {
    this.setState({ segundos: this.state.segundos + 1 });
  };

  componentWillUnmount() {
    console.log('Cronómetro desmontado, intervalo limpiado'); // Agregado para la prueba
    clearInterval(this.state.intervalo);
  }

  formatTiempo = (segundos) => {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos - (horas * 3600)) / 60);
    const seg = segundos - (horas * 3600) - (minutos * 60);

    return [horas, minutos, seg]
      .map(v => v < 10 ? "0" + v : v)
      .join(":");
  };

  render() {
    return (
      <div>
        <h1>{this.formatTiempo(this.state.segundos)}</h1>
        <button onClick={this.iniciarCronometro}>Iniciar</button>
        <button onClick={this.pausarCronometro}>Pausar</button>
        <button onClick={this.reiniciarCronometro}>Reiniciar</button>
      </div>
    );
  }
}

export default Cronometro;