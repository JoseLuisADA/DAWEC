document.addEventListener('DOMContentLoaded', function() {
    loadGenres();
    document.getElementById('searchButton').addEventListener('click', function() {
        const keyword = document.getElementById('keyword').value;
        const genre = document.getElementById('genre').value;
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
    // Sustituye 'YOUR_API_KEY' con tu propia clave de la API de TMDb
    const apiKey = 'YOUR_API_KEY';
    const genreResponse = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=es-ES`);
    const genreData = await genreResponse.json();
    const genreSelect = document.getElementById('genre');
    genreData.genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre.id;
        option.textContent = genre.name;
        genreSelect.appendChild(option);
    });
}

async function searchMovies(keyword, genre, page) {
    const apiKey = 'YOUR_API_KEY'; // Reemplaza con tu clave de API de TMDb
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=es-ES&sort_by=popularity.desc&include_adult=false&page=${page}&with_genres=${genre}&query=${keyword}`
        );
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
        movieElement.innerHTML = `
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