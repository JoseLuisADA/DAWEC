import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase-config'; // Asegúrate de que la ruta sea correcta

const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div>Cargando...</div>; // O algún otro indicador de carga

  return user ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;