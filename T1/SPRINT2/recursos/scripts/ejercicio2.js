function calcularArea() {
    
    const ancho = document.getElementById('ancho').value;
    const alto = document.getElementById('alto').value;

    const area = ancho * alto;

    document.getElementById('resultado').innerText = `El área del rectángulo es: ${area}`;
}