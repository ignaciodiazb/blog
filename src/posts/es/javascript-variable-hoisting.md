---
date: "2022-01-31"
intro: "Hoisting es uno de esos conceptos los cuales son importantes para entender cómo funcionan las funciones y variables, y enfocar nuestro trabajo en una manera que toma en cuenta cómo los motores interpretan nuestro código."
readingTime: 5
title: "Entendiendo hoisting en variables en JavaScript"
---

### Qué es hoisting?

Hoisting puede ser descrito como un **comportamiento** (no una característica del lenguage) que toma lugar durante la **fase de creación**, antes de la ejecución. Lo que pasa basicamente es que las declaraciones de variables, funciones y clases son "movidas" hasta el comienzo del scope (contexto), permitiéndonos usarlas antes de haber sido definidas.

### var

```javascript
function varExample() {
  fruit = "Apple";
  console.log(fruit);
  var fruit;
}
varExample();
```

Cuando llamamos esta función, imprime `Apple` en la consola, como resultado de un escaneo que realiza el motor antes de ejecutar el código, en el cual busca todas las declaraciones de variables para asignar la memoria correspondiente, y así comenzar a trabajar en la siguiente fase. Así que, en el momento en el que el motor llega a la declaración en tiempo de ejecución, el valor de `Apple` es asignado a la variable, cuya declaración ha sido "movida" al principio de la función.

![Declaración e inicialización de una variable en JavaScript](/public/images/blog/javascript-variable-hoisting/declaration_and_initialization.png "Declaración e inicialización de una variable en JavaScript")

Es importante destacar que en JavaScript solo **declaraciones de variables** son "movidas". Si intentamos acceder al valor de la variable `fruit` antes de su inicialización, nos dará como resultado `undefined`, que es el valor por defecto que reciben variables declaradas con `var` cuando son "movidas" en la fase de creación.

Ejemplo:

```javascript
function varExample() {
  console.log(fruit); // undefined
  var fruit = "Watermelon";
}
varExample();
```

### let y const

Sin embargo, la situación es diferente con `let` y `const`. Tambien son afectadas, pero en una manera diferente.

Cuando el motor encuentra una variable declarada con `let` o `const`, le asigna un valor de no inicializada, a diferencia de `undefined`. Esto significa que no podemos acceder a la variable hasta que haya sido declarada en el código (e inicializada en el caso `const`). Este ejemplo nos daría un error.

Ejemplo:

```javascript
function letAndConstExample() {
  console.log(fruit); // Uncaught ReferenceError: Cannot access 'food' before initialization
  let fruit = "Pineapple";
}
letAndConstExample();
```

En el caso de const, tenemos que declarar e inicializar la variable al mismo tiempo, si no, obtendremos un error.

### Temporal Dead Zone (TDZ)

Temporal dead zone puede ser descrita como un estado **temporal** en el cual las variables definidas con `let` se encuentran cuando el entorno léxico en el cual estan definidas empieza a ejecutarse, y dura hasta que la variable se le asigna un valor.

En otras palabras, no podemos usar la variable durante la ejecución del código desde el comienzo del contexto donde la variable se encuentra definida hasta que ha sido inicializada. Es por esto que se considera un estado temporal, ya que no se trata de una seccion especifica al comienzo del contexto o respecto al espacio. Es un período en el cual no podemos acceder a la variable.

Ejemplo:

```javascript
function tdzExample() {
  console.log("first line"); // TDZ starts
  console.log("second line");
  let text = "Hello, World!"; // TDZ finishes
  console.log(text);
}
tdzExample();
```

En simples palabras, en el caso de variables declaradas con `let`, se encuentran disponibles para su uso cuando el motor de ejecución se encuentra con la declaración de la variable en la tiempo de ejecución, es por eso que si ejecutamos el siguiente ejemplo, no obtendremos un error cuando intentamos acceder a la variable `color`, pero nos da `undefined`.

Ejemplo:

```javascript
function letGoesUndefined() {
  let color;
  console.log(green); // undefined
  color: "blue";
}
letGoesUndefined();
```

### Ideas principales

Pienso que lo mas relevante que podemos aprender de estudiar hoisting en variables es siempre declarar nuestras variables al principio del contexto en el que estamos trabajando, de esa manera tenemos una mayor claridad respecto a las variables con las que estamos trabajando, y evitamos bugs, dado que `let` y `const` son variables de bloque, lo que nos permite evitar ambiguedad cuando estamos trabajando con distintas variables en distintos contextos.

Gracias.
