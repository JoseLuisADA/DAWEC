import React, { useState } from 'react';
import Cronometro from './Cronometro'; // Asegúrate de que la ruta sea correcta

function App() {
  const [mostrarCronometro, setMostrarCronometro] = useState(true);

  return (
    <div>
      {mostrarCronometro && <Cronometro />}
      <button onClick={() => setMostrarCronometro(!mostrarCronometro)}>
        {mostrarCronometro ? 'Ocultar Cronómetro' : 'Mostrar Cronómetro'}
      </button>
    </div>
  );
}

export default App;