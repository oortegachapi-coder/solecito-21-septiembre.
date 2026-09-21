const boton = document.getElementById("comenzar");
const inicio = document.getElementById("inicio");
const contenido = document.getElementById("contenido");
const musica = document.getElementById("musica");

const textoLetra = document.getElementById("texto-letra");
const final = document.getElementById("final");


/* =====================================================
   SINCRONIZACIÓN
===================================================== */

const letra = [
    {
        tiempo: 4,
        texto: "Vámonos de aquí"
    },
    {
        tiempo: 8,
        texto: "Acompáñame"
    },
    {
        tiempo: 14,
        texto: "Yo te cuidaré"
    },
    {
        tiempo: 25,
        texto: "Corre y no vuelvas..."
    },
    {
        tiempo: 36,
        texto: "Corre, te sigo, vámonos a cualquier lugar"
    },
    {
        tiempo: 46,
        texto: "Vámonos de viaje..."
    },
    {
        tiempo: 59,
        texto: "No importa, vamos a estar bien"
    },
    {
        tiempo: 67,
        texto: "Vamos a dejar nuestra ciudad"
    },
    {
        tiempo: 74,
        texto: "Comprarnos ropa..."
    },
    {
        tiempo: 80,
        texto: "No importa todo lo demás"
    },
    {
        tiempo: 89,
        texto: "¡Ay wey, qué felicidad!"
    }
];


/* =====================================================
   INICIAR
===================================================== */

boton.addEventListener("click", async () => {

    inicio.classList.add("oculto");

    contenido.classList.add("visible");

    musica.volume = 0.85;

    try {

        await musica.play();

    } catch (error) {

        console.log(
            "El navegador no pudo iniciar el audio:",
            error
        );

    }

});


/* =====================================================
   LETRA
===================================================== */

musica.addEventListener("timeupdate", () => {

    const tiempo = musica.currentTime;

    let nuevoTexto = "";

    for (let i = 0; i < letra.length; i++) {

        if (tiempo >= letra[i].tiempo) {
            nuevoTexto = letra[i].texto;
        }

    }

    if (textoLetra.textContent !== nuevoTexto) {

        textoLetra.style.opacity = "0";
        textoLetra.style.transform =
            "translateY(10px)";

        setTimeout(() => {

            textoLetra.textContent = nuevoTexto;

            textoLetra.style.opacity = "1";
            textoLetra.style.transform =
                "translateY(0)";

        }, 150);

    }

});


/* =====================================================
   FINAL DE LA CANCIÓN
===================================================== */

musica.addEventListener("ended", () => {

    textoLetra.textContent = "";

    final.classList.add("mostrar");

    setTimeout(() => {

        final.scrollIntoView({
            behavior: "smooth"
        });

    }, 400);

});


/* =====================================================
   FINAL VISUAL ANTES DEL FINAL DEL AUDIO
===================================================== */

let finalPreparado = false;

musica.addEventListener("timeupdate", () => {

    if (
        musica.currentTime >= 89 &&
        !finalPreparado
    ) {

        finalPreparado = true;

        setTimeout(() => {

            final.classList.add("mostrar");

        }, 2500);

    }

});


/* =====================================================
   COMPROBACIONES
===================================================== */

musica.addEventListener("canplaythrough", () => {

    console.log(
        "✓ Música cargada correctamente"
    );

});

musica.addEventListener("error", () => {

    console.error(
        "✕ No se pudo cargar musica.mp3"
    );

});
