var tabla = [
    {
        Nombre: "William",
        Edad: 36,
        DNI: "77889900W",
        "Tiene/No tiene hijos": "Tiene",
        "Fecha de nacimiento": "04/04/1987"
      }
    ,
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
        DNI: "22334455E",
        "Tiene/No tiene hijos": "No tiene",
        "Fecha de nacimiento": "14/09/1994"
      },
      {
        Nombre: "Fernando",
        Edad: 27,
        DNI: "33445566F",
        "Tiene/No tiene hijos": "Tiene",
        "Fecha de nacimiento": "21/07/1996"
      },
      {
        Nombre: "Gabriela",
        Edad: 32,
        DNI: "44556677G",
        "Tiene/No tiene hijos": "No tiene",
        "Fecha de nacimiento": "05/12/1991"
      },
      {
        Nombre: "Hugo",
        Edad: 35,
        DNI: "55667788H",
        "Tiene/No tiene hijos": "Tiene",
        "Fecha de nacimiento": "02/04/1988"
      },
      {
        Nombre: "Isabel",
        Edad: 24,
        DNI: "66778899I",
        "Tiene/No tiene hijos": "No tiene",
        "Fecha de nacimiento": "10/11/1999"
      },
      {
        Nombre: "Jorge",
        Edad: 33,
        DNI: "77889900J",
        "Tiene/No tiene hijos": "Tiene",
        "Fecha de nacimiento": "22/06/1990"
      },
      {
        Nombre: "Laura",
        Edad: 26,
        DNI: "88990011L",
        "Tiene/No tiene hijos": "No tiene",
        "Fecha de nacimiento": "17/03/1997"
      },
      {
        Nombre: "Mario",
        Edad: 34,
        DNI: "99001122M",
        "Tiene/No tiene hijos": "Tiene",
        "Fecha de nacimiento": "09/10/1989"
      },
      {
        Nombre: "Natalia",
        Edad: 28,
        DNI: "00112233N",
        "Tiene/No tiene hijos": "No tiene",
        "Fecha de nacimiento": "25/05/1995"
      },
      {
        Nombre: "Óscar",
        Edad: 27,
        DNI: "11223344O",
        "Tiene/No tiene hijos": "Tiene",
        "Fecha de nacimiento": "30/08/1996"
      },
      {
        Nombre: "Patricia",
        Edad: 29,
        DNI: "22334455P",
        "Tiene/No tiene hijos": "No tiene",
        "Fecha de nacimiento": "03/09/1994"
      },
      {
        Nombre: "Raúl",
        Edad: 31,
        DNI: "33445566R",
        "Tiene/No tiene hijos": "Tiene",
        "Fecha de nacimiento": "12/01/1992"
      },
      {
        Nombre: "Sandra",
        Edad: 30,
        DNI: "44556677S",
        "Tiene/No tiene hijos": "No tiene",
        "Fecha de nacimiento": "28/02/1993"
      },
      {
        Nombre: "Tomás",
        Edad: 32,
        DNI: "55667788T",
        "Tiene/No tiene hijos": "Tiene",
        "Fecha de nacimiento": "07/12/1991"
      },
      {
        Nombre: "Verónica",
        Edad: 25,
        DNI: "66778899V",
        "Tiene/No tiene hijos": "No tiene",
        "Fecha de nacimiento": "15/06/1998"
      },
      {
        Nombre: "Ana",
        Edad: 25,
        DNI: "45678912B",
        "Tiene/No tiene hijos": "Tiene",
        "Fecha de nacimiento": "12/05/1998"
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

const ordenColumnas = {};

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
        header.addEventListener('click', function () {
            const columna = header.textContent;
            // Si la columna no se ha ordenado antes, se establece a ascendente por defecto
            if (!ordenColumnas[columna]) {
                ordenColumnas[columna] = true;
            } else {
                ordenColumnas[columna] = !ordenColumnas[columna];
            }

            const sortedData = ordenarTabla(tabla, columna, ordenColumnas[columna]);
            generarTabla(sortedData);
        });
    });
}


generarTabla(tabla);