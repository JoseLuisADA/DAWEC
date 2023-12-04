let apiKey = localStorage.getItem('tmdbApiKey') || '';
let listId = null; // Ya no se recupera de localStorage
let sessionId = localStorage.getItem('tmdbSessionId') || '';
let currentPage = 1;
let loggedIn = sessionId !== '';

document.addEventListener('DOMContentLoaded', function() {
    ['loginButton', 'setApiKeyButton', 'searchButton', 'nextButton', 'prevButton', 'logoutButton'].forEach(buttonId => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('click', window[`${buttonId}Event`]);
        }
    });

    const createListForm = document.getElementById('createListForm');
    if (createListForm) {
        createListForm.addEventListener('submit', createListEvent);
    }

    // Eventos y carga inicial
    document.getElementById('loginButton').addEventListener('click', authenticateUser);
    document.getElementById('setApiKeyButton').addEventListener('click', setApiKey);
    document.getElementById('searchButton').addEventListener('click', searchMoviesEvent);
    document.getElementById('nextButton').addEventListener('click', nextPageEvent);
    document.getElementById('prevButton').addEventListener('click', prevPageEvent);
    document.getElementById('logoutButton').addEventListener('click', handleLogout);
    document.getElementById('createListForm').addEventListener('submit', createListEvent);

    if (apiKey) {
        loadGenres();
    }

    if (loggedIn && listId) {
        loadFavorites(); // Cargar favoritos si el usuario está autenticado y listId está disponible
    }
});

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
    const authUrl = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://127.0.0.1:5500/ejercicio4.html`;
    window.location.href = authUrl; // Redirige al usuario para la autorización
}

function handleLogout() {
    sessionId = '';
    listId = null;
    loggedIn = false;
    localStorage.removeItem('tmdbSessionId'); // Elimina la session_id del almacenamiento local
    updateUIForLogout(); // Actualiza la UI para reflejar el estado de logout
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
            localStorage.setItem('tmdbSessionId', sessionId); 
            loggedIn = true;
            updateUIAfterLogin();
            if (listId) {
                await loadFavorites(); // Cargar favoritos si ya se tiene un listId
            }
        }
    } catch (error) {
        console.error('Error al crear la session_id:', error);
    }
}

