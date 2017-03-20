---
title: Proceso de Publicación del Blog
---

Si te gustan los procesos, la interacción entre diferentes servicios o simplemente tienes curiosidad de saber como esta configurado este blog y como es mi proceso, desde la idea hasta llegar a este medio en el que lo estas leyendo, entonces este artículo es para ti.

Procuraré que este artículo no sea excesivamente largo al mismo tiempo que comparto la mayor cantidad de detalles posibles.

<!--more-->

Empecemos por la idea. Una idea puede llegar en cualquier momento, desayunando, dormido, en baño... lo importante es capturar la idea en algún lugar para que no se pierda. Si tengo mi iPhone a la mano, lo que hago es hacer una nota o directamente un issue en GitHub; así, aunque pasen días, semanas o meses, la idea ya esta registrada en un lugar donde no se perderá. Si la idea necesita mas detalles, lo ideal es agregarla a un issue en GitHub directamente y agregar la mayor cantidad de detalles que necesite. Mientras mas detalles, menos tengo que recordar la próxima vez que lo lea y decida que es tiempo de empezar a escribir.

Cuando ha llegado el tiempo de escribir, lo primero que hago es en medida de lo posible estar en un lugar cómodo, donde me pueda concentrar para escribir; las distracciones no son un gran problema siempre que pueda regresar a seguir escribiendo. Mi equipo actual para trabajar en el blog, como lo describo brevemente en ["The Road Warrior Wannabe"]({% post_url 2017-03-18-road-warrior-wannabe %}), consiste principalmente de un iPad Mini y un teclado portátil. Para escribir el el blog realmente solo requiero de un editor de texto. A veces trabajo en las notas, y otras veces lo hago directamente en Textastic.

Terminado de escribir el artículo, lo leo al menos una vez por completo, haciendo cambios según lo vea necesario, ajustando texto, cambiando palabras, etc. En cuanto me siento a gusto con el resultado, lo paso por un corrector ortográfico, para asegurarme que he quitado la mayor cantidad de faltas de ortografía. Si ya esta lista la redacción y corrección del documento, el último paso en esta etapa es asegurarme que estoy incluyendo las referencias adecuadas a todo lo que haya citado, como sitios externos, libros, revistas, etc.

Terminada la edición del articulo, la siguiente para es la publicación. Lo primero que corresponde en este caso (si es que no lo hice así desde el principio) es pasar el texto a Textastic al archivo correcto. El blog esta hecho con una herramienta llamada [Jekyll](https://jekyllrb.com) (ya hablare de ella mas adelante), la cual requiere que cada articulo este guardado en un archivo de texto con un nombre especial; hecho esto, basta con mandar el archivo a mi [repositorio de GitHub](https://github.com/{{ site.github_username }}/{{ site.github_projectname }}) (`commit + push`). Esta acción es capturada inmediatamente por un servicio llamado [CodeShip](https://codeship.com), el cual se encarga de generar los nuevos archivos necesarios y publicarlos en un sitio temporal en el que puedo revisarlos desde mi iPad, mi celular, computadora o lo que tenga a la mano. Si todo esta bien, el siguiente paso es hacer `merge` de los cambios a la rama maestra de mi repositorio y nuevamente CodeShip se encarga de todo automáticamente. Un par de minutos después todo esta listo en este sitio, el cual se encuentra en algún lugar de la nube, en un VPS de [DreamHost](https://codeship.com)

Aunque parece muy elaborado todo el proceso que involucra Textastic, GitHub, CodeShip, y DreamHost, realmente es muy sencillo y su configuración no me tomó mas de 30 minutos. Si, al usar Jekyll, podría publicarlo de forma gratuita y automática con GitHub, pero al hacerlo de esta forma, tengo toda la libertad del mundo pues esta en mi propio servidor, con mis propios plugins, y sin problemas de bases de datos.

Si llegaste hasta aquí puedo ver que realmente te interesó y te doy las gracias por tu tiempo. Como siempre, estoy atento a las dudas, y sugerencias, ya sea con en link que esta a continuación, o por cualquiera de los otros medios de contacto en los que me [encuentran]({{ site.url }}{{ site.baseurl }}{% link about.markdown %}).
