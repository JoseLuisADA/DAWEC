async function fetchPokemonData() {
    const pokemonName = prompt('Inserta el nombre de un pokemon :');
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
            throw new Error(`Pokemon not found: ${response.statusText}`);
        }
        const data = await response.json();

        console.log(`Name: ${data.name}`);
        console.log(`ID: ${data.id}`);
        console.log(`Types: ${data.types.map(type => type.type.name).join(', ')}`);
        console.log(`Image URL: ${data.sprites.front_default}`);
    } catch (error) {
        console.error(error.message);
    }
}

fetchPokemonData();
