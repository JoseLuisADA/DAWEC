

# 🔎 Análisis del problema

Hay que entregar una tarea que ha mandado el profesor a través de la plataforma classroom.

Estos ejercicios son para aprender JavaScript.

La tarea consta de los siguientes ejercicios :



```
Diferencias entre Java Script y TypeScript



```

``` 
Configurar el entorno para que en el directorio raiz del SPRINT 5 se transpilen los archivos typescript a javascript automaticamente
```
Para configurar el entorno de la manera indicada hay que seguir los siguientes pasos :

1. Buscar en la barra de busqueda del sistema, ```Windows Powershell```, una vez encontrado, hay que ejecutarlo como administrador e introducir en él, el comando ```Set-ExecutionPolicy RemoteSigned```. Después, introducir la vocal O, para dar un "Si a todo" y ya podremos cerrar el PowerShell.

2. Abrir el directorio SPRINT5 con Visual Studio.

3. Abrir la terminal en Visual Studio, y una vez abierta, tiene que aparecer la ruta de la raiz del proyecto SPRINT5. A continuación, introduciremos en esta terminal una serie de comandos que se indicarán en los siguientes pasos.

4. Iniciar un proyecto npm con valores de configuración por defecto introduciendo este comando ```npm init --y```

5. Instalar typescript solo para este proyecto introduciendo este comando ```npm install -D typescript```

6. Crear dos scripts en el archivo package.json para hacer uso del módulo tsc. Ejemplo del archivo package.json :

```
{
  "name": "sprint5",
  "version": "1.0.0",
  "description": "Descripción del proyecto",
  "main": "index.js",
  "devDependencies": {
    "typescript": "^5.3.3"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "tsc": "tsc --init",
    "tscw" : "tsc -w"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```



5. Crear un archivo esencial para configurar las opciones de compilación de TypeScript introduciendo este comando ```tsc --init```

```
EJERCICIO
```

```
EJERCICIO
``` 

```
EJERCICIO
``` 

Formato de entrega

Todos estos ejercicios se deberán entregar en el formato establecido en clase o tablón de classroom, respetando las horas de entrega de cada uno de ellos indicados en la tarea de classroom.

¿Qué y cómo se entrega?

Hay que realizar cada apartado de ejercicios en HTML diferentes y subirlo al repositorio a la carpeta SPRINT 4.

Hay que realizar un vídeo en formato .gif para cada ejercicio en el que se interactúe de manera dinámica con la web y adjuntarlo en el README.md del repositorio GIT en la carpeta del sprint correspondiente.

Hay que realizar una captura de pantalla de aquellos ejercicios que sean estáticos y adjuntarlos en el README.md del repositorio GIT en la carpeta del sprint correspondiente.

# 📝 Diseño de la solución

### Configuración del entorno :

1. Instalar Visual Studio
2. Abrir una terminal y ejecutar los siguientes comandos y en el mismo orden, esperando a que se termine de ejecutar uno antes de poner el siguiente

### Ejercicios del 1 al 5 :

Para entregar la tarea correctamente habrá que seguir el formato de entrega indicado en la misma y leer cada apartado para saber lo que se pide. Una vez comprendidos los ejercicios, con ayuda de ChatGPT y mia, resolverlos.

# 💉  Implementación de la solución.

## Ejercicio 1: 

[**Archivo HTML** ](ejercicio1/ejercicio1.html)

[**Archivo JS** ](ejercicio1/ejercicio1.js)

## Ejercicio 2: 

[**Archivo HTML** ](ejercicio2/ejercicio2.html)

[**Archivo JS** ](ejercicio2/ejercicio2.js)

##  Ejercicio 3 : 

[**Archivo HTML** ](ejercicio3/ejercicio3.html)

[**Archivo JS** ](ejercicio3/ejercicio3.js)

## Ejercicio 4 : 

[**Archivo HTML** ](ejercicio4y5/ejercicio4.html)

[**Archivo JS** ](ejercicio4y5/ejercicio4.js)


# 📸 Pruebas

## Ejercicio 1 : 

![Foto 1 Test ejercicio 1](recursos/imagenes/ejercicio1/test1Ejercicio1.png)

![Foto ejercicio 1](recursos/gifs/ejercicio1/gifTest1Ejercicio1.gif)

![Foto 2 ejercicio 1](recursos/imagenes/ejercicio1/test2Ejercicio1.png)

![Foto 2 Test ejercicio 1](recursos/gifs/ejercicio1/gifTest3Ejercicio1.gif)


## Ejercicio 2 : 

![Foto 1 Test ejercicio 2](recursos/imagenes/ejercicio2/test1Ejercicio2.png)

![Foto 1 ejercicio 2](recursos/gifs/ejercicio2/gifTest1Ejercicio2.gif)

![Foto 2 Test ejercicio 2](recursos/imagenes/ejercicio2/test2Ejercicio2.png)

![Foto 2 ejercicio 2](recursos/gifs/ejercicio2/gifTest2Ejercicio2.gif)

##  Ejercicio 3 :

![Foto 1 Test ejercicio 3](recursos/imagenes/ejercicio3/test1Ejercicio3.png)

![Foto 1 ejercicio 3](recursos/gifs/ejercicio3/gifTest1Ejercicio3.gif)

![Foto 2 Test ejercicio 3](recursos/imagenes/ejercicio3/test2Ejercicio3.png)

![Foto 2 ejercicio 2](recursos/gifs/ejercicio3/gifTest2Ejercicio3.gif)

## Ejercicio 4 y 5 : 

![Foto 1 Test ejercicio 4](recursos/imagenes/ejercicio4/test1Ejercicio4.png)

![Foto 1 ejercicio 4](recursos/gifs/ejercicio4y5/gifTest1Ejercicio4.gif)

![Foto 2 Test ejercicio 4](recursos/imagenes/ejercicio4/test2Ejercicio4.png)

![Foto 2 ejercicio 4](recursos/gifs/ejercicio4y5/gifTest2Ejercicio4.gif)

![Foto 1 Test ejercicio 5](recursos/imagenes/ejercicio5/test1Ejercicio5.png)

![Foto 1 ejercicio 5](recursos/gifs/ejercicio4y5/gifTest1Ejercicio5.gif)

![Foto 2 Test ejercicio 5](recursos/imagenes/ejercicio5/test2Ejercicio5.png)

![Foto 2 ejercicio 5](recursos/gifs/ejercicio4y5/gifTest2Ejercicio5.gif)

![Foto 3 Test ejercicio 5](recursos/imagenes/ejercicio5/test3Ejercicio5.png)

![Foto 3 ejercicio 5](recursos/gifs/ejercicio4y5/gifTest3Ejercicio5.gif)
