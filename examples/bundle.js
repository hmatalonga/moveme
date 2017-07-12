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
const btnUp = document.querySelector('#moveup')
const btnDown = document.querySelector('#movedown')

// Select input
const selector = document.querySelector('#selector')

// Selected element of group
var selected = document.querySelector('#first')

// On click move element down one position
btnDown.addEventListener('click', () => {
  __WEBPACK_IMPORTED_MODULE_0__index___default.a.down(selected)
})

// On click move element up one position
btnUp.addEventListener('click', () => {
  __WEBPACK_IMPORTED_MODULE_0__index___default.a.up(selected)
})

// Update selected element of group
selector.addEventListener('change', (e) => {
  selected = document.querySelector(e.target.value)
})


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  down(element) {
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
    // Move the element
    element.parentNode.insertBefore(children[indexOf + 1], element)
  },

  up(element) {
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
    // Move the element
    element.parentNode.insertBefore(element, children[indexOf - 1])
  },

  checkConstraints(element) {
    return element instanceof Object ?
      element.parentNode.children.length : 0
  },

  isGroup(element) {
    return this.checkConstraints(element) > 1
  }
}


/***/ })
/******/ ]);