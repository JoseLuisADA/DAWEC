"use strict";
// Función que acepta un objeto Usuario y devuelve una descripción del usuario
function describirUsuario(usuario) {
    return "Hola! Soy el usuario ".concat(usuario.nombre, ", tengo ").concat(usuario.edad, " a\u00F1os y mi correo electr\u00F3nico es ").concat(usuario.correoElectronico);
}
// Creación de un array de 5 usuarios
var usuarios = [
    { nombre: "Juan", edad: 28, correoElectronico: "juan@example.com" },
    { nombre: "Ana", edad: 35, correoElectronico: "ana@example.com" },
    { nombre: "Carlos", edad: 20, correoElectronico: "carlos@example.com" },
    { nombre: "Luisa", edad: 24, correoElectronico: "luisa@example.com" },
    { nombre: "Gabriela", edad: 30, correoElectronico: "gabriela@example.com" }
];
// Iterar sobre el array de usuarios e imprimir la descripción de cada uno
usuarios.forEach(function (usuario) {
    console.log(describirUsuario(usuario));
});
