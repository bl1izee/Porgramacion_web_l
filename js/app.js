const ready = document.querySelector("#ready");
const historial = document.querySelector("#historial_puntos");
const reiniciar = document.querySelector("#reiniciar");
const body = document.querySelector("body");
let tiempo_actual;
let historial_puntos = [];

// Evento encargado del modo calro/oscuro
document.addEventListener("keydown", (data) => {
    if(data.key === "i"){
        body.classList.toggle("claro");
        body.classList.toggle("oscuro");
    }
});

// Evento encargado de reiniciar el juego
reiniciar.addEventListener("click", () => {
    // Cambiamos las propiedades del botón reiniciar
    reiniciar.classList.remove("on");
    reiniciar.classList.add("off");
    reiniciar.setAttribute("disabled", "");

    // Cambiamos las propiedades del botón del juego
    ready.removeAttribute("disabled");
    actualizarBoton(ready, "on", "Ready...");
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
    ready.setAttribute("disabled", ""); // Deshabilitamos el botón para que no se acumulen setTimeout()
    actualizarBoton(ready, "estady", "WAIT...");

    // Inicia el juego al pasar los x segundos de tiempo
    setTimeout(() => {
        iniciar();
    }, tiempo);
}

function iniciar() {
    tiempo_actual = Date.now(); // Guarda los ms al empezar el juego
    
    // Cambiamos las propiedades del botón
    ready.removeAttribute("disabled"); // Volvemos a activar el juego
    ready.setAttribute("data-estado", "go");
    actualizarBoton(ready, "parar", "GO!");
}

function detenerJuego() {
    const tiempo_transcurrido = Date.now(); // Guarda los ms al finalizar el juego
    const puntuacion = tiempo_transcurrido - tiempo_actual;

    historial_puntos.push(puntuacion); // Añadimos la puntuación al historial

    // Cambiamos las propiedades del botón
    ready.setAttribute("disabled", "");
    actualizarBoton(ready, "off", `Puntuación: ${puntuacion}`);

    // Habilitamos el botón reiniciar
    reiniciar.classList.remove("off");
    reiniciar.classList.add("on");
    reiniciar.removeAttribute("disabled");

    // Imprimimos el hisotrial de juego 
    historial.textContent = "";

    historial_puntos.forEach((puntuacion) => {
        const elemento = document.createElement("span");
        elemento.textContent = `${puntuacion}, `;
        historial.appendChild(elemento);
    });
}

function actualizarBoton(elemento, clase, texto) {
    elemento.classList.remove("on", "off", "estady", "parar");
    elemento.classList.add(clase);
    elemento.textContent = texto;
}