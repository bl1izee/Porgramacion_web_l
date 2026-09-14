/*
    - 🎯 Objetivo: tarjeta de presentación que reacciona a eventos, cambia de tema y esconde un secreto.
    - 🧰 Practicas: mouseover/mouseout/input/keydown, classList, arrays y un closure de verdad.

Fases:
    1. Holografía: mouseover añade brillo, mouseout la quita.
    2. Edición en vivo: input actualiza #nombre; vacío → «Tu nombre».
    3. El alternador (closure): crearAlternador(temas) devuelve una función que da el siguiente tema y vuelve al principio (%). El índice es privado.
    4. Conectar el botón: quitar la clase del tema actual, poner la nueva.
    5. El secreto: keydown en document, tecla h → lema «✨ Modo holograma desbloqueado».

✅ Criterios:
    - El nombre se actualiza tecla a tecla; vacío → texto por defecto.
    - Brilla al entrar el ratón y deja de brillar al salir.
    - crearAlternador usa un closure: el índice no es global.
    - Dos alternadores con arrays distintos son independientes.
    - El ciclo de temas es infinito.
    - La tecla h desbloquea el secreto.

🚀 Retos: contador de visitas holográficas, ArrowRight reutiliza el alternador, dblclick alterna el lema.
*/

const tarjeta = document.querySelector("#tarjeta_box");
const nombre_input = document.querySelector("#nombre_input");
const tema_button = document.querySelector("#tema_button");
const contador_holografico = document.querySelector("#contador_holografico");

// Agregar efecto holográfico
const contador = contador_funct();
document.addEventListener("keydown", (event) => {
    if(event.key === "h"){
        const lema = document.querySelector("#lema");

        tarjeta.classList.add("holograma")
        tarjeta.classList.add("oscuro")
        lema.textContent = "✨ Modo holograma desbloqueado";
        contador_holografico.textContent = "Contador holográfico " + contador();
    }  
});

// Closure del contador holográfico
function contador_funct(){
    let numero = 0;
    return () => numero++;
};

// Efecto holográfico
tarjeta.addEventListener("mouseover", () => {
    if(tarjeta.classList.contains("holograma")){
        tarjeta.classList.remove("oscuro");
        tarjeta.classList.add("brillo");
        contador_holografico.textContent = "Contador holográfico " + contador(); // Sumamos uno al contador de holografico
    }
});

tarjeta.addEventListener("mouseout", () => {
    if(tarjeta.classList.contains("holograma")){
        tarjeta.classList.remove("brillo");
        tarjeta.classList.add("oscuro");
    }
});

// Efecto cambiar el nombre en tiempo real
nombre_input.addEventListener("input", () => {
    const texto = document.querySelector("#nombre_tarjeta");
    let text = nombre_input.value

    if(nombre_input.value.trim() === ""){
        text = "..."
    }

    texto.textContent = text;
});

// Efecto cambiar tema
// Closure que en vez de devolver un valor, devuelve una funcion que recuerda numero_tema
function crearAlternador(temas){
    let numero_tema = 0;
    return () => {
        // Quitamos el tema actual
        tarjeta.classList.remove(temas_array[numero_tema]);

        // Pasamos al siguiente tema
        numero_tema++;

        numero_tema %= temas.length;

        return numero_tema;
    }
}

// Array con los temas que existen
const temas_array = ["tema_1", "tema_2", "tema_3"];

// Creamos la closure 1 vez para que no empieze todo el rato desde el inicio
const siguienteTema = crearAlternador(temas_array); 

// Función que cambia el tema de #tarjeta_box
tema_button.addEventListener("click", () => {
    let numero_tema = siguienteTema();

    tarjeta.classList.add(temas_array[numero_tema]);      
})