import React, { useState } from 'react';

const Contador = () => {
  // Inicializa el estado 'cuenta' con un valor inicial de 0
  const [cuenta, setCuenta] = useState(0);

  // Función para manejar el clic del botón e incrementar 'cuenta'
  const incrementar = () => {
    setCuenta(cuenta + 1);
  };

  return (
    <div>
      <p>Número de clicks: {cuenta}</p>
      <button onClick={incrementar}>Click me</button>
    </div>
  );
};

export default Contador;
