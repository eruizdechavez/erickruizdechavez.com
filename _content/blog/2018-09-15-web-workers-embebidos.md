---
title: Web Workers Embebidos
date: 2018-09-15
tags:
  - javascript
  - showdev
  - spanish
  - tutorial
lang: es
---

Recientemente en la oficina estuve trabajando con algunos problemas de rendimiento en unos componentes con tareas pesadas para el procesador, y entre las lluvias de ideas que tuvimos para solucionar los mismos salió el tema de los Web Workers; debo de confesar que usarlos siempre me ha dado curiosidad pero a la fecha no había tenido oportunidad mas que de probarlos en un par de ocaciones y solo por experimentar.

<!--more-->

En [MDN](https://developer.mozilla.org/es/docs/Web/API/Web_Workers_API):

> Los Web Workers hacen posible ejecutar la operación de un script en un hilo en segundo plano separado de la ejecución el hilo principal de la aplicación web. La ventaja de esto es que un proceso laborioso puede actuar en un hilo separado, permitiendo al hilo principal (normlamente la UI) ejecutarse sin ser bloqueado o ralentizado.

Dado que los workers requieren un archivo independiente (o así lo muestran la mayoría de los casos) estaba preocupado de tener que reconfigurar y hacer (literalmente) malabares con nuestros archivos de Webpack y Angular pues dicho trabajo es para una aplicación en Angular 6 que **no** usa `ng-cli` mas que para generar algunos archivos :facepalm:.

Investigando y leyendo la excelente documentación de MDN me tope con [una guía de los mismos, muy completa](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) que me soluciono la vida: Como hacer un Web Worker embebido en mi código, esto es, sin tener que usar un archivo adicional :clap::tada:.

Para hacerlo necesitas:

- Un browser con soporte de Web Workers, [Blobs](https://developer.mozilla.org/en-US/docs/Web/API/Blob) y [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL).
- Un problema que requiera procesamiento intensivo.
- Un poco de tiempo para experimentar.

Sea cual sea tu framework, esta técnica se puede usar sin tener que hacer ninguna configuración extra; lo que si debes tener en cuenta que aunque no vamos a tener un archivo adicional para el worker, este mismo **no** va a tener acceso a las librerías que uses en el código, ni al scope en donde se defina la función. Estamos literalmente haciendo un archivo de Web Worker embebido en nuestro código.

Para definir nuestro Web Worker lo haremos como si lo hiciéramos en cualquier ejemplo, con la única diferencia que estará dentro de una función:

    // Un Web Worker, envuelto en una función
    function trabajador() {
        onmessage = (event) => {
            console.log(`Recibimos un mensaje del programa principal: ${event.data}`);

            // Respondemos con otro mensaje
            postMessage('¡Hola Mundo!');
        }
    }

Hasta aquí lo único nuevo es que estamos envolviendo el código del worker en una función, pero lo interesante es esto:

    // Regresa una URL a partir de una función
    function deFuncionAUrl(fn) {
        const blob = new Blob([`(${fn.toString()})()`], { type: 'application/javascript' })

        return URL.createObjectURL(blob);
    }

¿Qué esta pasando aquí? Se ve mas complejo de lo que realmente es, pero veámoslo a detalle:

- Tomamos nuestra (cualquier) función `fn` y la convertimos a texto, la cual literalmente va a contener el código de nuestra función como un string.
- Hecho esto, lo envolvemos en una IIFE, y creamos un `Blob` (básicamente un archivo) con dicho contenido.
- Finalmente usamos `URL` para generar una URL a partir de este blob.

Hecho esto, cuando llamemos `deFuncionAUrl` pasándole una función como parámetro nos va a regresar una URL con nuestro &#8220;archivo&#8221; del worker, así que ahora podemos usarla como cualquier otro Web Worker:

    const url = deFuncionAUrl(trabajador);
    const worker = new Worker(url);

    worker.onmessage = (event) => {
        // Recibimos y hacemos algo con la respuesta del worker
        console.log(`Recibimos un mensaje del worker: ${event.data}`);

        // Una vez que ya no necesitamos el worker, lo terminamos
        worker.terminate();
    };

    // Enviamos el mensaje inicial al worker para empezar el trabajo
    worker.postMessage('¡Hola Worker!');

Finalmente, poniendo todas las piezas juntas, aquí esta un ejemplo:

    <!DOCTYPE HTML>
    <html>
    <head>
    <meta charset="utf-8">
    <title>Web Worker Embebido</title>
    </head>

    <body>
      Abre la consola de JavaScript para ver los mensajes.

      <script>

        // Un Web Worker, envuelto en una función
        function trabajador() {
            onmessage = (event) => {
                console.log(`Recibimos un mensaje del programa principal: ${event.data}`);

                // Respondemos con otro mensaje
                postMessage('¡Hola Mundo!');
            }
        }

        // Regresa una URL a partir de una función
        function deFuncionAUrl(fn) {
            const blob = new Blob([`(${fn.toString()})()`], { type: 'application/javascript' })

            return URL.createObjectURL(blob);
        }

        const url = deFuncionAUrl(trabajador);
        const worker = new Worker(url);

        worker.onmessage = (event) => {
            // Recibimos y hacemos algo con la respuesta del worker
            console.log(`Recibimos un mensaje del worker: ${event.data}`);

            // Una vez que ya no necesitamos el worker, lo terminamos
            worker.terminate();
        };

        // Enviamos el mensaje inicial al worker para empezar el trabajo
        worker.postMessage('¡Hola Worker!');

      </script>
    </body>
    </html>

Espero que encuentren tan útil esta información como la encontré yo, y aunque al final terminamos no usando web workers, pude finalmente aprender un poco mas sobre estos y experimentar con un problema de la vida real.
