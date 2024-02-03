import React from 'react';
import './FormularioRegistro.css'; // Asegúrate de crear este archivo CSS para los estilos

class FormularioRegistro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      errors: {
        username: '',
        email: '',
        password: '',
      }
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'username': 
        errors.username = 
          value.length < 5
            ? 'El nombre de usuario debe tener al menos 5 caracteres.'
            : '';
        break;
      case 'email': 
        errors.email = 
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ? ''
            : 'El correo no es válido.';
        break;
      case 'password': 
        errors.password = 
          value.length < 8
            ? 'La contraseña debe tener al menos 8 caracteres.'
            : '';
        break;
      default:
        break;
    }

    this.setState({errors, [name]: value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // Aquí se manejaría la lógica de envío del formulario
  }

  render() {
    const {errors} = this.state;
    return (
      <form onSubmit={this.handleSubmit} noValidate>
        <div>
          <label htmlFor="username">Nombre de Usuario</label>
          <input type='text' name='username' onChange={this.handleChange} noValidate
                 className={errors.username ? 'invalid' : ''} />
          {errors.username && 
            <span className='error'>{errors.username}</span>}
        </div>
        <div>
          <label htmlFor="email">Correo Electrónico</label>
          <input type='email' name='email' onChange={this.handleChange} noValidate 
                 className={errors.email ? 'invalid' : ''} />
          {errors.email && 
            <span className='error'>{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input type='password' name='password' onChange={this.handleChange} noValidate 
                 className={errors.password ? 'invalid' : ''} />
          {errors.password && 
            <span className='error'>{errors.password}</span>}
        </div>
        <div>
          <button type='submit'>Registrar</button>
        </div>
      </form>
    );
  }
}

export default FormularioRegistro;