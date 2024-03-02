// src/components/RutaPrivada.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UsuarioContext from './UsuarioContext';

const PrivateRoute = ({ children }) => {
  const user = useContext(UsuarioContext); // Asume que UsuarioContext provee la información del usuario actual
  return user ? children : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
