let A = 1;
let B = "1";
let C = 3;
let verdaderoFalso;

verdaderoFalso = A == B;
console.log("1 == 1 es " + verdaderoFalso + ", en las variables, un uno está como cadena de texto y otro como número. Como este comparador solo compara el contenido sin importar el tipo de la variable, es true.");

verdaderoFalso = A === B;
console.log("1 === 1 es " + verdaderoFalso + ". En este caso, se compara tanto el contenido como el tipo de la variable, por lo tanto es falso, porque una variable está como texto y otra como número.");

verdaderoFalso = A != B;
console.log("1 != 3 es " + verdaderoFalso + ", porque 1 es diferente de 3");

verdaderoFalso = A !== C;
console.log("1 !== 3 es " + verdaderoFalso + ", Este comparador comprueba tanto si son diferentes en contenido como el tipo de la variable, en caso de que uno de los dos sea verdad, el resultado es true");

verdaderoFalso = A < C;
console.log("1 < 3 es " + verdaderoFalso + ", porque 1 es menor que 3");

verdaderoFalso = A <= C;
console.log("1 <= 3 es " + verdaderoFalso + ", porque 1 es menor que 3, y en caso de que los dos operandos fueran iguales, también sería true, porque es menor o igual que.");

verdaderoFalso = C > A;
console.log("3 > 1 es " + verdaderoFalso + ", porque 3 es mayor que 1");

verdaderoFalso = C >= A;
console.log("3 >= 1 es " + verdaderoFalso + ", porque 3 es mayor que 1, y en caso de que los dos operandos fueran iguales, también sería true, porque es mayor o igual que");
