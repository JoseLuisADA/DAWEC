type Tarea = {
    id: number;
    titulo: string;
    completada: boolean;
    importante: boolean;
};

let tareas: Tarea[] = [];

function agregarTarea(titulo: string): void {
    const nuevaTarea: Tarea = {
        id: tareas.length + 1,
        titulo,
        completada: false,
        importante: false
    };
    tareas.push(nuevaTarea);
    renderizarTareas();
}

function marcarComoCompletada(id: number): void {
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        tarea.completada = !tarea.completada;
    }
    renderizarTareas();
}

function eliminarTarea(id: number): void {
    tareas = tareas.filter(t => t.id !== id);
    renderizarTareas();
}

function marcarComoImportante(id: number): void {
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        tarea.importante = true;
    }
    renderizarTareas();
    document.querySelector(`li[data-id="${id}"]`);
}

function desmarcarComoImportante(id: number): void {
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        tarea.importante = false;
    }
    renderizarTareas();
}

function crearElementoTarea(tarea: Tarea): HTMLElement {
    const elementoTarea = document.createElement('li');
    elementoTarea.textContent = `${tarea.titulo} - ${tarea.completada ? 'Completada' : 'Pendiente'}`;
    
    // Botón de completar tarea
    const btnCompletar = document.createElement('button');
    btnCompletar.textContent = 'Poner Completada / Pendiente';
    btnCompletar.onclick = () => marcarComoCompletada(tarea.id);
    elementoTarea.appendChild(btnCompletar);
    
    // Botón de importante
    const btnImportante = document.createElement('button');
    btnImportante.textContent = 'Poner Importante / No importante';
    btnImportante.onclick = () => {
        tarea.importante ? desmarcarComoImportante(tarea.id) : marcarComoImportante(tarea.id);
    };
    elementoTarea.appendChild(btnImportante);

    // Botón de eliminar tarea
    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.onclick = () => eliminarTarea(tarea.id);
    elementoTarea.appendChild(btnEliminar);

    elementoTarea.setAttribute('data-id', tarea.id.toString());
   
    btnCompletar.className = 'btn-completar';
    btnImportante.className = 'btn-importante';
    btnEliminar.className = 'btn-eliminar';

    return elementoTarea;
}

function renderizarTareas(): void {
    const listaTareas = document.getElementById('listaTareas');
    const listaTareasImportantes = document.getElementById('listaTareasImportantes');

    listaTareas.innerHTML = '';
    listaTareasImportantes.innerHTML = '';

    tareas.forEach(tarea => {
        const elementoTarea = crearElementoTarea(tarea);
        listaTareas.appendChild(elementoTarea);

        if (tarea.importante) {
            // Clonar el elemento de la tarea para la lista de tareas importantes
            const elementoTareaImportante = crearElementoTarea(tarea);
            listaTareasImportantes.appendChild(elementoTareaImportante);
        }
    });
}