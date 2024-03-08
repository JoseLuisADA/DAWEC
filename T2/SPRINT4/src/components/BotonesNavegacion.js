import React from 'react';
import { useNavigate } from 'react-router-dom';

function BotonesNavegacion() {
  const navigate = useNavigate();

  

  const irALogin = () => {
    navigate('/login');
  };

  const irARegistro = () => {
    navigate('/registrarse');
  };

  return (
    <div>
      <button className="form-button" onClick={irALogin}>Iniciar sesión</button>
      <button className="form-button" onClick={irARegistro}>Registrarse</button>
    </div>
  );
}

export default BotonesNavegacion;
