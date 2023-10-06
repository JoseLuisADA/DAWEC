document.querySelectorAll('.interactivo').forEach(div => {
    div.addEventListener('mouseover', cambiarColor);
    div.addEventListener('mouseout', restaurarColor);
});

function cambiarColor(event) {
    event.target.style.backgroundColor = 'blue';
    event.target.style.color = 'white';
}

function restaurarColor(event) {
    event.target.style.backgroundColor = 'lightgrey';
    event.target.style.color = 'black';
}