function longestString(stringsArray) {
    if (stringsArray.length === 0) {
        return { string: '', length: 0 };
    }

    let longest = stringsArray[0];

    for (let i = 1; i < stringsArray.length; i++) {
        if (stringsArray[i].length > longest.length) {
            longest = stringsArray[i];
        }
    }

    return { string: longest, length: longest.length };
}

// Ejemplo de uso:
const cadenas = ["manzana", "fresa", "sandía", "melocotón"];
const resultado = longestString(cadenas);

console.log('La palabra más larga de esta lista :'); 
console.log(cadenas); 
console.log('Es la palabra :'); 
console.log(resultado); 