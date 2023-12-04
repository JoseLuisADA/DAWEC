// Definición de la interfaz Usuario
interface Usuario {
    nombre: string;
    edad: number;
    correoElectronico: string;
}

// Función que acepta un objeto Usuario y devuelve una descripción del usuario
function describirUsuario(usuario: Usuario): string {
    return `Hola! Soy el usuario ${usuario.nombre}, tengo ${usuario.edad} años y mi correo electrónico es ${usuario.correoElectronico}`;
}

// Creación de un array de 5 usuarios
const usuarios: Usuario[] = [
    { nombre: "Juan", edad: 28, correoElectronico: "juan@example.com" },
    { nombre: "Ana", edad: 35, correoElectronico: "ana@example.com" },
    { nombre: "Carlos", edad: 20, correoElectronico: "carlos@example.com" },
    { nombre: "Luisa", edad: 24, correoElectronico: "luisa@example.com" },
    { nombre: "Gabriela", edad: 30, correoElectronico: "gabriela@example.com" }
];

// Iterar sobre el array de usuarios e imprimir la descripción de cada uno
usuarios.forEach(usuario => {
    console.log(describirUsuario(usuario));
});
