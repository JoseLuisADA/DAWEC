function cambiarColor() {
    let rojo = Math.floor(Math.random() * 256);
    let verde = Math.floor(Math.random() * 256);
    let azul = Math.floor(Math.random() * 256);

    const colorRgb = `rgb(${rojo},${verde},${azul})`;

    document.body.style.backgroundColor = colorRgb;
}