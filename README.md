# moveMe [![Build Status](https://travis-ci.org/sindresorhus/path-type.svg?branch=master)](https://travis-ci.org/hmatalonga/moveme) [![npm version](https://badge.fury.io/js/moveme.svg)](https://badge.fury.io/js/moveme)

> Move HTML DOM elements on the fly!

## Install

```
$ npm install --save moveme
```

## Usage

```js
const moveMe = require('moveme');

const someElement = document.querySelector('#someId');

// Moves to the next position relative to the parent
moveMe.toNext(someElement);

// Moves to the previous position relative to the parent
moveMe.toPrevious(someElement);

// Moves to the last position of the parent node
moveMe.toLast(someElement);

// Moves to the first position of the parent node
moveMe.toFirst(someElement);

// Moves to the third position of the parent node
moveMe.toPosition(someElement, 3);

// You can also set additional options
moveMe.toNext(someElement, {
  animate: true,
  duration: '1s',
  timeout: 800
});
```

## API

### moveMe.toNext(element, [options])

Moves the given HTML DOM element to the next position relative to its current position.

### moveMe.toPrevious(element, [options])

Moves the given HTML DOM element to the previous position relative to its current position.

### moveMe.toFirst(element, [options])

Moves the given HTML DOM element to the first position of the parent node.

### moveMe.toLast(element, [options])

Moves the given HTML DOM element to the last position of the parent node.

### moveMe.toPosition(element, position, [options])

Moves the given HTML DOM element to the given position of the parent node.

---
**Note:** When a movement is not possible, either a position is not value or the element is already at the requested position, all methods will stop with a `return` statement.

### Arguments

#### element

Type: `object`

HTML DOM element to move.

#### position

Type: `number`

Position where to move the element.

#### options

Type: `object`

##### animate

Type: `boolean`<br>
Default: `true`

If `true`, animates the movement of the element with a fade in/out effect.

##### duration

Type: `string`<br>
Default: `.2s`

Duration of the transition effect, use transition duration values. See more information [here](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration).

##### timeout

Type: `number`<br>
Default: `400`

Number of milliseconds that the element is not visible during the movement.






## License

MIT © [Hugo Matalonga](http://hmatalonga.com)
