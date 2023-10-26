const objetoPrueba = {a: 1, b: 2, c: 3, d: 4};

function filtrarPropiedades(objeto, propiedadesARecuperarArray){

    let result = {};

    propiedadesARecuperarArray.forEach(propiedad=> {
        if(objeto.hasOwnProperty(propiedad)) {
            result[propiedad] = objeto[propiedad];
        }
    });

    return result;

}

console.log('Las propiedades del objeto:');
console.log(objetoPrueba);
console.log('Han sido extraidas:');
console.log(filtrarPropiedades(objetoPrueba, ["a", "c"]));