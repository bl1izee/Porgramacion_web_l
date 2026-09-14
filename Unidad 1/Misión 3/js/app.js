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