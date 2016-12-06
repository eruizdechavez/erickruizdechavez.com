---
title: Introduccion a Ember
layout: post
---

En su pagina oficial, Ember se define como:

> *A framework for creating **ambitious** web applications*
> Un framework para crear aplicaciones web **ambiciosas**

Este eslogan podría darnos la impresión de que Ember esta enfocado exclusivamente a aplicaciones web grandes, pero en mi opinión casi cualquier aplicación web debería considerarse una aplicación ambiciosa, esto es, con deseos y miras al éxito.

<!--more-->

Ember consiste no solamente en un framework, sino en todo un conjunto de herramientas cuyos objetivos principales son:

1. Reducir la cantidad de código que debe ser escrita para conseguir resultados
1. Evitar la perdida de tiempo en la toma de decisiones triviales y permitir que nos enfoquemos en nuestra aplicación
1. Hecho para la productividad y diseñado para ser amigable con los programadores

## Un poco mas a detalle

Viniendo de otros frameworks (como Backbone o Angular) y llegar a Ember puede ser un poco conflictivo; tal pareciera que nos obliga a seguir convenciones estrictas y hasta difíciles de recordar o entender, hay quienes les dicen *the Ember way* (al modo Ember), pero si sedemos un poco y le damos una oportunidad nos damos cuenta que tienen una verdadero motivo; nada esta ahí simplemente porque alguien quiso.

Ember, a diferencia de los frameworks mas usados actualmente (Angular: Google, React: Facebook), no tiene una compañía detrás que imponga una dirección o intereses, por el contrario, Ember esta dirigido por la comunidad mediante un proceso bien definido de propuestas documentadas y discutidas abiertamente. Ademas, Ember se ha enfocado siempre a ser lo mas apegado posible a los estándares Web actuales.

El ciclo de actualización de Ember dura 6 semanas, en las cuales podremos encontrar diferentes versiones para diferentes usos, desde la Version Canary que es compilada diariamente, pasando por las versiones Beta y Estable y, de ser necesario, incluso una versión Long Term Support (LTS) con soporte extendido para aquellos que no pueden actualizar constantemente.

Una de las cosas que mas me ha gustado trabajar *al modo Ember* es lo que se conoce como *Convention over Configuration*, Convención antes que Configuración, esto es, si seguimos el estándar (la convención) no tenemos que configurar nada y todo funciona *automagicamente*.

Otro de mis favoritos de Ember es el CLI, una súper herramienta de linea de comando que requiere 0 configuración y con la que podemos hacer de todo lo que se necesite, desde generar un nuevo proyecto hasta compilar y liberar nuestro código a producción. No por nada todos los frameworks están empezando a seguir el mismo estilo.

## Herramientas que nos provee Ember

Entre las herramientas que nos provee Ember encontramos:

- Una extensa API con Objetos, Funciones, y Abstracciones para nuestro trabajo diario
- Una completa herramienta de linea de comando que incluye:
  - Administrador de archivos, incluyendo versionador, concatenador y minificador
  - Generadores de código, incluidos controladores, rutas, modelos, etc
  - Estructura de proyecto estandarizada para facilitar en integrarse a nuevos proyectos basados en Ember
  - Soporte para ES2015/ES6 integrado
  - Servidor local con LiveReload
  - Completo sistema de pruebas pre-configurado y listo para usarse
  - La habilidad de utilizar todo un ecosistema de de add-ons para extender nuestro proyecto y el mismo CLI
- Una completa abstracción de datos para integrarse con diferentes estilos de servicios, el cual a diferencia de la creencia popular no nos obliga a usar Ruby on Rails.
- Una extensión para Chrome y Firefox con la cual podemos inspeccionar a detalle cada una de las partes de nuestra aplicación.
- Una enorme comunidad en linea dispuesta a ayudar y solucionar nuestras dudas, sin importar si somos principiantes o expertos.

## En resumen

Ember es mas que un framework, es toda una colección de herramientas y recursos para dejar las distracciones de lado y enfocarnos en lo importante: nuestro trabajo. A primera vista puede parecer algo intimidante, pero si le damos la oportunidad, rápidamente estaremos preguntándonos _**como es que pude trabajar antes sin Ember!**_.

---

**Referencias**

- "Ember.Js: A Framework For Creating Ambitious Web Applications.". Emberjs.Com, 2016, http://emberjs.com.
- "Ember.Js - Getting Started: Quick Start". Guides.Emberjs.Com, 2016, https://guides.emberjs.com/v2.10.0/getting-started/quick-start/.
