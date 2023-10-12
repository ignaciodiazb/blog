---
date: "2022-06-30"
intro: "create-react-app is a great tool but sometimes we want to know what is under the hood or add custom configuration. Either way, this is a good starting point."
readingTime: 5
title: "React application basic setup"
---

[Source code](https://github.com/icodesx/react-basic-setup)

### Intro

This toolchain comes in handy particularly when we're just getting started with React
or we just want to start a new application without thinking about configuration, build
setup, and other aspects related to development.

That's why create-react-app is so powerful. It creates an abstraction layer that allows
us to focus only on what matters, and this especially beneficial at the beginning, when
we're learning the fundamentals and a tool like this is needed to remove the barrier of
configuration, so we can start writing React code as soon as possible.

However, as time goes by and we start making progress, building our first applications, and
understanding the environment better, we may be curious as to what's really going on
under the hood, or what really happens after we execute that command that does everything
for us.

One simple way to start exploring how we can create our own configuration files is executing
the `npm run eject` command on a new React application. What this script does is exposing all
configuration files, and dependencies that are normally hidden, so you can see all the
packages used and the setup that is created when we use the create-react-app toolchain.
Please note that [`npm run eject`](https://create-react-app.dev/docs/available-scripts#npm-run-eject)
is a one-way operation, so there's no way back once you execute the command.

So, after you execute the command, the two major changes you will notice are a configuration
directory with a bunch of files, and the dependencies from the package.json file that have
increased considerably. These files and packages are needed to setup aspects like the
development and production environment, code transpiling, and even how we process assets
such as images and other files.

The objective of this article is to create our own basic configuration from scratch that allows us
to have a nice development environment, with some cool features that create-react-app
has, the ability to build the app with a JavaScript bundle, and the necessary configuration
to use css styles, css modules, and images.

#### 1. Initialize the project

First, we're going to create an empty directory. Then, we go inside that directory and execute
the following command:

`npm init -y`

This command will setup a new project with a package.json file. This file will contain some
important configuration like scripts, and keeps track of dependencies in the project.

The `-y` flag indicates that we're going to keep the default values for this file.

#### 2. Install project dependencies

Now, we're going to install the two most important packages to develop a React application: react and
react-dom. I will include a brief description for every package we install.

`npm install react react-dom`

- react: Core package that contains functionality for creating React components.

- react-dom: Package that provides functionality to work specifically with the DOM.

#### 3. Install development dependencies

Next we have to install the dependencies that will only be used during development.

First, we're going to install the babel packages, but keep in mind that all these packages
could be installed together.

`npm install @babel/core @babel/preset-env @babel/preset-react babel-loader --save-dev`

Now, we install the packages related to webpack:

`npm install webpack webpack-cli webpack-dev-server html-webpack-plugin --save-dev`

Lastly, we install the packages to process styles:

`npm install style-loader css-loader --save-dev`

- @babel/core: Core package to transpile JavaScript code.

- @babel/preset-env: Preset that allows the use of the latest features with JavaScript.

- @babel/preset-react: Package that includes plugins with support for React features and JSX.

- babel-loader: Module that allows to add custom settings for code transpiling

- webpack: Module bundler core package. It allows to bundle JavaScript files and other assets.

- webpack-cli: Command line interface that provides tools (commands) to interact with Webpack and the development environment.

- webpack-dev-server: Provides functionality to setup a development server with Webpack.

- html-webpack-plugin: Easily create an HTML file that will serve the webpack bundles.

- style-loader: Module used to use CSS in the DOM.

- css-loader: Module that complements style-loader. It adds support for importing css styles in JavaScript files for example.

#### 4. Add Webpack configuration

Now that we have the dependencies and devDependencies that we need to develop a basic application,
it's time to create the webpack.config.js file. This file will contain some important configs that
will determine the following aspects:

- How we want our different files to be processed.
- How the development server should be set up.
- How the app should be built.

The file looks like this:

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

What we're basically doing here is telling Webpack to consider `./src/index.js` as the
**entry point** for our application. This is very important because Webpack needs to know how
our app is structured in terms of dependencies, so it can load the dependencies in the right
order, as some modules need other modules in order to work correctly.

In addition, we're setting some basic configuration for the development server. We set the
port to 3000 like in a regular React application, the app to be open in a new tab, and enable
hot reloading, so every time we make a change, webpack automatically updates without making
a full reload.

Next, we add the html-webpack-plugin as a plugin, supplying the html template to be used with
the JavaScript bundles. We'll create this file later.

A performance object is needed as we'll be working with assets like images, and other files. The
unit is in bytes, so we give a very generous number. If one of our files exceeds this limit, webpack
is going to throw a warning when we build the app.

Finally, we add the code that is needed for code transpiling, styles, and images processing. We
want our JavaScript files to be loaded with the babel-loader, and we pass both the @babel/preset-env
and @babel/preset-react modules to be used. This is essential as we're coding a React application.

For the CSS files, we set the style-loader and css-loader.

And with the images, it's a bit different. Previously, a loader like file-loader or url-loader was needed,
but with since the version 5 of Webpack, we can just set the `type: asset` attribute.

#### 5. Create application entry file

As we declared in the webpack.config.js file, the entry file for our application will be located at `./src/index.js` like
in a regular React app. So, now we have to create the `src` firectory, and place the index.js file within.

index.js looks like this:

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

Note that this is the new syntax that we find starting from React 18.

In this file, we're just using the createRoot method from ReactDOM, and we pass an element from the DOM with the id 'root'. This
element comes from the HTML file we passed as template to the HTMLWebpackPlugin. We'll create it later.

An then we just tell React we want our whole application to be rendered inside this root element.

Next, we have to create the App component. This App contains all the other parts of the application.

The App.js file looks like this:

```javascript
import React from 'react';
import './App.css';
import blueberries from './assets/blueberries.jpg';\n

const App = () => {
  return (
    <div>
      <h1>React application setup</h1>
      <p className="text">
        The setup of this project allows the use of css styles,
        css modules, and images.
      </p>
      <img src={blueberries} width="100px" />
    </div>
  );
};

export default App;
```

We then create the App.css file. This file will contain some basic styles.

```css
.text {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
}
```

And finally, we create the /assets directory inside the src folder, and place an image inside it. In my case
I downloaded an image of a blueberry plant.

#### 6. Create HTML file with root element

We're almost there. Now it's time to create the HTML file that will serve our JavaScript bundles. We already set this up with the
HTMLWebpackPlugin, so we now have to create the index.html file inside the /public directory, the same way we
specified in the webpack.config.js

The index.html file looks like this:

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

This file has a very simple structure. It looks pretty much the same as the file create-react-app creates. The most
important thing in this file is the div with id root because it's the element React uses to render our entire application in.

#### 7. Define scripts

The last step is defining the scripts to start the app in development mode, and one for building the app for production. So, we
go to the package.json file, and add these two commands to the scripts object.

The `scripts` field will look like this:

```json
"scripts": {
  "start": "webpack-dev-server --mode development",
  "build": "webpack --mode production"
}
```

What this basically means is that when we execute `npm start`, a new instance of the webpack-dev-server will be created with the values
we set in the webpack.config.js.

And when we execute the `npm run build command`, Webpack will build the project with production as the target environment, applying some
defaults and performing some optimizations like minification.

### Conclusion

This has been a long but interesting process. I know there's a lot that can be improved about this basic React setup, but the idea is the
same; it is useful as an entry point to start digging into more advanced topics.

There is some much going on under the hood when we use create-react-app, and if you compare the file I created with the one created by React,
there's a huge difference, but I think it's a good start to learn how we can customize our apps, the development environment, and building process.

That's why I put emphasis on going one step at a time, because as we start learning these aspects of React, one might feel overwhelmed with things
like code transpiling, webpack plugins, production bundles, and some things that we just didn't have to worry about before, but the point is that if
we're doing this is because we want to be better developers and our own sense of curiosity brought us here.

Thanks.
