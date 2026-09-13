/*
- 🎯 Objetivo: generador de contraseñas con longitud y materiales configurables (letras, cifras, símbolos).
- 🧰 Practicas: funciones con parámetros, bucles, strings e indexación, booleanos, checkboxes, classList.

Fases:
    1. La receta: forjarClave(longitud, usarNumeros, usarSimbolos) → string. Función pura: no toca el DOM.
    2. El alfabeto: letras + "0123456789" + "!@#$%&*?" según los booleanos.
    3. El martillo aleatorio: Math.floor(Math.random() * alfabeto.length).
    4. La entrega: botón → Number(), .checked, mostrar en #clave.
    5. Control de calidad: longitud fuera de 4–32 → aviso.

✅ Criterios:
    - forjarClave es pura y devuelve siempre un string.
    - La clave tiene exactamente la longitud pedida.
    - Sin casillas marcadas, solo letras.
    - Cada pulsación genera una clave distinta.
    - Longitud fuera de rango: aviso y sin clave.

🚀 Retos: medidor de temple (débil/aceptable/legendaria con classList), garantizar un carácter de cada grupo, historial de 3 claves.
*/

const boton = document.querySelector("#generar");
const numeros = document.querySelector("#numeros");
const simbolos = document.querySelector("#simbolos");
const longitud = document.querySelector("#longitud");
const clave = document.querySelector("#clave");

const letras_lista = "abcdefghijklmnñopqrstuvwxyz";
const numeros_lista = "0123456789";
const simbolos_lista = "!@#$%&*?";

const error_length = "Longitud no válida 4-32";

// Historial de contraseñas
const historial=[];

// Fase 4: creamos el lisener para que ejecute forjarClave al hacer click en el boton generar
boton.addEventListener("click", () => {
    clave.textContent = forjarClave(longitud.value, numeros.checked, simbolos.checked); 
});

// Fase 1: función principal
function forjarClave(longitud, usarNumeros, usarSimbolos){
    let alfabeto = letras_lista;
    let contraseña = "";

    longitud = Number(longitud);

    // Fase 5: comprueba que la longitud sea entre 4-32
    if(longitud < 4 || longitud > 32)
        return error_length;

    // Fase 2: Añadimos los carácteres que queira el user a la lista de caracteres a usar en la contraseña
    if(usarNumeros)
        alfabeto += numeros_lista;

    if(usarSimbolos)
        alfabeto += simbolos_lista;

    // Reto 1-2 y Fase 3
    contraseña = reto(contraseña, usarNumeros, usarSimbolos, alfabeto, longitud);

    // Reto 3: Añade la contraseña al historial
    if(historial.length < 3)
        historial.unshift(contraseña);
    else{
        historial.pop();
        historial.unshift(contraseña); // Añade al inicio del array la contraseña
    }
    console.log(historial);

    return contraseña;
};

// Genera la contraseña usando el alfabeto (caracteres que puede tener la contraseña)
function crear_contraseña(alfabeto, longitud){
    let contraseña = "";

    for(let pos=0; pos < longitud; pos++)
        contraseña += alfabeto[Math.floor(Math.random() * alfabeto.length)];

    return contraseña;
}

// Reto 2
// Comprueba que la cntraseña tenga mínimo un caracter de la lista (simbolos/numeros)
function garantiza_caracter(contraseña, lista){
    let length_lista = lista.length
    let length_contraseña = contraseña.length
    for(let pos_lista=0; pos_lista < length_lista; pos_lista++){
        for(let pos_contraseña=0; pos_contraseña < length_contraseña; pos_contraseña++){
            if(contraseña[pos_contraseña] === lista[pos_lista])
                    return true;
        }
    }

    return false;
}

// Reto 1: añade la clase necesaria en funcion de los parámetros del user
// Reto 2: asegura que haya mínimo 1 carácter del pedido por el usuario
// Fase 3: genera la contraseña
function reto(contraseña, usarNumeros, usarSimbolos, alfabeto, longitud){
    // Fase 3
    contraseña = crear_contraseña(alfabeto, longitud);

    // Reto 1
    // Borramos las clases que tenga clave
    if(clave.classList.contains("débil"))
        clave.classList.remove("débil");

    if(clave.classList.contains("aceptable"))
        clave.classList.remove("aceptable");

    if(clave.classList.contains("legendaria"))
        clave.classList.remove("legendaria");

    // Añadimos la clase en función de los checkbox
    if(usarNumeros + usarSimbolos === 2)
        clave.classList.add("legendaria");
    else if(usarNumeros + usarSimbolos === 1)
        clave.classList.add("aceptable");
    else
        clave.classList.add("débil");

    // Reto 2
    // Comprobamos que tenga por lo menos 1 caracter, en caso contrario llamamos de nuevo a la funcion recursivamente
    if (usarNumeros && !garantiza_caracter(contraseña, numeros_lista))
        contraseña = reto(crear_contraseña(alfabeto, longitud), usarNumeros, usarSimbolos, alfabeto, longitud);

    if (usarSimbolos && !garantiza_caracter(contraseña, simbolos_lista))
        contraseña = reto(crear_contraseña(alfabeto, longitud), usarNumeros, usarSimbolos, alfabeto, longitud);

    return contraseña
}