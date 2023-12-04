// Asegúrate de compilar este TypeScript a JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.getElementById('search-box') as HTMLInputElement;
    searchBox.addEventListener('input', () => {
        const query = searchBox.value;
        buscarPokemon(query);
    });
});

async function buscarPokemon(query: string) {
    if (!query) return;

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
        if (!response.ok) throw new Error('Pokemon no encontrado');
        
        const pokemon = await response.json();
        mostrarPokemon(pokemon);
    } catch (error) {
        mostrarError();
    }
}

function mostrarPokemon(pokemon: any) {
    // Actualizar el DOM con la información del Pokémon
}

function mostrarError() {
    const errorMessage = document.getElementById('error-message')!;
    errorMessage.innerHTML = '<p>Pokémon no encontrado. Intenta de nuevo.</p>';
    // Añadir animación de warning aquí
}
