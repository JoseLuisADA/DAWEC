"use strict";
var tareas = [];
function agregarTarea(titulo) {
    var nuevaTarea = {
        id: tareas.length + 1,
        titulo: titulo,
        completada: false,
        importante: false
    };
    tareas.push(nuevaTarea);
    renderizarTareas();
}
function marcarComoCompletada(id) {
    var tarea = tareas.find(function (t) { return t.id === id; });
    if (tarea) {
        tarea.completada = !tarea.completada;
    }
    renderizarTareas();
}
function eliminarTarea(id) {
    tareas = tareas.filter(function (t) { return t.id !== id; });
    renderizarTareas();
}
function marcarComoImportante(id) {
    var tarea = tareas.find(function (t) { return t.id === id; });
    if (tarea) {
        tarea.importante = true;
    }
    renderizarTareas();
    // Actualizar clase para estilo completado
    var tareaElement = document.querySelector("li[data-id=\"".concat(id, "\"]"));
    if (tareaElement) {
        tareaElement.classList.toggle('tarea-completada');
    }
}
function desmarcarComoImportante(id) {
    var tarea = tareas.find(function (t) { return t.id === id; });
    if (tarea) {
        tarea.importante = false;
    }
    renderizarTareas();
}
function crearElementoTarea(tarea) {
    var elementoTarea = document.createElement('li');
    elementoTarea.textContent = "".concat(tarea.titulo, " - ").concat(tarea.completada ? 'Completada' : 'Pendiente');
    // Botón de completar tarea
    var btnCompletar = document.createElement('button');
    btnCompletar.textContent = 'Completar';
    btnCompletar.onclick = function () { return marcarComoCompletada(tarea.id); };
    elementoTarea.appendChild(btnCompletar);
    // Botón de importante
    var btnImportante = document.createElement('button');
    btnImportante.textContent = tarea.importante ? 'No es importante' : 'Importante';
    btnImportante.onclick = function () {
        tarea.importante ? desmarcarComoImportante(tarea.id) : marcarComoImportante(tarea.id);
    };
    elementoTarea.appendChild(btnImportante);
    // Botón de eliminar tarea
    var btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.onclick = function () { return eliminarTarea(tarea.id); };
    elementoTarea.appendChild(btnEliminar);
    elementoTarea.setAttribute('data-id', tarea.id.toString());
    btnCompletar.className = 'btn-completar';
    btnImportante.className = 'btn-importante';
    btnEliminar.className = 'btn-eliminar';
    return elementoTarea;
}
function renderizarTareas() {
    var listaTareas = document.getElementById('listaTareas');
    var listaTareasImportantes = document.getElementById('listaTareasImportantes');
    listaTareas.innerHTML = '';
    listaTareasImportantes.innerHTML = '';
    tareas.forEach(function (tarea) {
        var elementoTarea = crearElementoTarea(tarea);
        listaTareas.appendChild(elementoTarea);
        if (tarea.importante) {
            // Clonar el elemento de la tarea para la lista de tareas importantes
            var elementoTareaImportante = crearElementoTarea(tarea);
            listaTareasImportantes.appendChild(elementoTareaImportante);
        }
    });
}
