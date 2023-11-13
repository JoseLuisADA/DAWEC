async function fetchEvolutionChain(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error al obtener la cadena de evolución: ${response.statusText}`);
    }
    return response.json();
}

async function fetchPokemonDetails(pokemonName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    if (!response.ok) {
        throw new Error(`Error al obtener detalles del Pokémon: ${response.statusText}`);
    }
    return response.json();
}

async function displayEvolutionChain() {
    const pokemonName = prompt('Inserte el nombre del pokemon que desea ver su cadena de evolución completa y habilidades :')
    try {
        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
        const speciesData = await speciesResponse.json();

        const evolutionData = await fetchEvolutionChain(speciesData.evolution_chain.url);

        let currentStage = evolutionData.chain;
        let htmlContent = '';

        do {
            const pokemonData = await fetchPokemonDetails(currentStage.species.name);

            htmlContent += `<div><h3>${pokemonData.name}</h3>`;
            htmlContent += `<ul>`;
            pokemonData.abilities.forEach(ability => {
                htmlContent += `<li>${ability.ability.name} - <button onclick="showAbilityDetails('${ability.ability.url}')">Ver detalles</button></li>`;
            });
            htmlContent += `</ul></div>`;

            currentStage = currentStage.evolves_to[0];
        } while (currentStage);

        document.getElementById('evolutions').innerHTML = htmlContent;

    } catch (error) {
        console.error(error.message);
    }
}

function showAbilityDetails(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al obtener detalles: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('abilityDetails').innerHTML = `Nombre: ${data.name}<br>Descripción: ${data.effect_entries[0].effect}`;
            openModal();
        })
        .catch(error => console.error(error.message));
}

function openModal() {
    document.getElementById('abilityModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('abilityModal').style.display = 'none';
}

document.getElementsByClassName('close')[0].onclick = function() {
    closeModal();
}

window.onclick = function(event) {
    if (event.target == document.getElementById('abilityModal')) {
        closeModal();
    }
}

displayEvolutionChain();
