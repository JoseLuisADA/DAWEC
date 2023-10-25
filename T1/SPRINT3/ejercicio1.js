const objetoPrueba = {a: 1, b: 2, c: 3, d:4};

function filtrarPropiedades(objeto, propiedadesARecuperarArray){

    let result = {};

    propiedadesARecuperarArray.forEach(propiedad=> {
        if(objeto.hasOwnProperty(propiedad)) {
            result[propiedad] = objeto[propiedad];
        }
    });

    return result;

}

console.log(filtrarPropiedades(objetoPrueba, ["b", "b"]));