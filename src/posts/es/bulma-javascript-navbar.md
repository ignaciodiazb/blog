---
date: "2022-04-28"
intro: "Bulma es un framework CSS que viene con muchos componentes listos para usarse. Sin embargo, algunos componentes como el navbar requieren una implementación de JavaScript para funcionar correctamente."
readingTime: 5
title: "Cómo agregar interacciones con JavaScript a un navbar de Bulma en React"
---

Si ya has añadido Bulma a tu proyecto, es importante tener en cuenta que la documentación menciona que la libreria no include JavaScript.

En este caso queremos usar el componente navbar (barra de navegación), del cual esperamos que si hacemos click en el ícono de hamburguesa en pantallas pequeñas, nos mostrará un menú, para que podamos navegar usando los ítems de la sección `navbar-menu`. Sin embargo si intentamos esto, no va a funcionar.

La interacción que queremos lograr luce así:

![El menú del navbar se expande luego de que el usuario hace click en el botón de hamburguesa](/public/images/blog/bulma-javascript-navbar/navbar-example.jpg "El menú del navbar se expande luego de que el usuario hace click en el botón de hamburguesa")

La idea es simple: lo que controla este estado en el componente es una clase llamada `is-active` que tiene que estar presente en los elementos con las clases `navbar-burger` y `navbar-menu`.

En otras palabras, si hacemos click en el botón hamburguesa tenemos que añadir la clase `is-active` a ambos elementos, y cuando hacemos click en el botón de nuevo para cerrar el menú, tenemos que remover la clase.

La documentación oficial incluye un ejemplo de implementación en vanilla JavaScript que funciona bien, pero mi idea es compartir mi propia implementación en una "React way" para poder usarlo con componentes en nuestra aplicación.

```javascript
import React, { useState } from 'react';

export default function Navbar() {

  const [navbarExpand, setNavbarExpand] = useState(false);

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
        </a>
        <a
          role="button"
          className={`navbar-burger ${navbarExpand ? "is-active" : null}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={() => setNavbarExpand(!navbarExpand)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div
        id="navbarBasicExample"
        className={`navbar-menu ${navbarExpand ? "is-active" : null}`}
      >
        <div className="navbar-start">
          <a className="navbar-item">
            Home
          </a>
          <a className="navbar-item">
            Documentation
          </a>
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">
              More
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
```

Ahora que tenemos el ejemplo, vamos a modificar el código paso a paso.

### Definir el componente

Primero, vamos a la documentación de Bulma y copiamos el [componente Navbar](https://bulma.io/documentation/components/navbar/) de la sección de componentes (removí los elementos con clases `navbar-dropdown` y `navbar-end` para hacer el ejemplo más simple). Es importante destacar que en el código de ejemplo de la documentación, tenemos que reemplazar el uso del atributo `class` con `className` porque en React trabajamos con JSX y `class` es una palabra reservada.

En este caso yo solo copié y pegué el [Navbar Básico](https://bulma.io/documentation/components/navbar/#basic-navbar).

### Crear una variable de estado para efecto toggle

Con la ayuda de un hook de estado, vamos a crear una variable responsable de mantener el estado del menú. Por defecto va a tener el valor de falso, y cuando hagamos click en el botón, va a cambiar al valor opuesto.

De esta manera creamos un efecto toggle.

Antes mencioné la clase `is-active` y que 2 componentes se basan en esta clase para funcionar correctamente. Así que tomamos los elementos con las clases `navbar-burger` and `navbar-menu` y les cambiamos la propiedad `className` con un objeto que contiene un object literal. Dentro incluimos las clases que el elemento tenía por defecto, y añadimos un condicional de JavaScript. Este condicional evalua la variable de estado que definimos; si evalua a `true` se agrega la clase `is-active`, si es `false` no agregamos nada.

### Agregar el evento

Ya que tenemos la lógica en su lugar, solo nos falta agregar el evento que da lugar a este comportamiento.

En este caso tenemos que encontra el botón hamburguesa y agregar una función en la propiedad `onClick` para cambiar el valor de la variable que controla el efecto toggle.

Y eso es todo. Ahora si vemos la aplicación en un tamaño de pantalla pequeño, y hacemos click en el botón, se despliega el menú con ítems que están ocultos en dispositivos móviles (en Bulma esto esta configurado hasta pantallas de 1024px por defecto) y también podemos hacer click en la "x" para cerrar el menú.

Gracias.
