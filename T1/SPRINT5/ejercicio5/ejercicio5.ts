const searchBox = document.getElementById('searchBox') as HTMLInputElement;
const pokemonInfo = document.getElementById('pokemonInfo')!;
const errorDiv = document.getElementById('error')!;
let listaPokemon = document.getElementById('listaPokemon'); // Asegúrate de tener este elemento en tu HTML
let controlesPaginacion = document.getElementById('controlesPaginacion'); // Necesitarás esto en tu HTML también
let paginaActual = 1;

async function cargarListaPokemon(pagina = 1) {
    const offset = (pagina - 1) * 20;
    try {
      const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`;
      console.log(`Realizando solicitud a: ${url}`); // Agregar registro en la consola
      const response = await axios.get(url);
      mostrarListaPokemon(response.data.results);
    } catch (error) {
      console.error("Error al realizar la solicitud a la API", error); // Registrar el error
      mostrarError("Error al cargar la lista de Pokémon");
    }
}

function mostrarListaPokemon(pokemonList) {
    listaPokemon.innerHTML = pokemonList.map(pokemon => `<p>${pokemon.name}</p>`).join('');
    // Mostrar lista y controles de paginación
    listaPokemon.style.display = 'block';
    controlesPaginacion.style.display = 'block';
    pokemonInfo.style.display = 'none'; // Ocultar detalle de Pokémon individual
}

// Función para buscar un Pokémon
async function buscarPokemon(nombre: string) {
  try {
      console.log(nombre);
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`);
      mostrarPokemon(response.data);
      errorDiv.classList.add('hidden');
      listaPokemon.style.display = 'none';
      controlesPaginacion.style.display = 'none';
  } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
          mostrarError(`No se encontró el Pokémon: ${nombre}`);
      } else {
          mostrarError("Error al buscar el Pokémon");
      }
  }
}

// Funciones para la paginación
function cargarPaginaSiguiente() {
  cargarListaPokemon(paginaActual + 1);
}

function cargarPaginaAnterior() {
  if (paginaActual > 1) {
      cargarListaPokemon(paginaActual - 1);
  }
}

// Función para mostrar datos del Pokémon
async function mostrarPokemon(data: any) {
  const pokemonName = data.name.toUpperCase();
  const pokemonImage = data.sprites.front_default;
  const pokemonTypes = data.types.map((tipo: any) => tipo.type.name).join(', ');

  // Obtener estadísticas detalladas
  const stats = await obtenerEstadisticas(data.id);

  // Obtener movimientos del Pokémon
  const moves = await obtenerMovimientos(data.id);

  // Obtener evoluciones del Pokémon
  const evolutions = await obtenerEvoluciones(data.id);

  // Asignar los valores a los elementos HTML
  document.getElementById('pokemonName')!.textContent = pokemonName;
  document.getElementById('pokemonImage')!.src = pokemonImage;
  document.getElementById('pokemonTypes')!.textContent = `Tipo: ${pokemonTypes}`;
  document.getElementById('pokemonStats')!.textContent = stats;
  document.getElementById('pokemonMoves')!.textContent = moves;

  // Mostrar las evoluciones en el elemento HTML adecuado
  const evolutionsElement = document.getElementById('pokemonEvolutions');
  evolutionsElement.innerHTML = `Evoluciones: <br/><br/> ${evolutions}`;

  // Mostrar el contenedor de información del Pokémon
  document.getElementById('pokemonInfo')!.style.display = 'block';

  // Ocultar la lista de Pokémon y controles de paginación
  document.getElementById('listaPokemon')!.style.display = 'none';
  document.getElementById('controlesPaginacion')!.style.display = 'none';
}

async function obtenerEstadisticas(pokemonId: number) {
  // Realiza una solicitud a la API de Pokémon  para obtener las estadísticas del Pokémon
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  
  // Formatea y devuelve las estadísticas en el formato deseado
  const stats = response.data.stats.map((stat: any) => `${stat.stat.name}: ${stat.base_stat}`).join('\n');
  
  return `Estadísticas:\n${stats}`;
}

async function obtenerMovimientos(pokemonId: number) {
  try {
    // Realiza una solicitud a la API de Pokémon para obtener los movimientos del Pokémon
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  
    // Limita la cantidad de movimientos a mostrar
    const moves = response.data.moves.slice(0, 5).map((move: any) => move.move.name).join(', ');
  
    return `Movimientos:\n${moves}`;
  } catch (error) {
    console.error("Error al obtener movimientos del Pokémon", error);
    return "Movimientos no disponibles";
  }
}

async function obtenerEvoluciones(pokemonId: number) {
  try {
    // Realiza una solicitud a la API de Pokémon para obtener la cadena de evolución del Pokémon
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
  
    // Obtén la URL de la cadena de evolución
    const evolutionChainUrl = response.data.evolution_chain.url;
    const evolutionChainResponse = await axios.get(evolutionChainUrl);
  
    // Procesa la cadena de evolución y obtén información de las evoluciones
    const evolutionData = procesarEvoluciones(evolutionChainResponse.data);
  
    return evolutionData;
  } catch (error) {
    console.error("Error al obtener evoluciones del Pokémon", error);
    return "Evoluciones no disponibles";
  }
}

async function procesarEvoluciones(evolutionData: any) {
  const evolutions = [];
  
  // Recorre la cadena de evolución y obtén información de cada etapa
  let currentStage = evolutionData.chain;
  while (currentStage) {
    // Obtiene el nombre y la imagen del Pokémon en esta etapa
    const pokemonName = currentStage.species.name;
    const pokemonImage = await obtenerImagenPokemon(pokemonName);
    
    // Agrega la información al arreglo de evoluciones
    evolutions.push({ name: pokemonName, image: pokemonImage });
    
    // Avanza a la siguiente etapa
    currentStage = currentStage.evolves_to[0];
  }

  // Devuelve la información de las evoluciones como una cadena formateada
  const evolutionInfo = evolutions.map(e => `${e.name} <br/><img src="${e.image}" alt="${e.name}"><br/>`).join('');

  return evolutionInfo;
}


// Función para mostrar el error
function mostrarError(mensaje: string) {
  errorDiv.textContent = mensaje;
  errorDiv.classList.remove('hidden');
}

// Función expuesta para ser llamada desde HTML
function buscarPokemonDesdeHTML() {
  if (searchBox.value) {
    buscarPokemon(searchBox.value);
  }
}

async function obtenerImagenPokemon(nombre: string) {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`);
    return response.data.sprites.front_default;
  } catch (error) {
    console.error("Error al obtener la imagen del Pokémon", error);
    return "Imagen no disponible";
  }
}

// Exponer la función al contexto global
(window as any).buscarPokemonDesdeHTML = buscarPokemonDesdeHTML;
cargarListaPokemon();