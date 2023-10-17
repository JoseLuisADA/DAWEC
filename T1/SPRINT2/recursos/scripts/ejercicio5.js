window.addEventListener("message", function(event) {
    if (event.data) {
        const xpath = generarXPathConInfo(event.data);
        alert(xpath);
        document.getElementById('mostrarXPath').innerText = `Último elemento clickeado XPath: ${xpath}`;
    }
}, false);

function generarXPathConInfo(info) {
    if (info.id) {
        return `//*[@id="${info.id}"]`;
    } else {
        return `//${info.tagName}`;
    }
}

document.addEventListener('click', function(evento) {
    evento.preventDefault();  
    const xpath = generarXPath(evento.target);
    alert(xpath);
    document.getElementById('mostrarXPath').innerText = `Último elemento clickeado XPath: ${xpath}`;
});

function generarXPath(elemento) {
    
    // Si el elemento tiene un ID, retorna la notación XPath correspondiente
    if (elemento.id !== '') {
        return `//*[@id="${elemento.id}"]`;
    }

    // Si el elemento es el cuerpo del documento, retorna su etiqueta
    if (elemento === document.body) {
        return elemento.tagName;
    }

    // Calcula la posición del elemento entre sus hermanos del mismo tipo
    let ix = 1; // XPath es base 1, no base 0
    const hermanos = elemento.parentNode.children; // Solo elementos, no nodos de texto
    for (let i = 0; i < hermanos.length; i++) {
        const hermano = hermanos[i];
        if (hermano === elemento) {
            return `${generarXPath(elemento.parentNode)}/${elemento.tagName}[${ix}]`;
        }
        if (hermano.tagName === elemento.tagName) {
            ix++;
        }
    }
}
