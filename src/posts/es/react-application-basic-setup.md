---
date: "2022-06-30"
intro: "create-react-app es una herramienta muy útil, pero a veces queremos saber qué ocurre internamente o customizar la configuración por defecto. Cualquiera sea el caso, este es un buen punto de inicio."
readingTime: 5
title: "Configuración básica para aplicación con React"
---

[Source code](https://github.com/icodesx/react-basic-setup)

### Intro

Esta herramienta es particularmente útil cuando estamos empezando con React o simplemente queremos crear una nueva aplicación sin tener que preocuparnos por configuración, build, y otros aspectos relacionados al desarrollo.

Es por eso que create-react-app es tan práctico, ya que crea una capa de abstracción que nos permite enfocarnos en nuestra aplicación, y es muy beneficioso especialmente cuando estamos aprendiendo los fundamentos de React, debido a que elimina la barrera de configuración inicial. De esta manera podemos empezar a escribir código lo antes posible.

Sin embargo, a medida de que pasa el tiempo y empezamos a construir más aplicaciónes y entender mejor el ambiente, nos surge curiosidad respecto a qué ocurre realmente por detrás cuando ejecutamos ese comando que hace todo por nosotros.

Una manera simple de empezar a explorar cómo podemos hacer nuestra propia configuración es ejecutar el comando `npm run eject` en una aplicación de React (creada con cra). Lo que este comando hace es exponer todos los archivos de configuración, y dependencias que normalmente están ocultas. De esta manera podemos ver las librerías utilizadas y la configuración generada.
Es importante destacar que el comando [`npm run eject`](https://create-react-app.dev/docs/available-scripts#npm-run-eject) es irreversible.

Después de ejecutar el comando, los 2 principales cambios que podemos notar son un directorio de configuración con varios archivos, y las dependencias del archivo package.json que han aumentado considerablemente. Estos archivos y librerías son necesarias para procesar nuestro código en ambientes de desarrollo y producción, transpilación de código, e incluso cómo procesamos assets como imágenes u otros archivos.

El objetivo de este artículo es crear nuestra propia configuración básica desde cero, que nos permita tener un buen entorno de desarrollo, con algunas características interesantes que create-react-app tiene, generar una build con el código de nuestra aplicación para producción, y la configuración necesaria para usar hojas de estilos css, módulos css, e imágenes.

#### 1. Iniciar el proyecto

Primero, vamos a crear un directorio vacío para nuestro proyecto. Luego, entramos en el directorio y ejecutamos el siguiente comando:

`npm init -y`

Este comando va a crear un nuevo proyecto con el archivo package.json. Este archivo contiene información importante como scripts, y mantiene un listado de las dependencias en el proyecto.

La flag `-y` indica que vamos a mantener los valores por defecto para los campos.

#### 2. Instalar dependencias

Ahora vamos a instalar las 2 dependencias más importantes para desarrollar una aplicación con React: react y react-dom. Adjunto una breve descripción de cada dependencia que vamos a instalar.

`npm install react react-dom`

- react: Librería principal que contiene funcionalidades para definir componentes de React.

- react-dom: Librería que nos permite interactuar con el DOM con nuestros componentes de React.

#### 3. Instalar dependencias de desarrollo

Siguiente, tenemos que instalar las dependencias que serán usadas solo en el proceso de desarrollo.

Primero instalamos las librerías de babel, pero podrían ser instaladas todas las dependencias al mismo tiempo.

`npm install @babel/core @babel/preset-env @babel/preset-react babel-loader --save-dev`

Luego, instalamos dependencias de webpack:

`npm install webpack webpack-cli webpack-dev-server html-webpack-plugin --save-dev`

Por último instalamos las librerías para procesar estilos:

`npm install style-loader css-loader --save-dev`

- @babel/core: Librería principal para transpilar código de JavaScript.

- @babel/preset-env: Librería que nos permite utilizar las características más recientes de JavaScript.

- @babel/preset-react: Librería que contiene plugins para transpilar sintaxis de React a JavaScript válido.

- babel-loader: Módulo para agregar configuraciones custom.

- webpack: Librería principal que nos permite agrupar nuestro código y sus dependencias en archivos optimizados.

- webpack-cli: Herramienta de linea de comandos para interactuar con webpack.

- webpack-dev-server: Módulo que nos permite ejecutar un servidor de desarrollo.

- html-webpack-plugin: Librería para crear un archivo HTML que sirve los archivos JavaScript generados por webpack.

- style-loader: Módulo para aplicar estilos CSS de JavaScript en el DOM.

- css-loader: Módulo que complementa style-loader. Añade soporte para resolver imports de archivos CSS.

#### 4. Crear configuración de webpack

Ahora que tenemos las dependencias para desarrollar una aplicación básica, es momento de crear el archivo webpack.config.js. Este archivo va a tener configuraciones que determinarán los siguientes aspectos:

- Procesamiento de los distintos archivos dentro del proyecto.
- Configuración del servidor de desarrollo.
- Generación de la build.

El archivo se ve así:

```javascript
const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js",
  },
  devServer: {
    port: 5000,
    open: true,
    hot: true,
    liveReload: true,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  module: {
    rules: [
      {
        test: /\\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\\.(png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
};
```

Básicamente, lo que estamos haciendo es decirle a webpack que considere el directorio `./src/index.js` como el **punto de entrada** de nuestra aplicación. Esto es importante porque webpack necesita saber cómo esta estructurada nuestra app, para así cargar las dependencias en el orden correcto, debido a que algunos módulos dependen de otros módulos para funcionar adecuadamente.

Además, estamos agregando una configuración básica para el servidor de desarrollo. Establecemos el puerto 3000 como en una aplicación clasica con cra, que la app se abra en una nueva pestaña del navegador, y habilitamos hot reloading para que cada vez que hagamos un cambio, webpack actualice la aplicación sin hacer un full reload.

Luego, añadimos el html-webpack-plugin, junto con el template HTML que servirá los bundles de JavaScript. Crearemos este archivo después.

El campo de performance es necesario ya que estaremos trabajando con assets como imágenes, y otros archivos. Las unidades especificadas son bytes. Si alguno de nuestros archivos supera este limite, webpack nos va a mostrar una advertencia cuando hagamos la build de la app. Por esta razón asignaremos un número generoso.

Finalmente añadimos el código necesario para la transpilación, estilos, y procesamiento de imágenes. Queremos que nuestros archivos de JavaScript sean cargados con babel-loader, y también hacemos uso de @babel/preset-env y @babel/preset-react, esenciales para trabajar con react.

Para los archivos CSS establecemos el style-loader y css-loader.

Respecto a las imágenes, es un poco diferente. Anteriormente, un loader como file-loader o url-loader era necesario, pero desde la version 5 de Webpack, podemos simplemente usar el atributo `type: asset`.

#### 5. Crear archivo de entrada

Tal como lo declaramos en el archivo webpack.config.js, el punto de entrada en nuestra app se encuentra en `./src/index.js`, al igual que en una aplicación creada con cra. Por lo que debemos crear el directorio `src`, y ubicar el archivo index.js adentro.

index.js:

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

Importante destacar que esta es la sintaxis que nos encontramos a partir de React 18.

En este archivo estamos simplemente usando el createRoot metodo de ReactDOM, y pasamos un elemento del DOM con el id de 'root'. Este elemento se encuentra en el archivo HTML que especificamos con HTMLWebpackPlugin.

Después le decimos a React que queremos nuestra aplicación (contenida en el componente App) sea renderizada en ese elemento raíz.

Ahora podemos crear nuestro primer componente. Este componente App contiene el código de la aplicación.

App.js:

```javascript
import React from "react";
import "./App.css";
import blueberries from "./assets/blueberries.jpg";

const App = () => {
  return (
    <div>
      <h1>React application setup</h1>
      <p className="text">The setup of this project allows the use of css styles, css modules, and images.</p>
      <img src={blueberries} width="100px" />
    </div>
  );
};

export default App;
```

También creamos el archivo App.css con estilos básicos.

```css
.text {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
}
```

Finalmente creamos el directorio /assets dentro de la carpeta /src, para ubicar nuestras imágenes. En mi caso descargué una imagen de una planta de arándanos.

#### 6. Crear archivo HTML con elemento raíz

Lo único necesario para terminar es crear el template HTML que servirá los archivos JavaScript generados en el bundling. Esto ya esta configurado con HTMLWebpackPlugin, por lo que solo nos queda crear el archivo index.html dentro del directorio /public, tal como lo especificamos en el archivo webpack.config.js

index.html:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React basic setup</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

Este archivo tiene una estructura muy simple. Luce casi identico al archivo que create-react-app genera. Lo más importante en este archivo es el div con el `id="root"` ya que es el elemento que React usa para renderizar nuestra app.

#### 7. Definicion de scripts

El último paso es definir el escript para iniciar la app en modo desarrollo, y uno para hacer la build de la app para producción. En el archivo package.json agregamos estos 2 comandos al campo de scripts.

El campo `scripts` se verá así:

```json
"scripts": {
  "start": "webpack-dev-server --mode development",
  "build": "webpack --mode production"
}
```

Lo que esto significa es que cuando ejecutemos el comando `npm start`, una nueva instancia de webpack-dev-server va a ser creada con los valores definidos en el archivo webpack.config.js.

A su vez cuando ejecutamos el comando `npm run build`, webpack construirá le aplicación (build) considerando producción como el ambiente objetivo, aplicando algunas configuraciones por defecto y optimizaciones como minificación.

### Conclusión

Este ha sido un largo, pero interesante proceso. Sé que hay aspectos que se pueden mejorar respecto a esta configuración de React, pero la idea es la misma; es útil como un punto de entrada para adentrarnos en conceptos más avanzados.

Muchas cosas pasan internamente cuando usamos create-react-app, y si comparas los archivos que yo cree con los creados por React, hay una gran diferencia, pero creo que es un buen ejercicio para aprender cómo podemos customizar nuestras apps, el entorno de desarrollo, y el proceso de creación y compilacion.

Es por eso que hago énfasis en ir un paso a la vez, porque si estamos aprendiendo estos conceptos de React, uno se puede sentir abrumado con aspectos como transpilación, plugins de webpack, bundle para producción, y más cosas de las que no teníamos que preocuparnos antes, pero la idea de hacer esto es para ser un mejor desarrollador y nuestra propia curiosidad nos trajo hasta este punto.

Gracias.
