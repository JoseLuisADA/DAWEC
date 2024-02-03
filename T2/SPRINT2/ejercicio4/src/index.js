// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App'; // Actualizado para apuntar al App en la carpeta components
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
