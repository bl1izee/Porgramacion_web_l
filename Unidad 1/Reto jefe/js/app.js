/*
Un whack-a-mole en vanilla JS: los bugs aparecen y desaparecen en una cuadrícula de 3 × 3 y hay que aplastarlos antes de que acabe el tiempo.

Requisitos mínimos:
    - Cuadrícula de 9 casillas (nueve <button>) y marcador con puntos y tiempo.
    - «Jugar»: cada cierto intervalo un 🐛 aparece en una casilla aleatoria y desaparece. setTimeout encadenado.
    - Clic en bug: +1 y desaparece. Clic en vacía: −1 (mínimo 0).
    - La partida dura 30 s; al terminar, mensaje según puntuación y ningún bug más aparece.
    - Funciones con nombre claro (aparecerBug, finDePartida, actualizarMarcador…), cero var, cero errores en consola.

🚀 Retos: dificultad creciente cada 10 s · bug dorado ✨ (5 puntos) · récord de la sesión
*/

const jugar_button = document.querySelector("#jugar");
const tiempo_funct = contador_closure(); // Contador de tiempo

jugar_button.addEventListener("click", () => {
    empezar();
});

function empezar(){
    let tiempo_var = 30;

    while(tiempo_var > 0){
        tiempo_var = tiempo(); // Cambia el tiempo cada vez que pasa 1 seg
        console.log("test 1");
    }
    console.log("test 2");
}

// Contador del tiempo de la partida
function tiempo(){
    const tiempo_element = document.querySelector("#tiempo");
    let tiempo = tiempo_funct(); // Gurda el nuevo tiempo

    setTimeout(() => {
        tiempo_element.textContent = tiempo;
        return tiempo;
    }, 1000);
    
}

function contador_closure(){
    let tiempo = 30;
    return () => --tiempo;
}