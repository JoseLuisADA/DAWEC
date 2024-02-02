// src/components/App.js
import React from 'react';
import HolaMundo from './HolaMundo';
import Saludo from './Saludo';

const App = () => {
  return (
    <div>
      <HolaMundo />
      <Saludo nombre="Pedro" />
      <Saludo nombre="María" />
      <Saludo nombre="Juan" />
    </div>
  );
};

export default App;
