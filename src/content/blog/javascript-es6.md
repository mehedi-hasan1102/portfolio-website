---
title: "JavaScript ES6 Features Explained"
description: "Master modern JavaScript with ES6+ syntax and features"
author: "Mehedi Hasan"
pubDate: 2025-01-24
image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop"
tags: ["JavaScript", "ES6", "Programming"]
---

## What is ES6?

ECMAScript 6 (ES6), also known as ES2015, brought massive improvements to JavaScript. Let's explore the most important features.

## Arrow Functions

Arrow functions provide a concise syntax for function expressions:

```javascript
// Old way
const add = function(a, b) {
  return a + b;
};

// ES6 way
const add = (a, b) => a + b;
```

## Destructuring

Extract values from objects and arrays easily:

```javascript
// Object destructuring
const { name, age } = person;

// Array destructuring
const [first, second] = array;
```

## Template Literals

Create strings with embedded expressions:

```javascript
const name = 'World';
console.log(`Hello, ${name}!`);
```

## Classes

ES6 introduced a cleaner syntax for object-oriented programming:

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Hi, I'm ${this.name}`);
  }
}
```

## Promises

Handle asynchronous operations better:

```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Done!'), 1000);
});
```

## Conclusion

ES6 features make JavaScript code more readable and maintainable. Start using them today!
