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
// Asegúrate de compilar este TypeScript a JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.getElementById('search-box');
    searchBox.addEventListener('input', () => {
        const query = searchBox.value;
        buscarPokemon(query);
    });
});
function buscarPokemon(query) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!query)
            return;
        try {
            const response = yield fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
            if (!response.ok)
                throw new Error('Pokemon no encontrado');
            const pokemon = yield response.json();
            mostrarPokemon(pokemon);
        }
        catch (error) {
            mostrarError();
        }
    });
}
function mostrarPokemon(pokemon) {
    // Actualizar el DOM con la información del Pokémon
}
function mostrarError() {
    const errorMessage = document.getElementById('error-message');
    errorMessage.innerHTML = '<p>Pokémon no encontrado. Intenta de nuevo.</p>';
    // Añadir animación de warning aquí
}
