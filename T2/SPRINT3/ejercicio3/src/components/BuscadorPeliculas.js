import React, { useState } from 'react';

export default function BuscadorPeliculas() {
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      textAlign: 'center',
    },
    input: {
      width: 'calc(100% - 120px)',
      padding: '10px',
      marginRight: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    button: {
      padding: '10px 20px',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: '#007bff',
      color: 'white',
      cursor: 'pointer',
    },
    list: {
      listStyleType: 'none',
      padding: 0,
    },
    listItem: {
      textAlign: 'left',
      padding: '10px',
      borderBottom: '1px solid #eee',
    },
  };

  const buscarPeliculas = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError('');

    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${terminoBusqueda}&apikey=c02f64a8`);
      const data = await response.json();

      if (data.Response === "True") {
        setResultados(data.Search);
      } else {
        setError(data.Error);
      }
    } catch (error) {
      setError('Hubo un problema al buscar las películas.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={buscarPeliculas}>
        <input
          style={styles.input}
          type="text"
          value={terminoBusqueda}
          onChange={(e) => setTerminoBusqueda(e.target.value)}
          placeholder="Buscar películas..."
        />
        <button style={styles.button} type="submit">Buscar</button>
      </form>
      {cargando && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      <ul style={styles.list}>
        {resultados.map((pelicula) => (
          <li key={pelicula.imdbID} style={styles.listItem}>
            {pelicula.Title} ({pelicula.Year})
          </li>
        ))}
      </ul>
    </div>
  );
}
