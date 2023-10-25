function transponerMatriz(matriz) {
    if (matriz.length === 0 || matriz[0].length === 0) {
        return [];
    }

    let matrizTranspuesta = [];

    for (let i = 0; i < matriz[0].length; i++) {
        let row = [];
        for (let j = 0; j < matriz.length; j++) {
            row.push(matriz[j][i]);
        }
        matrizTranspuesta.push(row);
    }

    return matrizTranspuesta;
}


const matrizOriginal = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

const matrizTranspuesta = transponerMatriz(matrizOriginal);
console.log(matrizTranspuesta);