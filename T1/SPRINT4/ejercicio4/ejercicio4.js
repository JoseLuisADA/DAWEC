const apiKey = '0b60ee07d5ee1df646132e5ab860e74d';

document.addEventListener('DOMContentLoaded', function() {
    loadGenres();
    document.getElementById('searchButton').addEventListener('click', function() {
        const keyword = document.getElementById('keyword').value;
        const genre = document.getElementById('genre').value || ''; // Asegura que el género sea una cadena vacía si no se selecciona nada
        searchMovies(keyword, genre, 1); // Iniciar búsqueda en la página 1
    });
    document.getElementById('nextButton').addEventListener('click', function() {
        const keyword = document.getElementById('keyword').value;
        const genre = document.getElementById('genre').value;
        nextPage(keyword, genre);
    });
    document.getElementById('prevButton').addEventListener('click', function() {
        const keyword = document.getElementById('keyword').value;
        const genre = document.getElementById('genre').value;
        prevPage(keyword, genre);
    });
});

let currentPage = 1;

async function loadGenres() {
    const genreResponse = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=es-ES`);
    const genreData = await genreResponse.json();
    const genreSelect = document.getElementById('genre');
    // La opción "Todos los géneros" ya está añadida en el HTML, así que solo añadimos las demás
    genreData.genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre.id;
        option.textContent = genre.name;
        genreSelect.appendChild(option);
    });
}

async function searchMovies(keyword, genre, page) {
    try {
        let url = '';
        // Verifica si el género está seleccionado
        if (genre) {
            // Utiliza el endpoint de descubrimiento si se selecciona un género
            url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=es-ES&sort_by=popularity.desc&include_adult=false&page=${page}&with_genres=${genre}`;
            // Añade la palabra clave a la búsqueda si está presente
            if (keyword) {
                url += `&query=${keyword}`;
            }
        } else {
            // Utiliza el endpoint de búsqueda si solo se ingresa una palabra clave
            url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=es-ES&query=${keyword}&page=${page}&include_adult=false`;
        }

        const response = await fetch(url);
        const data = await response.json();
        currentPage = data.page; // Actualiza la página actual
        displayResults(data.results); // Función para mostrar los resultados
        handlePaginationButtons(data.total_pages); // Actualiza los botones de paginación
    } catch (error) {
        console.error('Error al buscar películas:', error);
    }
}

function displayResults(movies) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Limpiar resultados anteriores

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie'); // Agrega una clase para estilizar
        const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'path_to_default_image.jpg'; // Asegúrate de tener una imagen por defecto

        movieElement.innerHTML = `
            <img src="${posterPath}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>Año de lanzamiento: ${movie.release_date}</p>
            <p>Resumen: ${movie.overview}</p>
            <p>Puntuación: ${movie.vote_average}</p>
        `;
        resultsDiv.appendChild(movieElement);
    });
}

function nextPage(keyword, genre) {
    if (currentPage < 1000) { // TMDb permite hasta 1000 páginas de resultados
        searchMovies(keyword, genre, currentPage + 1);
    }
}

function prevPage(keyword, genre) {
    if (currentPage > 1) {
        searchMovies(keyword, genre, currentPage - 1);
    }
}

function handlePaginationButtons(totalPages) {
    const nextButton = document.getElementById('nextButton');
    const prevButton = document.getElementById('prevButton');
    
    // Habilitar o deshabilitar botones según la página actual
    prevButton.disabled = currentPage <= 1;
    nextButton.disabled = currentPage >= totalPages;
}