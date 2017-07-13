/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index__);


// Buttons to trigger action
const btnBack = document.querySelector('#move-back')
const btnNext = document.querySelector('#move-next')
const btnFirst = document.querySelector('#move-first')
const btnLast = document.querySelector('#move-last')

// Select inputs
const selector = document.querySelector('#selector')
const animate = document.querySelector('#animate')

// Selected element of group
var selected = document.querySelector('#first')
// Get value for 'animate' option
var isAnimated = animate.value === 'true'

// On click move element to next position
btnNext.addEventListener('click', () => {
  __WEBPACK_IMPORTED_MODULE_0__index___default.a.toNext(selected, { animate: isAnimated })
})

// On click move element back one position
btnBack.addEventListener('click', () => {
  __WEBPACK_IMPORTED_MODULE_0__index___default.a.toPrevious(selected, { animate: isAnimated })
})

// On click move element to first position
btnFirst.addEventListener('click', () => {
  __WEBPACK_IMPORTED_MODULE_0__index___default.a.toFirst(selected, { animate: isAnimated })
})

// On click move element to last position
btnLast.addEventListener('click', () => {
  __WEBPACK_IMPORTED_MODULE_0__index___default.a.toLast(selected, { animate: isAnimated })
})

// Update selected element of group
selector.addEventListener('change', (e) => {
  selected = document.querySelector(e.target.value)
})

// Update animate option
animate.addEventListener('change', (e) => {
  isAnimated = e.target.value === 'true'
})


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  optionsKeys: [
    'animate',
    'duration',
    'timeout'
  ],

  defaultOptions: {
    animate: false,
    duration: '.2s',
    timeout: 400
  },

  toNext(element, options) {
    options = options || {}
    options = this.buildOptions(options)

    // If element is not a object or has less than two children then stop
    if (!this.isGroup(element)) {
      return
    }

    const children = element.parentNode.children
    const total = children.length
    const indexOf = Array.from(children).indexOf(element)

    // If is already the last element then stop
    if (indexOf === (total - 1)) {
      return
    }

    // If animate is set then prepare transition style
    if (options.animate === true) {
      // Save any previous user's defined transition style
      const previousTransition = element.style.transition

      // Add new transition for fade in/out effect
      element.style.transition = this.buildTransition(
        element.style.transition,
        options
      )

      // Fade out element
      element.style.opacity = 0

      // Move element and fade in
      setTimeout(() => {
        element.parentNode.insertBefore(children[indexOf + 1], element)
        element.style.opacity = 1
        element.style.transition = previousTransition
      }, options.timeout)
    } else {
      element.parentNode.insertBefore(children[indexOf + 1], element)
    }
  },

  toPrevious(element, options) {
    options = options || {}
    options = this.buildOptions(options)

    // If element is not a object or has less than two children then stop
    if (!this.isGroup(element)) {
      return
    }

    const children = element.parentNode.children
    const total = children.length
    const indexOf = Array.from(children).indexOf(element)

    // If is already the first element then stop
    if (indexOf === 0) {
      return
    }

    // If animate is set then prepare transition style
    if (options.animate === true) {
      // Save any previous user's defined transition style
      const previousTransition = element.style.transition

      // Add new transition for fade in/out effect
      element.style.transition = this.buildTransition(
        element.style.transition,
        options
      )

      // Fade out element
      element.style.opacity = 0

      // Move element and fade in
      setTimeout(() => {
        element.parentNode.insertBefore(element, children[indexOf - 1])
        element.style.opacity = 1
        element.style.transition = previousTransition
      }, options.timeout)
    } else {
      element.parentNode.insertBefore(element, children[indexOf - 1])
    }
  },

  toFirst(element, options) {
    options = options || {}
    options = this.buildOptions(options)

    // If element is not a object or has less than two children then stop
    if (!this.isGroup(element)) {
      return
    }

    const children = element.parentNode.children
    const total = children.length
    const indexOf = Array.from(children).indexOf(element)

    // If is already the first element then stop
    if (indexOf === 0) {
      return
    }

    // If animate is set then prepare transition style
    if (options.animate === true) {
      // Save any previous user's defined transition style
      const previousTransition = element.style.transition

      // Add new transition for fade in/out effect
      element.style.transition = this.buildTransition(
        element.style.transition,
        options
      )

      // Fade out element
      element.style.opacity = 0

      // Move element and fade in
      setTimeout(() => {
        element.parentNode.insertBefore(element, children[0])
        element.style.opacity = 1
        element.style.transition = previousTransition
      }, options.timeout)
    } else {
      element.parentNode.insertBefore(element, children[0])
    }
  },

  toLast(element, options) {
    options = options || {}
    options = this.buildOptions(options)

    // If element is not a object or has less than two children then stop
    if (!this.isGroup(element)) {
      return
    }

    const children = element.parentNode.children
    const total = children.length
    const indexOf = Array.from(children).indexOf(element)

    // If is already the first element then stop
    if (indexOf === (total - 1)) {
      return
    }

    // If animate is set then prepare transition style
    if (options.animate === true) {
      // Save any previous user's defined transition style
      const previousTransition = element.style.transition

      // Add new transition for fade in/out effect
      element.style.transition = this.buildTransition(
        element.style.transition,
        options
      )

      // Fade out element
      element.style.opacity = 0

      // Move element and fade in
      setTimeout(() => {
        element.parentNode.appendChild(element)
        element.style.opacity = 1
        element.style.transition = previousTransition
      }, options.timeout)
    } else {
      element.parentNode.appendChild(element)
    }
  },

  // Helpers

  buildOptions (options) {
    for (let key, i = 0, l = this.optionsKeys.length; i < l; i++) {
      key = this.optionsKeys[i]
      options[key] = (key in options) ? options[key] : this.defaultOptions[key]
    }
    console.log(options)
    return options
  },

  buildTransition(transition, options) {
    return transition === '' ?
      'opacity ' + options.duration + ' linear' :
      transition + ', opacity ' + options.duration + ' linear'
  },

  hasRequirements(element) {
    return element instanceof Object ? element.parentNode.children.length : 0
  },

  isGroup(element) {
    return this.hasRequirements(element) > 1
  }
}


/***/ })
/******/ ]);