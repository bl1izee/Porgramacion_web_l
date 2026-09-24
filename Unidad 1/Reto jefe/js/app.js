const ready = document.querySelector("#ready");
const historial = document.querySelector("#historial_puntos");
const reiniciar = document.querySelector("#reiniciar");
let tiempo_actual;
let historial_puntos = [];

// Evento encargado del modo calro/oscuro
document.addEventListener("keydown", (data) => {
    if(data.key === "i"){
        let body = document.querySelector("body");
        body.classList.toggle("claro");
        body.classList.toggle("oscuro");
    }
});

// Evento encargado de reiniciar el juego
reiniciar.addEventListener("click", () => {
    // Cambiamos las propiedades del botón reiniciar
    reiniciar.classList.remove("on");
    reiniciar.classList.add("off");
    reiniciar.setAttribute("disabled", "True");

    // Cambiamos las propiedades del botón del juego
    ready.removeAttribute("disabled");
    ready.classList.remove("off");
    ready.classList.add("on");
    ready.textContent = "Ready...";
    ready.setAttribute("data-estado", "inactivo");
});


// Evento encargado de empezar el juego
ready.addEventListener("click", start);

function start(){
    const estado = ready.getAttribute("data-estado"); // Obtenemos el valor de data-estado

    if (estado === "inactivo") {
        prepararJuego();
    } else if (estado === "go") {
        detenerJuego();
    }
}

function prepararJuego(){
    const tiempo = (Math.floor(Math.random() * 6) + 1) * 1000; // Obtenemos los seg donde tendrá que parar el juego

    // Cambiamos las propiedades del botón del juego
    ready.classList.add("stady");
    ready.textContent = "WAIT...";

    // Inicia el juego al pasar los x segundos de tiempo
    setTimeout(() => {
        iniciar();
    }, tiempo);
}

function iniciar() {
    tiempo_actual = Date.now(); // Guarda los ms al empezar el juego
    
    // Cambiamos las propiedades del botón
    ready.setAttribute("data-estado", "go");
    ready.classList.remove("stady");
    ready.classList.add("parar");
    ready.textContent = "GO!";
}

function detenerJuego() {
    const tiempo_transcurrido = Date.now(); // Guarda los ms al finalizar el juego
    const puntuacion = tiempo_transcurrido - tiempo_actual;

    historial_puntos.push(puntuacion); // Añadimos la puntuación al historial

    // Cambiamos las propiedades del botón
    ready.classList.remove("parar");
    ready.setAttribute("disabled", "True");
    ready.classList.remove("on");
    ready.classList.add("off");
    ready.textContent = `Puntuación: ${puntuacion}`;

    // Habilitamos el botón reiniciar
    reiniciar.classList.remove("off");
    reiniciar.classList.add("on");
    reiniciar.removeAttribute("disabled");

    // Imprimimos el hisotrial de juego
    historial.textContent = historial_puntos;
}