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
const btnPos = document.querySelector('#move-pos')

// Select inputs
const selector = document.querySelector('#selector')
const animate = document.querySelector('#animate')

// Selected element of group
var selected = document.querySelector('#el1')
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

// On click move element to specified position
btnPos.addEventListener('click', () => {
  const position = document.querySelector('#position').value
  __WEBPACK_IMPORTED_MODULE_0__index___default.a.toPosition(selected, position, { animate: isAnimated })
})

// Update selected element of group
selector.addEventListener('change', e => {
  selected = document.querySelector(e.target.value)
})

// Update animate option
animate.addEventListener('change', e => {
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

  /**
  * Moves the given element to the next position,
  * relative to its current position.
   * @param  {Object} element  Given element
   * @param  {Object} options  Additional options for movement
   */
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

  /**
   * Moves the given element to the previous position,
   * relative to its current position.
   * @param  {Object} element  Given element
   * @param  {Object} options  Additional options for movement
   */
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

  /**
   * Moves the given element to the first position of the parent node.
   * @param  {Object} element  Given element
   * @param  {Object} options  Additional options for movement
   */
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

  /**
   * Moves the given element to the last position of the parent node.
   * @param  {Object} element  Given element
   * @param  {Object} options  Additional options for movement
   */
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

  /**
   * Moves the given element to the given position of the parent node.
   * @param  {Object} element  Given element
   * @param  {Number} position Position where to move the element
   * @param  {Object} options  Additional options for movement
   */
  toPosition(element, position, options) {
    options = options || {}
    options = this.buildOptions(options)

    position = parseInt(position)

    // If element is not a object or has less than two children then stop
    if (!this.isGroup(element)) {
      return
    }

    const children = element.parentNode.children
    const total = children.length
    const indexOf = Array.from(children).indexOf(element)

    // If the given position is an index out of bounds then stop
    if (position < 1 || position > total) {
      return
    }

    // If the element is already at the specified position then stop
    if (indexOf === (position - 1)) {
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
        // Check if which position is the best insertion
        if (position === 1) {
          element.parentNode.insertBefore(element, children[0])
        } else if (position === total) {
          element.parentNode.appendChild(element)
        } else {
          if ((position - 1) > indexOf) {
            element.parentNode.insertBefore(element, children[position])
          } else {
            element.parentNode.insertBefore(element, children[position - 1])
          }
        }
        element.style.opacity = 1
        element.style.transition = previousTransition
      }, options.timeout)
    } else {
      // Check if which position is the best insertion, without effect
      if (position === 1) {
        element.parentNode.insertBefore(element, children[0])
      } else if (position === total) {
        element.parentNode.appendChild(element)
      } else {
        if ((position - 1) > indexOf) {
          element.parentNode.insertBefore(element, children[position])
        } else {
          element.parentNode.insertBefore(element, children[position - 1])
        }
      }
    }
  },

  // Helpers -------------------------------------

  /**
   * Merge user's definied options with default options values.
   * @param  {Object} options Additional options
   * @return {Object}         Merged additional options
   */
  buildOptions(options) {
    for (let key, i = 0, l = this.optionsKeys.length; i < l; i++) {
      key = this.optionsKeys[i]
      options[key] = (key in options) ? options[key] : this.defaultOptions[key]
    }
    return options
  },

  /**
   * Create transition with fade in/out style effect for animation.
   * @param  {String} transition Existing transition style from element
   * @param  {Object} options    Options with animation values
   * @return {String}            Transition style effect
   */
  buildTransition(transition, options) {
    return transition === '' ?
      'opacity ' + options.duration + ' linear' :
      transition + ', opacity ' + options.duration + ' linear'
  },

  /**
   * Check if the given element has necessary conditions
   * to move within the group. Element must be of type {Object}
   * and parent node must have more than one child nodes.
   * @param  {Object}  element Given element
   * @return {Boolean}         Either if has all requirements or not
   */
  hasRequirements(element) {
    return element instanceof Object ? element.parentNode.children.length : 0
  },

  /**
   * Check the given element is a group, contains more than one child node.
   * @param  {Object}  element Given element
   * @return {Boolean}         Either if is a group element or not
   */
  isGroup(element) {
    return this.hasRequirements(element) > 1
  }
}


/***/ })
/******/ ]);