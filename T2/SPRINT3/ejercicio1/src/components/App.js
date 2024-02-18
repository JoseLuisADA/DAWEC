import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from './Inicio'; // Asegúrate de que la ruta de importación sea correcta
import PerfilUsuario from './PerfilUsuario'; // Asegúrate de que la ruta de importación sea correcta

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Inicio />} />
        <Route path="/perfil/:id" element={<PerfilUsuario />} />
      </Routes>
    </Router>
  );
};

export default App;
