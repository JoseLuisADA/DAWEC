async function fetchPokemonStats(pokemonName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    if (!response.ok) {
        throw new Error(`No se pudo obtener información para ${pokemonName}: ${response.statusText}`);
    }
    return response.json();
}

async function comparePokemon() {
    const pokemon1 = prompt('Inserte el nombre del primer pokemon a comparar :');
    const pokemon2 = prompt('Inserte el nombre del segundo pokemon a comparar :');
    try {
        const pokemonData1 = await fetchPokemonStats(pokemon1);
        const pokemonData2 = await fetchPokemonStats(pokemon2);

        let statsSum = [0, 0];
        let tableHTML = `<table><tr><th>Stat</th><th>${pokemon1}</th><th>${pokemon2}</th></tr>`;

        pokemonData1.stats.forEach((stat, index) => {
            const statName = stat.stat.name;
            const statValue1 = stat.base_stat;
            const statValue2 = pokemonData2.stats[index].base_stat;

            statsSum[0] += statValue1;
            statsSum[1] += statValue2;

            tableHTML += `<tr>
                <td>${statName}</td>
                <td>${statValue1}</td>
                <td>${statValue2}</td>
            </tr>`;
        });

        tableHTML += `<tr>
            <th>Total</th>
            <th>${statsSum[0]}</th>
            <th>${statsSum[1]}</th>
        </tr></table>`;

        document.getElementById('comparisonTable').innerHTML = tableHTML;

    } catch (error) {
        console.error(error.message);
    }
}

comparePokemon();
