const apiKey = '0b60ee07d5ee1df646132e5ab860e74d';
let listId = null; // Asegúrate de reemplazar esto con tu listId real si ya existe uno
let sessionId = ''; 

let currentPage = 1;

async function createRequestToken() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`);
        const data = await response.json();
        return data.request_token;
    } catch (error) {
        console.error('Error al obtener el token de solicitud:', error);
    }
}

// Función para redirigir al usuario para que autorice el token de solicitud
function askUserForPermission(requestToken) {
    const authUrl = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://127.0.0.1:5500/T1/SPRINT4/ejercicio4/ejercicio4.html`;
    window.location.href = authUrl; // Redirige al usuario para la autorización
}

// Función para crear una ID de sesión (session_id) con el token de solicitud autorizado
async function createSessionId(requestToken) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`, {
            method: 'POST'
        });
        const data = await response.json();
        if (data.success) {
            sessionId = data.session_id;
            // Aquí puedes guardar la sessionId en localStorage o cookies si es necesario
            // Por ejemplo: localStorage.setItem('tmdbSessionId', sessionId);
        }
    } catch (error) {
        console.error('Error al crear la session_id:', error);
    }
}

// Función para iniciar el proceso de autenticación
async function authenticateUser() {
    try {
        const requestToken = await createRequestToken();
        if (requestToken) {
            askUserForPermission(requestToken);
        }
    } catch (error) {
        console.error('Error durante la autenticación:', error);
    }
}

// Función para manejar la carga de la página de redirección
// Debes llamar a esta función en la página a la que el usuario es redirigido después de autorizar la aplicación
function handleRedirect() {
    const urlParams = new URLSearchParams(window.location.search);
    const requestToken = urlParams.get('request_token');
    if (requestToken) {
        createSessionId(requestToken);
    }
}

// Añade un botón de inicio de sesión a tu HTML y asígnale un evento de clic para iniciar la autenticación
document.getElementById('loginButton').addEventListener('click', authenticateUser);

// En tu página de redirección
window.onload = function() {
    // Parsea la URL para obtener el request token aprobado
    const urlParams = new URLSearchParams(window.location.search);
    const requestToken = urlParams.get('request_token');
    if (requestToken) {
        createSessionId(requestToken);
    }
    handleRedirect();
};

document.addEventListener('DOMContentLoaded', function() {
    loadGenres();
    loadFavorites(); // Carga los favoritos al iniciar la página si ya tienes un listId
    // Intenta recuperar el listId almacenado
    const storedListId = localStorage.getItem('tmdbListId');
    if (storedListId) {
        listId = storedListId;
        loadFavorites(); // Si hay un listId, carga los favoritos
    }
    document.getElementById('searchButton').addEventListener('click', function() {
        const keyword = document.getElementById('keyword').value;
        const genre = document.getElementById('genre').value || '';
        searchMovies(keyword, genre, 1);
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

document.getElementById('createListForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previene el envío normal del formulario

    // Obtiene los valores del formulario
    const listName = document.getElementById('listName').value;
    const listDescription = document.getElementById('listDescription').value;

    // Llama a la función para crear la lista (debes tener esta función en tu archivo JavaScript)
    createList(listName, listDescription);
});

async function loadGenres() {
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
    try {
        let url = '';
        if (genre) {
            url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=es-ES&sort_by=popularity.desc&include_adult=false&page=${page}&with_genres=${genre}`;
            if (keyword) {
                url += `&query=${keyword}`;
            }
        } else {
            url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=es-ES&query=${keyword}&page=${page}&include_adult=false`;
        }

        const response = await fetch(url);
        const data = await response.json();
        currentPage = data.page;
        displayResults(data.results);
        handlePaginationButtons(data.total_pages);
    } catch (error) {
        console.error('Error al buscar películas:', error);
    }
}

function displayResults(movies) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    movies.forEach(movie => {
        const movieElement = createMovieElement(movie, 'add');
        resultsDiv.appendChild(movieElement);
    });
}

function nextPage(keyword, genre) {
    if (currentPage < 1000) {
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
    prevButton.disabled = currentPage <= 1;
    nextButton.disabled = currentPage >= totalPages;
}

document.getElementById('recoverListButton').addEventListener('click', function() {
    const listName = prompt('Indica el nombre de tu lista de peliculas :'); // Reemplaza con el nombre de la lista que deseas recuperar
    recoverListId(listName);
});

async function recoverListId(listName) {
    if (!sessionId) {
        console.error('Usuario no autenticado. No se puede recuperar la lista.');
        return;
    }

    const url = `https://api.themoviedb.org/3/account/{account_id}/lists?api_key=${apiKey}&session_id=${sessionId}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const list = data.results.find(l => l.name === listName);
        if (list) {
            listId = list.id;
            localStorage.setItem('tmdbListId', listId); // Guardar el listId recuperado
            loadFavorites(); // Cargar favoritos de la lista recuperada
        } else {
            console.error('Lista no encontrada.');
        }
    } catch (error) {
        console.error('Error al recuperar listas:', error);
    }
}

