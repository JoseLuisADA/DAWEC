const estudiantes = [
    { nombre: "Juan", ciudad: "Madrid", beca: false, edad: 21, calificaciones: { matematicas: 5, fisica: 7, historia: 6 } },
    { nombre: "Ana", ciudad: "Barcelona", beca: true, edad: 20, calificaciones: { matematicas: 9, fisica: 6, historia: 8 } },
    { nombre: "Pedro", ciudad: "Madrid", beca: false, edad: 23, calificaciones: { matematicas: 4, fisica: 5, historia: 7 } },
    { nombre: "Maria", ciudad: "Sevilla", beca: true, edad: 19, calificaciones: { matematicas: 8, fisica: 7, historia: 9 } },
    { nombre: "Jose", ciudad: "Madrid", beca: false, edad: 22, calificaciones: { matematicas: 6, fisica: 7, historia: 5 } },
    { nombre: "Isabel", ciudad: "Valencia", beca: true, edad: 20, calificaciones: { matematicas: 5, fisica: 8, historia: 7 } },
    { nombre: "David", ciudad: "Bilbao", beca: false, edad: 24, calificaciones: { matematicas: 7, fisica: 6, historia: 8 } },
    { nombre: "Laura", ciudad: "Barcelona", beca: true, edad: 19, calificaciones: { matematicas: 6, fisica: 8, historia: 7 } },
    { nombre: "Miguel", ciudad: "Sevilla", beca: false, edad: 21, calificaciones: { matematicas: 7, fisica: 7, historia: 8 } },
    { nombre: "Sara", ciudad: "Madrid", beca: true, edad: 20, calificaciones: { matematicas: 6, fisica: 5, historia: 9 } },
    { nombre: "Daniela", ciudad: "Valencia", beca: false, edad: 22, calificaciones: { matematicas: 8, fisica: 9, historia: 6 } },
    { nombre: "Alberto", ciudad: "Bilbao", beca: true, edad: 23, calificaciones: { matematicas: 5, fisica: 8, historia: 6 } },
    { nombre: "Gabriel", ciudad: "Sevilla", beca: false, edad: 19, calificaciones: { matematicas: 8, fisica: 5, historia: 7 } },
    { nombre: "Carmen", ciudad: "Barcelona", beca: true, edad: 24, calificaciones: { matematicas: 9, fisica: 9, historia: 9 } },
    { nombre: "Roberto", ciudad: "Madrid", beca: false, edad: 20, calificaciones: { matematicas: 4, fisica: 5, historia: 5 } },
    { nombre: "Carolina", ciudad: "Valencia", beca: true, edad: 22, calificaciones: { matematicas: 5, fisica: 7, historia: 6 } },
    { nombre: "Alejandro", ciudad: "Bilbao", beca: false, edad: 23, calificaciones: { matematicas: 9, fisica: 8, historia: 8 } },
    { nombre: "Lucia", ciudad: "Barcelona", beca: true, edad: 21, calificaciones: { matematicas: 7, fisica: 7, historia: 7 } },
    { nombre: "Ricardo", ciudad: "Sevilla", beca: false, edad: 19, calificaciones: { matematicas: 6, fisica: 5, historia: 6 } },
    { nombre: "Marina", ciudad: "Madrid", beca: true, edad: 20, calificaciones: { matematicas: 5, fisica: 9, historia: 8 } }
];

function estudiantesDestacadosPorAsignatura(estudiantes, asignatura) {
    // Ordenamos el array de estudiantes basado en las calificaciones de la asignatura dada.
    const estudiantesOrdenados = estudiantes.sort((a, b) => b.calificaciones[asignatura] - a.calificaciones[asignatura]);
    
    // Retornamos los 3 primeros estudiantes del array ordenado.
    return estudiantesOrdenados.slice(0, 3);
}

function asignaturaMenorRendimiento(estudiantes) {
    const asignaturas = Object.keys(estudiantes[0].calificaciones);
    let menorAsignatura = asignaturas[0];
    let menorPromedio = Infinity;

    for (const asignatura of asignaturas) {
        const promedio = estudiantes.reduce((sum, estudiante) => sum + estudiante.calificaciones[asignatura], 0) / estudiantes.length;
        if (promedio < menorPromedio) {
            menorPromedio = promedio;
            menorAsignatura = asignatura;
        }
    }

    return menorAsignatura;
}

function mejoraNotasBeca(estudiantes) {
    for (const estudiante of estudiantes) {
        if (estudiante.beca) {
            for (const asignatura in estudiante.calificaciones) {
                estudiante.calificaciones[asignatura] = Math.min(10, estudiante.calificaciones[asignatura] * 1.10);
            }
        }
    }
}

function filtrarPorCiudadYAsignatura(estudiantes, ciudad, asignatura) {
    return estudiantes.filter(estudiante => estudiante.ciudad === ciudad).sort((a, b) => b.calificaciones[asignatura] - a.calificaciones[asignatura]);
}

function estudiantesSinBecaPorCiudad(estudiantes, ciudad) {
    return estudiantes.filter(estudiante => estudiante.ciudad === ciudad && !estudiante.beca).length;
}

function promedioEdadEstudiantesConBeca(estudiantes) {
    const totalEdades = estudiantes.filter(estudiante => estudiante.beca).reduce((sum, estudiante) => sum + estudiante.edad, 0);
    return totalEdades / estudiantes.filter(estudiante => estudiante.beca).length;
}

function mejoresEstudiantes(estudiantes) {
    return estudiantes.slice().sort((a, b) => {
        const promedioA = Object.values(a.calificaciones).reduce((sum, calificacion) => sum + calificacion, 0) / Object.keys(a.calificaciones).length;
        const promedioB = Object.values(b.calificaciones).reduce((sum, calificacion) => sum + calificacion, 0) / Object.keys(b.calificaciones).length;
        return promedioB - promedioA;
    }).slice(0, 2);
}

function estudiantesAprobados(estudiantes) {
    return estudiantes.filter(estudiante => Object.values(estudiante.calificaciones).every(calificacion => calificacion >= 5)).map(estudiante => estudiante.nombre);
}

function testFunction(funcName, ...args) {
    const result = window[funcName](estudiantes, ...args);
    console.log(result);
    alert(JSON.stringify(result, null, 2));
}