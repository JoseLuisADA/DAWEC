const tabla = [
    {
        Nombre: "Ana",
        Edad: 25,
        DNI: "45678912B",
        "Tiene/No tiene hijos": "Tiene",
        "Fecha de nacimiento": "12/05/1998"
    },
    {
        Nombre: "Carlos",
        Edad: 30,
        DNI: "12345678A",
        "Tiene/No tiene hijos": "No tiene",
        "Fecha de nacimiento": "05/02/1993"
    },
    {
        Nombre: "Berta",
        Edad: 28,
        DNI: "98765432C",
        "Tiene/No tiene hijos": "Tiene",
        "Fecha de nacimiento": "20/03/1995"
    },
    {
        Nombre: "David",
        Edad: 31,
        DNI: "11223344D",
        "Tiene/No tiene hijos": "Tiene",
        "Fecha de nacimiento": "18/08/1992"
    },
    {
        Nombre: "Elena",
        Edad: 29,
        DNI: "55667788E",
        "Tiene/No tiene hijos": "No tiene",
        "Fecha de nacimiento": "04/06/1994"
    },
    {
        Nombre: "Francisco",
        Edad: 40,
        DNI: "66554433F",
        "Tiene/No tiene hijos": "Tiene",
        "Fecha de nacimiento": "10/10/1983"
    },
    {
        Nombre: "Gloria",
        Edad: 35,
        DNI: "77443322G",
        "Tiene/No tiene hijos": "No tiene",
        "Fecha de nacimiento": "15/11/1988"
    },
    {
        Nombre: "Hugo",
        Edad: 33,
        DNI: "22334455H",
        "Tiene/No tiene hijos": "Tiene",
        "Fecha de nacimiento": "22/04/1990"
    },
    {
        Nombre: "Irene",
        Edad: 37,
        DNI: "99887766I",
        "Tiene/No tiene hijos": "Tiene",
        "Fecha de nacimiento": "01/01/1986"
    },
    {
        Nombre: "Javier",
        Edad: 32,
        DNI: "88996655J",
        "Tiene/No tiene hijos": "No tiene",
        "Fecha de nacimiento": "07/07/1991"
    },
    {
        Nombre: "Karla",
        Edad: 38,
        DNI: "77665544K",
        "Tiene/No tiene hijos": "Tiene",
        "Fecha de nacimiento": "30/09/1985"
    },
    {
        Nombre: "Luis",
        Edad: 39,
        DNI: "66774433L",
        "Tiene/No tiene hijos": "No tiene",
        "Fecha de nacimiento": "11/11/1984"
    },
    {
        Nombre: "Mónica",
        Edad: 34,
        DNI: "55662233M",
        "Tiene/No tiene hijos": "Tiene",
        "Fecha de nacimiento": "12/12/1989"
    },
    {
        Nombre: "Néstor",
        Edad: 36,
        DNI: "44551122N",
        "Tiene/No tiene hijos": "No tiene",
        "Fecha de nacimiento": "25/05/1987"
    },
    {
        Nombre: "Olga",
        Edad: 41,
        DNI: "33440011O",
        "Tiene/No tiene hijos": "Tiene",
        "Fecha de nacimiento": "03/03/1982"
    },
    {
        Nombre: "Pedro",
        Edad: 42,
        DNI: "11223300P",
        "Tiene/No tiene hijos": "No tiene",
        "Fecha de nacimiento": "28/02/1981"
    },
    {
        Nombre: "Queralt",
        Edad: 43,
        DNI: "00998877Q",
        "Tiene/No tiene hijos": "Tiene",
        "Fecha de nacimiento": "08/08/1980"
    },
    {
        Nombre: "Roberto",
        Edad: 44,
        DNI: "99112233R",
        "Tiene/No tiene hijos": "No tiene",
        "Fecha de nacimiento": "19/09/1979"
    },
    {
        Nombre: "Sara",
        Edad: 45,
        DNI: "88221100S",
        "Tiene/No tiene hijos": "Tiene",
        "Fecha de nacimiento": "20/10/1978"
    },
    {
        Nombre: "Tomás",
        Edad: 46,
        DNI: "77330099T",
        "Tiene/No tiene hijos": "No tiene",
        "Fecha de nacimiento": "21/11/1977"
    }
];

function ordenarTabla(personas, columna, ascendente = true) {
    return personas.sort((a, b) => {
        let comparacion = 0;

        if (columna === "Fecha de nacimiento") {
            const [diaA, mesA, añoA] = a[columna].split('/').map(Number);
            const [diaB, mesB, añoB] = b[columna].split('/').map(Number);
            const dateA = new Date(añoA, mesA - 1, diaA);
            const dateB = new Date(añoB, mesB - 1, diaB);
            comparacion = dateA - dateB;
        } else if (typeof a[columna] === "string") {
            comparacion = a[columna].localeCompare(b[columna]);
        } else {
            comparacion = a[columna] - b[columna];
        }

        return ascendente ? comparacion : -comparacion;
    });
}

// Función para generar la tabla en HTML
function generarTabla(tabla) {
    const tableContainer = document.getElementById('tableContainer');
    let html = '<table>';
    html += '<thead><tr>';

    // Encabezados de la tabla
    for (const key in tabla[0]) {
        html += `<th>${key}</th>`;
    }
    html += '</tr></thead><tbody>';

    // Filas de la tabla
    for (const fila of tabla) {
        html += '<tr>';
        for (const key in fila) {
            html += `<td>${fila[key]}</td>`;
        }
        html += '</tr>';
    }
    html += '</tbody></table>';
    tableContainer.innerHTML = html;

    // Agregar eventos de clic a los encabezados
    const headers = tableContainer.querySelectorAll('th');
    headers.forEach(header => {
        let ordenAscendente = true; // Por defecto, la primera vez será ascendente
        header.addEventListener('click', function() {
            const sortedData = ordenarTabla(tabla, header.textContent, ordenAscendente);
            generarTabla(sortedData);
            ordenAscendente = !ordenAscendente; // Alternar entre ascendente y descendente
        });
    });
}

// Iniciar
generarTabla(tabla);