async function createList(name, description) {
    if (!sessionId) {
        console.error('Usuario no autenticado.');
        return;
    }

    const url = `https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                name: name,
                description: description,
                language: "es-ES"
            })
        });
        const data = await response.json();
        if (data.success) {
            listId = data.list_id;
            localStorage.setItem('tmdbListId', listId);
            console.log('Lista creada con éxito, listId:', listId);
            // Aquí puedes realizar acciones adicionales, como actualizar la UI.
        } else {
            console.error('Error al crear la lista:', data.status_message);
        }
    } catch (error) {
        console.error('Error al crear la lista:', error);
    }
}

async function addMovieToList(movieId) {
    if (!listId) {
        console.error('No hay una lista de favoritos establecida.');
        return;
    }

    const url = `https://api.themoviedb.org/3/list/${listId}/add_item?api_key=${apiKey}&session_id=${sessionId}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ media_id: movieId })
        });
        const data = await response.json();
        if (data.success) {
            console.log('Película añadida a la lista de favoritos.');
            loadFavorites(); // Recargar la lista de favoritos para reflejar el cambio
        } else {
            console.error('Error al añadir la película a la lista:', data.status_message);
        }
    } catch (error) {
        console.error('Error al añadir la película a la lista:', error);
    }
}

async function removeMovieFromList(movieId) {
    if (!listId) {
        console.error('No hay una lista de favoritos establecida.');
        return;
    }

    const url = `https://api.themoviedb.org/3/list/${listId}/remove_item?api_key=${apiKey}&session_id=${sessionId}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ media_id: movieId })
        });
        const data = await response.json();
        if (data.success) {
            console.log('Película eliminada de la lista de favoritos.');
            loadFavorites(); // Recargar la lista de favoritos para reflejar el cambio
        } else {
            console.error('Error al eliminar la película de la lista:', data.status_message);
        }
    } catch (error) {
        console.error('Error al eliminar la película de la lista:', error);
    }
}

async function loadFavorites() {
    if (listId) {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}&language=es-ES`);
            const data = await response.json();
            const favoritesDiv = document.getElementById('favorite-results');
            favoritesDiv.innerHTML = '';
            data.items.forEach(movie => {
                const movieElement = createMovieElement(movie, 'remove');
                favoritesDiv.appendChild(movieElement);
            });
        } catch (error) {
            console.error('Error al cargar los favoritos:', error);
        }
    }
}

function createMovieElement(movie, action) {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');
    movieElement.dataset.movieId = movie.id;
    const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'path_to_default_image.jpg';

    movieElement.innerHTML = `
        <img src="${posterPath}" alt="${movie.title}" class="movie-poster">
        <h3 class="movie-title">${movie.title}</h3>
        <p class="movie-release-date">Año de lanzamiento: ${movie.release_date}</p>
        <p class="movie-overview">${movie.overview}</p>
        <p class="movie-vote-average">Puntuación: ${movie.vote_average}</p>
    `;

    const favoriteButton = document.createElement('button');
    favoriteButton.textContent = action === 'add' ? 'Agregar a Favoritos' : 'Eliminar de Favoritos';
    favoriteButton.classList.add('favorite-button');
    favoriteButton.onclick = function() {
        if(action === 'add') {
            addMovieToList(movie.id);
        } else {
            removeMovieFromList(movie.id);
        }
    };

    movieElement.appendChild(favoriteButton);
    return movieElement;
}