import React from 'react';
import { Link } from 'react-router-dom';

const Inicio = () => (
  <div>
    <h1>Bienvenido al sitio de perfiles de usuario</h1>
    <nav>
      <ul>
        <li><Link to="/perfil/1">Perfil del Usuario 1</Link></li>
        <li><Link to="/perfil/2">Perfil del Usuario 2</Link></li>
      </ul>
    </nav>
  </div>
);

export default Inicio;