async function authenticateUser() {
    if (!apiKey) {
        alert('Por favor, establezca primero el API Key.');
        return;
    } else {
        try {
            const requestToken = await createRequestToken();
            if (requestToken) {
                askUserForPermission(requestToken);
            }
        } catch (error) {
            console.error('Error durante la autenticación:', error);
        }
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
    apiKey = localStorage.getItem('tmdbApiKey') || '';
    sessionId = localStorage.getItem('tmdbSessionId') || '';
    listId = localStorage.getItem('tmdbListId');

    console.log('API Key:', apiKey, 'Session ID:', sessionId, 'List ID:', listId);

    if (!apiKey) {
        console.log('API Key no establecida.');
        return;
    }

    loggedIn = sessionId !== '';

    if (loggedIn) {
        updateUIAfterLogin();
        if (listId) {
            console.log('Cargando favoritos...');
            await loadFavorites();
        }
    } else {
        updateUIForLogout();
        handleRedirect();
    }
};

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

document.getElementById('recoverListButton').addEventListener('click', function () {
    const listName = prompt('Indica el nombre de tu lista de peliculas:');
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
            localStorage.setItem('tmdbListId', listId); // Guardar listId en localStorage
            console.log('Lista cargada');
            await loadFavorites(); // Cargar favoritos de la lista recuperada
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

async function  addMovieToList(movieId) {
    if (!listId || !loggedIn) {
        console.error('No hay una lista de favoritos establecida o el usuario no está autenticado.');
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
            console.log('Película añadida a la lista de favoritos:', movieId);
            await loadFavorites(); // Actualizar la lista de favoritos después de la adición
        } else {
            console.error('Error al añadir la película a la lista:', data.status_message);
        }
    } catch (error) {
        console.error('Error al añadir la película a la lista:', error);
    }
}

async function removeMovieFromList(movieId) {
    if (!listId || !loggedIn) {
        console.error('No hay una lista de favoritos establecida o el usuario no está autenticado.');
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
            console.log('Película eliminada de la lista de favoritos:', movieId);

            // Eliminar visualmente la película del DOM
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
    if (!listId || !loggedIn) {
        console.log('Falta listId o el usuario no está autenticado.');
        return;
    }

    console.log('Cargando películas de la lista:', listId);

    try {
        // Agregar un timestamp al URL para prevenir la carga desde caché
        const timestamp = new Date().getTime();
        const response = await fetch(`https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}&language=es-ES&${timestamp}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        console.log('Películas recibidas:', data.items);

        const favoritesDiv = document.getElementById('favorite-results');
        favoritesDiv.innerHTML = '';

        data.items.forEach(movie => {
            const movieElement = createMovieElement(movie, 'remove');
            if (movieElement) {
                favoritesDiv.appendChild(movieElement);
            }
        });
    } catch (error) {
        console.error('Error al cargar los favoritos desde la API:', error);
    }
}



function createMovieElement(movie, action) {
    if (!movie || !movie.id) return null;

    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');
    movieElement.dataset.movieId = movie.id;

    const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'ruta_a_imagen_por_defecto.jpg';
    movieElement.innerHTML = `
        <img src="${posterPath}" alt="${movie.title}" class="movie-poster">
        <h3 class="movie-title">${movie.title}</h3>
        <p class="movie-release-date">Año de lanzamiento: ${movie.release_date}</p>
        <p class="movie-overview">${movie.overview}</p>
        <p class="movie-vote-average">Puntuación: ${movie.vote_average}</p>
        <button class='favorite-button'>${action === 'add' ? 'Agregar a Favoritos' : 'Eliminar de Favoritos'}</button>
    `;

    const favoriteButton = movieElement.querySelector('.favorite-button');
    favoriteButton.addEventListener('click', async () => {
        if (action === 'remove') {
            await removeMovieFromList(movie.id);
        } else if (action === 'add') {
            await addMovieToList(movie.id);
        }
    });

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

// Funciones Auxiliares
function setApiKey() {
    const userApiKey = prompt('Por favor, ingresa tu API Key:');
    if (userApiKey) {
        apiKey = userApiKey;
        localStorage.setItem('tmdbApiKey', apiKey);
        console.log('API Key establecida:', apiKey);
        loadGenres();
    } else {
        alert("Se requiere una API Key para utilizar esta aplicación.");
    }
}

function searchMoviesEvent() {
    const keyword = document.getElementById('keyword').value;
    const genre = document.getElementById('genre').value || '';
    searchMovies(keyword, genre, 1);
}

function nextPageEvent() {
    const keyword = document.getElementById('keyword').value;
    const genre = document.getElementById('genre').value;
    nextPage(keyword, genre);
}

function prevPageEvent() {
    const keyword = document.getElementById('keyword').value;
    const genre = document.getElementById('genre').value;
    prevPage(keyword, genre);
}

function createListEvent(event) {
    event.preventDefault();
    const listName = document.getElementById('listName').value;
    const listDescription = document.getElementById('listDescription').value;
    createList(listName, listDescription);
}

// Agregar un botón y su funcionalidad para pedir la API Key
document.getElementById('apiKeyButton').addEventListener('click', askForApiKey);

// Función para agregar una película a la lista de favoritos y actualizar la UI
async function addMovieToList(movieId) {
    if (!listId || !loggedIn) {
        console.error('No hay una lista de favoritos establecida o el usuario no está autenticado.');
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
            console.log('Película añadida a la lista de favoritos:', movieId);
            // Obtener la información de la película y agregarla visualmente
            const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=es-ES`);
            const movieData = await movieResponse.json();
            const movieElement = createMovieElement(movieData, 'remove');
            if (movieElement) {
                document.getElementById('favorite-results').appendChild(movieElement);
            }
        } else {
            console.error('Error al añadir la película a la lista:', data.status_message);
        }
    } catch (error) {
        console.error('Error al añadir la película a la lista:', error);
    }
}



