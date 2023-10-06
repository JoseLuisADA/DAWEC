document.addEventListener('click', function(evento) {
    evento.preventDefault();  
    const xpath = generarXPath(evento.target);
    alert(xpath);
    document.getElementById('mostrarXPath').innerText = `Último elemento clickeado XPath: ${xpath}`;
});

function generarXPath(elemento) {
    
    if (elemento.id !== '') {
        return 'id("' + elemento.id + '")';
    } 
    else if (elemento === document.body) {
        return elemento.tagName;
    }

    let ix = 0;
    const hermanos = elemento.parentNode.childNodes;
    for (let i = 0; i < hermanos.length; i++) {
        const hermano = hermanos[i];
        if (hermano === elemento) {
            return generarXPath(elemento.parentNode) + '/' + elemento.tagName + '[' + (ix + 1) + ']';
        }
        if (hermano.nodeType === 1 && hermano.tagName === elemento.tagName) {
            ix++;
        }
    }
}