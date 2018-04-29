# moveMe

[![Build Status](https://travis-ci.org/sindresorhus/path-type.svg?branch=master)](https://travis-ci.org/hmatalonga/moveme) [![npm version](https://badge.fury.io/js/moveme.svg)](https://badge.fury.io/js/moveme)

> Move HTML DOM elements on the fly!

## Install

```bash
$ npm install --save moveme # or yarn add -D moveme
```

## Usage

```js
import * as moveMe from 'moveme';

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
  duration: '.6s',
  timingFunction: 'linear',
  delay: '1s'
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

##### animation

Type: `string`<br>
Values: `fadeInOut` `none`<br>
Default: `fadeInOut`

Animation name for the element's effect movement. It makes use of CSS transitions.

##### duration

Type: `string`<br>
Default: `.4s`

Duration of the transition effect. See [transition duration docs](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration).

##### timingFunction

Type: `string`<br>
Default: `ease-in-out`

Timing function name of the transition effect. See [transition timing function docs](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function).

##### delay

Type: `string`<br>
Default: `0s`

Delay of the transition effect. See [transition delay docs](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay).

## License

MIT © [Hugo Matalonga](http://hmatalonga.com)
