---
date: "2022-01-31"
intro: "Hosting is one of those concepts that are very important to master in order to understand how functions and variables work, and to approach programming in a way that resembles how engines look at our code."
readingTime: 5
title: "Understanding variable hoisting in JavaScript"
---

### What is hoisting?

Hoisting can be described as a **behavior** (not a language feature) that takes place during the **creation phase**, before execution. What basically happens is that variable, function, and class declarations are "moved" to the top of the scope, allowing us to use them before they have been declared.

### var

```javascript
function varExample() {
  fruit = "Apple";
  console.log(fruit);
  var fruit;
}
varExample();
```

When we call this function, it prints `Apple` to the console as the result of a scanning the engine performs before executing the code, where it is looking for all variable declarations to allocate the corresponding memory to start working on the next phase . So, by the time the engine gets to the initialization at runtime, the value of `Apple` will be assigned to the variable, whose declaration has been "moved" to the top of the function.

![Variable declaration and initialization in JavaScript](/images/blog/javascript-variable-hoisting/declaration_and_initialization.png "Variable declaration and initialization in JavaScript")

It's important to note that in JavaScript only **variable declarations** are hoisted. If we tried to access the value of the `fruit` variable before it's initialized, it have would printed `undefined`, which is the default value `var` variables get assigned when hoisted in the creation phase.

Example:

```javascript
function varExample() {
  console.log(fruit); // undefined
  var fruit = "Watermelon";
}
varExample();
```

### let and const

However, with `let` and `const` the situation is different. They are hoisted too but in a different way.

When the engine finds a variable declared with `let` or `const`, it assigns it a value of uninitialized, instead of undefined. This basically means that we cannot access the variable until it's been declared in our code (and initialized in the case of `const`). So, for example this example would throw an error.

Example:

```javascript
function letAndConstExample() {
  console.log(fruit); // Uncaught ReferenceError: Cannot access 'food' before initialization
  let fruit = "Pineapple";
}
letAndConstExample();
```

In the case of const, we have to declare and initialize the variable at the same time, otherwise, we'll get an error.

### Temporal Dead Zone (TDZ)

The temporal dead zone can be described as a **temporal** state in which variables defined with `let` fall into when the lexical environment in which they are, starts executing, and it lasts until the variable gets assigned a value.

In other words, you cannot use the variable during the execution of the code from the start of the scope the variable is within, until it's been initialized. That's why this is considered a temporal state, it's not about a specific section at the top of the scope or anything related to space. It's a time span in which we cannot access the variable.

Example:

```javascript
function tdzExample() {
  console.log("first line"); // TDZ starts
  console.log("second line");
  let text = "Hello, World!"; // TDZ finishes
  console.log(text);
}
tdzExample();
```

Put in simple words, in the case of variables declared with `let`, they become available for use when the engine comes accross with the variable declaration in the execution process, and that's why if you run the following example, you won't get an error but when we try to access the color variable, we get `undefined`.

Example:

```javascript
function letGoesUndefined() {
  let color;
  console.log(green); // undefined
  color: "blue";
}
letGoesUndefined();
```

### Main Takeaways

I think that probably the most important thing we can learn from studying hoisting in variables is to always declare our variables at the top of the scope we are working on, so we are clear about the variables we need for later use in our program, and avoid bugs given that `let` and `const` are also block scoped variables, that helps get rid of ambiguity when you're coding and dealing with different variables and different scopes.

Thanks for reading.
