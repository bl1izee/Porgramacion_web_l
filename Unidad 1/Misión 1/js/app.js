/*
    - 🎯 Objetivo: el juego «Adivina el número» (1–100) completo en el navegador.
    - 🧰 Practicas: const/let, Number() y ===, condicionales, template literals, querySelector, textContent, evento click.

// app.js — el oráculo elige su número secreto:
const secreto = Math.floor(Math.random() * 100) + 1;
console.log("(psst... el secreto es", secreto, ")")

Fases (checkpoints):
    1. Conexión: app.js carga con defer; selecciona input, botón y párrafos.
    2. Primera consulta: click → lee el valor, Number(), muéstralo.
    3. El oráculo responde: mayor / menor / correcto; valor vacío o fuera de 1–100 → aviso sin gastar intento.
    4. El marcador: let intentos visible en pantalla.
    5. Fin de partida: al acertar, boton.disabled = true.
*/

// Carga los intentos, el numero secreto y el mensaje al cargar la página
let intentos = 0
const secreto = Math.floor(Math.random() * 100) + 1;
console.log("(psst... el secreto es", secreto, ")")

function mision(){
    // Fase 2
    const numero_text = document.querySelector("#numero").value; // Guarda el número en formato string
    const numero = Number(numero_text) // Parseamos el numero (string) a tipo Number
    console.log(`Número seleccionado ${numero}`) // Mostramos el número

    // Fase 3
    const mensaje = document.querySelector("#mensaje"); // Guardamos el <p> con id mensaje
    let text; // Guarda el estado  mayor / menor / correcto; valor vacío o fuera de 1–100
    if(numero_text === ""){
        text = "valor vacío"
    } else if(numero < 1 || numero > 100){
        text = "fuera de 1–100"
    } else if (numero > secreto){
        text = "menor"
        intentos++;
    } else if (numero < secreto){
        text = "mayor"
        intentos++;
    } else{
        text = "correcto"

        // Fase 5
        const boton = document.querySelector("#boton");
        boton.disabled = true
    }

    // Fase 3-4
    mensaje.textContent = `${text} | Número de intentos ${intentos}`; // Cambiamos el texto
    console.log(`${text}\nNúmero de intentos ${intentos}`) // Mostramos por consola el texto
        
}