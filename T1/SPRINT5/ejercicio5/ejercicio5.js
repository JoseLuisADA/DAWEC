"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var searchBox = document.getElementById('searchBox');
var pokemonInfo = document.getElementById('pokemonInfo');
var errorDiv = document.getElementById('error');
var listaPokemon = document.getElementById('listaPokemon'); // Asegúrate de tener este elemento en tu HTML
var controlesPaginacion = document.getElementById('controlesPaginacion'); // Necesitarás esto en tu HTML también
var paginaActual = 1;
function cargarListaPokemon(pagina) {
    if (pagina === void 0) { pagina = 1; }
    return __awaiter(this, void 0, void 0, function () {
        var offset, url, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    offset = (pagina - 1) * 20;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    url = "https://pokeapi.co/api/v2/pokemon?offset=".concat(offset, "&limit=20");
                    console.log("Realizando solicitud a: ".concat(url)); // Agregar registro en la consola
                    return [4 /*yield*/, axios.get(url)];
                case 2:
                    response = _a.sent();
                    mostrarListaPokemon(response.data.results);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error al realizar la solicitud a la API", error_1); // Registrar el error
                    mostrarError("Error al cargar la lista de Pokémon");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function mostrarListaPokemon(pokemonList) {
    listaPokemon.innerHTML = pokemonList.map(function (pokemon) { return "<p>".concat(pokemon.name, "</p>"); }).join('');
    // Mostrar lista y controles de paginación
    listaPokemon.style.display = 'block';
    controlesPaginacion.style.display = 'block';
    pokemonInfo.style.display = 'none'; // Ocultar detalle de Pokémon individual
}
// Función para buscar un Pokémon
function buscarPokemon(nombre) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    console.log(nombre);
                    return [4 /*yield*/, axios.get("https://pokeapi.co/api/v2/pokemon/".concat(nombre.toLowerCase()))];
                case 1:
                    response = _b.sent();
                    mostrarPokemon(response.data);
                    errorDiv.classList.add('hidden');
                    listaPokemon.style.display = 'none';
                    controlesPaginacion.style.display = 'none';
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _b.sent();
                    if (axios.isAxiosError(error_2) && ((_a = error_2.response) === null || _a === void 0 ? void 0 : _a.status) === 404) {
                        mostrarError("No se encontr\u00F3 el Pok\u00E9mon: ".concat(nombre));
                    }
                    else {
                        mostrarError("Error al buscar el Pokémon");
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
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
function mostrarPokemon(data) {
    return __awaiter(this, void 0, void 0, function () {
        var pokemonName, pokemonImage, pokemonTypes, stats, moves, evolutions, evolutionsElement;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pokemonName = data.name.toUpperCase();
                    pokemonImage = data.sprites.front_default;
                    pokemonTypes = data.types.map(function (tipo) { return tipo.type.name; }).join(', ');
                    return [4 /*yield*/, obtenerEstadisticas(data.id)];
                case 1:
                    stats = _a.sent();
                    return [4 /*yield*/, obtenerMovimientos(data.id)];
                case 2:
                    moves = _a.sent();
                    return [4 /*yield*/, obtenerEvoluciones(data.id)];
                case 3:
                    evolutions = _a.sent();
                    // Asignar los valores a los elementos HTML
                    document.getElementById('pokemonName').textContent = pokemonName;
                    document.getElementById('pokemonImage').src = pokemonImage;
                    document.getElementById('pokemonTypes').textContent = "Tipo: ".concat(pokemonTypes);
                    document.getElementById('pokemonStats').textContent = stats;
                    document.getElementById('pokemonMoves').textContent = moves;
                    evolutionsElement = document.getElementById('pokemonEvolutions');
                    evolutionsElement.innerHTML = "Evoluciones: <br/><br/> ".concat(evolutions);
                    // Mostrar el contenedor de información del Pokémon
                    document.getElementById('pokemonInfo').style.display = 'block';
                    // Ocultar la lista de Pokémon y controles de paginación
                    document.getElementById('listaPokemon').style.display = 'none';
                    document.getElementById('controlesPaginacion').style.display = 'none';
                    return [2 /*return*/];
            }
        });
    });
}
function obtenerEstadisticas(pokemonId) {
    return __awaiter(this, void 0, void 0, function () {
        var response, stats;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios.get("https://pokeapi.co/api/v2/pokemon/".concat(pokemonId))];
                case 1:
                    response = _a.sent();
                    stats = response.data.stats.map(function (stat) { return "".concat(stat.stat.name, ": ").concat(stat.base_stat); }).join('\n');
                    return [2 /*return*/, "Estad\u00EDsticas:\n".concat(stats)];
            }
        });
    });
}
function obtenerMovimientos(pokemonId) {
    return __awaiter(this, void 0, void 0, function () {
        var response, moves, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.get("https://pokeapi.co/api/v2/pokemon/".concat(pokemonId))];
                case 1:
                    response = _a.sent();
                    moves = response.data.moves.slice(0, 5).map(function (move) { return move.move.name; }).join(', ');
                    return [2 /*return*/, "Movimientos:\n".concat(moves)];
                case 2:
                    error_3 = _a.sent();
                    console.error("Error al obtener movimientos del Pokémon", error_3);
                    return [2 /*return*/, "Movimientos no disponibles"];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function obtenerEvoluciones(pokemonId) {
    return __awaiter(this, void 0, void 0, function () {
        var response, evolutionChainUrl, evolutionChainResponse, evolutionData, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, axios.get("https://pokeapi.co/api/v2/pokemon-species/".concat(pokemonId))];
                case 1:
                    response = _a.sent();
                    evolutionChainUrl = response.data.evolution_chain.url;
                    return [4 /*yield*/, axios.get(evolutionChainUrl)];
                case 2:
                    evolutionChainResponse = _a.sent();
                    evolutionData = procesarEvoluciones(evolutionChainResponse.data);
                    return [2 /*return*/, evolutionData];
                case 3:
                    error_4 = _a.sent();
                    console.error("Error al obtener evoluciones del Pokémon", error_4);
                    return [2 /*return*/, "Evoluciones no disponibles"];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function procesarEvoluciones(evolutionData) {
    return __awaiter(this, void 0, void 0, function () {
        var evolutions, currentStage, pokemonName, pokemonImage, evolutionInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    evolutions = [];
                    currentStage = evolutionData.chain;
                    _a.label = 1;
                case 1:
                    if (!currentStage) return [3 /*break*/, 3];
                    pokemonName = currentStage.species.name;
                    return [4 /*yield*/, obtenerImagenPokemon(pokemonName)];
                case 2:
                    pokemonImage = _a.sent();
                    // Agrega la información al arreglo de evoluciones
                    evolutions.push({ name: pokemonName, image: pokemonImage });
                    // Avanza a la siguiente etapa
                    currentStage = currentStage.evolves_to[0];
                    return [3 /*break*/, 1];
                case 3:
                    evolutionInfo = evolutions.map(function (e) { return "".concat(e.name, " <br/><img src=\"").concat(e.image, "\" alt=\"").concat(e.name, "\"><br/>"); }).join('');
                    return [2 /*return*/, evolutionInfo];
            }
        });
    });
}
// Función para mostrar el error
function mostrarError(mensaje) {
    errorDiv.textContent = mensaje;
    errorDiv.classList.remove('hidden');
}
// Función expuesta para ser llamada desde HTML
function buscarPokemonDesdeHTML() {
    if (searchBox.value) {
        buscarPokemon(searchBox.value);
    }
}
function obtenerImagenPokemon(nombre) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.get("https://pokeapi.co/api/v2/pokemon/".concat(nombre.toLowerCase()))];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data.sprites.front_default];
                case 2:
                    error_5 = _a.sent();
                    console.error("Error al obtener la imagen del Pokémon", error_5);
                    return [2 /*return*/, "Imagen no disponible"];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Exponer la función al contexto global
window.buscarPokemonDesdeHTML = buscarPokemonDesdeHTML;
cargarListaPokemon();
