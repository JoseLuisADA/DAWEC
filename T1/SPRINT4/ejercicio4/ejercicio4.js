let apiKey = '';
let listId = null;
let sessionId = ''; 
let currentPage = 1;
let loggedIn = false;

function handleLogout() {
    sessionId = '';
    listId = null;
    loggedIn = false;
    localStorage.removeItem('tmdbSessionId'); // Elimina la session_id del almacenamiento local
    updateUIForLogout(); // Actualiza la UI para reflejar el estado de logout
}

document.getElementById('logoutButton').addEventListener('click', handleLogout);

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
    const authUrl = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://127.0.0.1:5500/ejercicio4/ejercicio4.html`;
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
            localStorage.setItem('tmdbSessionId', sessionId); // Guarda la session_id en el almacenamiento local
            loggedIn = true; // Establece loggedIn en true
            updateUIAfterLogin(); // Actualiza la UI
        }
    } catch (error) {
        console.error('Error al crear la session_id:', error);
    }
}

async function authenticateUser() {
    if (apiKey) {
        try {
            const requestToken = await createRequestToken();
            if (requestToken) {
                askUserForPermission(requestToken);
            }
        } catch (error) {
            console.error('Error durante la autenticación:', error);
        }
    } else {
        alert('Por favor, establezca primero el API Key.');
    }
}

// Función para manejar la carga de la página de redirección
async function handleRedirect() {
    const urlParams = new URLSearchParams(window.location.search);
    const requestToken = urlParams.get('request_token');
    const denied = urlParams.get('denied'); // Agrega esto para verificar si el usuario rechazó el consentimiento

    if (requestToken && !denied) {
        await createSessionId(requestToken);
    } else if (denied) {
        // Manejar la situación cuando el usuario rechaza el consentimiento
        handleLogout();
    }
}

window.onload = async function() {
    const storedApiKey = localStorage.getItem('tmdbApiKey');
    if (storedApiKey) {
        apiKey = storedApiKey;
        console.log('API Key recuperada:', apiKey);
    }

    // Verifica si hay una sesión activa al cargar la página
    const storedSessionId = localStorage.getItem('tmdbSessionId');
    if (storedSessionId) {
        sessionId = storedSessionId;
        loggedIn = true;
        updateUIAfterLogin();
    } else {
        // Asegúrate de ocultar los elementos si no hay sesión activa
        updateUIForLogout();
        // Maneja la redirección después de la autenticación de TMDB solo si no hay sesión almacenada
        handleRedirect();
    }
};

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginButton').addEventListener('click', authenticateUser);
    document.getElementById('setApiKeyButton').addEventListener('click', function() {
        const userApiKey = prompt('Por favor, ingresa tu API Key:');
        if (userApiKey) {
            apiKey = userApiKey;
            localStorage.setItem('tmdbApiKey', apiKey); // Almacena la API Key
            console.log('API Key establecida:', apiKey);
            loadGenres(); // Cargar géneros después de establecer la API Key
        }
    });
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
    if (apiKey) {
        try {
            const genreResponse = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=es-ES`);
            const genreData = await genreResponse.json();
            const genreSelect = document.getElementById('genre');
            genreData.genres.forEach(genre => {
                const option = document.createElement('option');
                option.value = genre.id;
                option.textContent = genre.name;
                genreSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error al cargar géneros:', error);
        }
    } else {
        console.error('API Key no establecida. No se pueden cargar los géneros.');
    }
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
            console.log('Lista cargada');
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

            // Encuentra y elimina el elemento de película del DOM
            const movieElement = document.querySelector(`.movie[data-movie-id="${movieId}"]`);
            if (movieElement) {
                movieElement.remove();
            }
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

// Nuevo botón para cerrar sesión
document.getElementById('logoutButton').addEventListener('click', function() {
    sessionId = '';
    listId = null;
    loggedIn = false;
    updateUIForLogout(); // Función para actualizar la UI después del logout
});

// Función para actualizar la UI después de cerrar sesión
function updateUIForLogout() {
    document.getElementById('createListSection').style.display = 'none';
    document.getElementById('favoritesFieldset').style.display = 'none';
    document.getElementById('logoutButton').style.display = 'none';
    document.getElementById('recoverListButton').style.display = 'none';
    document.getElementById('loginButton').style.display = 'block';
    // Limpia cualquier dato relacionado con la sesión
    // Por ejemplo: Limpiar la lista de favoritos
}

// Función para actualizar la UI después de iniciar sesión
function updateUIAfterLogin() {
    if (loggedIn) {
        document.getElementById('createListSection').style.display = 'block';
        document.getElementById('favoritesFieldset').style.display = 'block';
        document.getElementById('logoutButton').style.display = 'block';
        document.getElementById('recoverListButton').style.display = 'block';
        document.getElementById('loginButton').style.display = 'none';
        loadFavorites();
    }
}

// Función para pedir la API Key al usuario
function askForApiKey() {
    const userApiKey = prompt("Por favor, introduce tu API Key:");
    if (userApiKey) {
        apiKey = userApiKey;
    } else {
        alert("Se requiere una API Key para utilizar esta aplicación.");
    }
}

// Agregar un botón y su funcionalidad para pedir la API Key
document.getElementById('apiKeyButton').addEventListener('click', askForApiKey);

