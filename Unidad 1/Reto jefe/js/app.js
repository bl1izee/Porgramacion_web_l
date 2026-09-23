// Evento encargado del modo calro/oscuro
document.addEventListener("keydown", (data) => {
    if(data.key === "i"){
        let body = document.querySelector("body");
        body.classList.toggle("claro");
        body.classList.toggle("oscuro");
    }
});

