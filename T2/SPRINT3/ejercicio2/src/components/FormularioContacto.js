import React from 'react';
import { useForm } from 'react-hook-form';
import './FormularioContacto.css';

export default function FormularioContacto() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = data => {
    // Aquí puedes manejar la lógica de envío de datos, como enviar a una API.
    alert('Formulario enviado con éxito');
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      <div className="form-group">
        <label htmlFor="nombre" className="form-label">Nombre:</label>
        <input
          id="nombre"
          className="form-input"
          {...register('nombre', { required: 'El nombre es requerido' })}
        />
        {errors.nombre && <span className="form-error">{errors.nombre.message}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="email" className="form-label">Email:</label>
        <input
          id="email"
          type="email"
          className="form-input"
          {...register('email', {
            required: 'El correo electrónico es requerido',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'El formato del correo electrónico es inválido'
            }
          })}
        />
        {errors.email && <span className="form-error">{errors.email.message}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="mensaje" className="form-label">Mensaje:</label>
        <textarea
          id="mensaje"
          className="form-input"
          {...register('mensaje', { required: 'El mensaje es requerido' })}
        />
        {errors.mensaje && <span className="form-error">{errors.mensaje.message}</span>}
      </div>
      
      <input type="submit" value="Enviar" className="form-submit" />
    </form>
  );
}
