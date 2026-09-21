/* =====================================================
   ELEMENTOS
===================================================== */

const boton =
    document.getElementById("comenzar");

const inicio =
    document.getElementById("inicio");

const contenido =
    document.getElementById("contenido");

const musica =
    document.getElementById("musica");

const textoLetra =
    document.getElementById("texto-letra");

const final =
    document.getElementById("final");


/* =====================================================
   CONFIGURACIÓN
===================================================== */

const TIEMPO_FINAL = 89;


/*
   SINCRONIZACIÓN

   Los tiempos están en segundos.

   Puedes colocar aquí las frases que
   quieras mostrar.
*/

const letra = [

    {
        tiempo: 4,
        texto: "Vámonos de aquí"
    },

    {
        tiempo: 8,
        texto: "acompáñame"
    },

    {
        tiempo: 14,
        texto: "Yo te cuidaré"
    },

    {
        tiempo: 20,
        texto: "como en las pedas y todo lo demás"
    },

    {
        tiempo: 25,
        texto: "corre y no vuelvas si quieres te ayudo a escapar"
    },

    {
        tiempo: 36,
        texto: "corre, te sigo, vámonos a cualquier lugar"
    },

    {
        tiempo: 46,
        texto: "vámonos de viaje y no volver"
    },

    {
        tiempo: 53,
        texto: "llegar a un hotel a coger"
    },

    {
        tiempo: 59,
        texto: "no importa vamos a estar bien"
    },

    {
        tiempo: 67,
        texto: "vamos a dejar nuestra ciudad"
    },

    {
        tiempo: 74,
        texto: "comprarnos ropa de bazar"
    },

    {
        tiempo: 80,
        texto: "no importa todo lo demás"
    },

    {
        tiempo: 89,
        texto: "ay wey que felicidad"
    }

];


/* =====================================================
   VARIABLES
===================================================== */

let indiceActual = -1;

let iniciado = false;

let terminado = false;


/* =====================================================
   INICIO
===================================================== */

boton.addEventListener(
    "click",
    iniciar
);


function iniciar() {

    if (iniciado) {

        return;

    }


    iniciado = true;


    /*
       Ocultar pantalla inicial
    */

    inicio.classList.add(
        "oculto"
    );


    /*
       Mostrar escena
    */

    contenido.classList.add(
        "visible"
    );


    /*
       Reiniciar música
    */

    musica.currentTime = 0;


    /*
       Reproducir música
    */

    const reproduccion =
        musica.play();


    if (
        reproduccion !== undefined
    ) {

        reproduccion.catch(
            function(error) {

                console.log(
                    "Error de reproducción:",
                    error
                );

            }
        );

    }


    /*
       Comenzar sincronización
    */

    requestAnimationFrame(
        actualizar
    );

}


/* =====================================================
   ACTUALIZAR
===================================================== */

function actualizar() {

    if (!iniciado) {

        return;

    }


    const tiempo =
        musica.currentTime;


    /*
       Comprobar final
    */

    if (
        tiempo >=
        TIEMPO_FINAL
    ) {

        terminar();

        return;

    }


    /*
       Buscar frase actual
    */

    let nuevoIndice = -1;


    for (
        let i = 0;
        i < letra.length;
        i++
    ) {

        if (
            tiempo >=
            letra[i].tiempo
        ) {

            nuevoIndice = i;

        }

    }


    /*
       Cambiar solamente cuando
       aparece una nueva frase.
    */

    if (
        nuevoIndice !== -1 &&
        nuevoIndice !== indiceActual
    ) {

        indiceActual =
            nuevoIndice;


        mostrarTexto(
            letra[indiceActual].texto
        );

    }


    /*
       Continuar
    */

    requestAnimationFrame(
        actualizar
    );

}


/* =====================================================
   MOSTRAR TEXTO
===================================================== */

function mostrarTexto(
    texto
) {

    /*
       Ocultar
    */

    textoLetra.classList.remove(
        "mostrar"
    );


    /*
       Esperar transición
    */

    setTimeout(
        function() {

            textoLetra.textContent =
                texto;

            textoLetra.classList.add(
                "mostrar"
            );

        },
        250
    );

}


/* =====================================================
   FINAL
===================================================== */

function terminar() {

    if (terminado) {

        return;

    }


    terminado = true;


    /*
       Detener música
    */

    musica.pause();


    musica.currentTime =
        TIEMPO_FINAL;


    /*
       Desaparecer letra
    */

    textoLetra.classList.remove(
        "mostrar"
    );


    /*
       Mostrar pantalla final
    */

    setTimeout(
        function() {

            final.classList.add(
                "visible"
            );

        },
        900
    );


    /*
       Detener algunas partículas
       suavemente.
    */

    setTimeout(
        function() {

            const particulas =
                document.querySelectorAll(
                    ".luciernagas span"
                );


            particulas.forEach(
                function(particula) {

                    particula.style.animationPlayState =
                        "paused";

                }
            );

        },
        2500
    );

}


/* =====================================================
   SI EL AUDIO TERMINA
===================================================== */

musica.addEventListener(
    "ended",
    function() {

        if (!terminado) {

            terminar();

        }

    }
);
