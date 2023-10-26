function fusionarObjetos(obj1, obj2) {
    return { ...obj1, ...obj2 };
}


const objetoEjemplo1 = {
    nombre: "Ricardo",
    edad: 25
};

const objetoEjemplo2 = {
    edad: 23,
    ciudad: "Sevilla"
};

console.log('El objeto:');
console.log(objetoEjemplo1);
console.log('Y el objeto:');
console.log(objetoEjemplo2);
console.log('Se han fusionado:');
console.log(fusionarObjetos(objetoEjemplo1, objetoEjemplo2));