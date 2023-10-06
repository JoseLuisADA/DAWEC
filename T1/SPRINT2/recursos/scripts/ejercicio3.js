function anadirALista() {
    const elementoInput = document.getElementById('elementoInput');
    const lista = document.getElementById('lista');

    const nuevoElemento = document.createElement('li');
    nuevoElemento.textContent = elementoInput.value;

    lista.appendChild(nuevoElemento);

    elementoInput.value = '';
    elementoInput.focus();
}