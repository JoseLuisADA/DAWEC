// src/utils/permisos.js
export const puedeEditarArticulo = (usuario, articuloAutorId) => {
    return usuario?.rol === 'administrador' || usuario?.uid === articuloAutorId;
};
  