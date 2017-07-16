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
const animator = document.querySelector('#animator')

// Selected element of group
var selected = document.querySelector('#el1')
// Get value for 'animator' option
var currentAnimation = animator.value

// On click move element to next position
btnNext.addEventListener('click', () => {
  __WEBPACK_IMPORTED_MODULE_0__index___default.a.toNext(selected, { animation: currentAnimation })
})

// On click move element back one position
btnBack.addEventListener('click', () => {
  __WEBPACK_IMPORTED_MODULE_0__index___default.a.toPrevious(selected, { animation: currentAnimation })
})

// On click move element to first position
btnFirst.addEventListener('click', () => {
  __WEBPACK_IMPORTED_MODULE_0__index___default.a.toFirst(selected, { animation: currentAnimation })
})

// On click move element to last position
btnLast.addEventListener('click', () => {
  __WEBPACK_IMPORTED_MODULE_0__index___default.a.toLast(selected, { animation: currentAnimation })
})

// On click move element to specified position
btnPos.addEventListener('click', () => {
  const position = document.querySelector('#position').value
  __WEBPACK_IMPORTED_MODULE_0__index___default.a.toPosition(selected, position, { animation: currentAnimation })
})

// Update selected element of group
selector.addEventListener('change', e => {
  selected = document.querySelector(e.target.value)
})

// Update animate option
animator.addEventListener('change', e => {
  currentAnimation = e.target.value
})


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
	optionsKeys: [
		'animation',
		'duration',
		'timingFunction',
		'delay'
	],

	animations: [
		'none',
		'fadeInOut',
		'slideInOut'
	],

	animationsProperties: {
		none: '',
		fadeInOut: 'opacity',
		slideInOut: 'transform'
	},

	defaultOptions: {
		animation: 'fadeInOut',
		duration: '.4s',
		timingFunction: 'ease-in-out',
		delay: '0s'
	},

	props: {
		moveFunction: null,
		children: null,
		total: 0,
		indexOf: -1,
		previous: {
			transition: null,
			opacity: null
		}
	},

	/**
	* Moves the given element to the next position,
	* relative to its current position.
	 * @param  {Object} element  Given element
	 * @param  {Object} [options]  Additional options for movement
	 */
	toNext(element, options) {
		options = options || {}
		options = this.buildOptions(options)

		// If element is not a object or has less than two children then stop
		if (!this.isGroup(element)) {
			return
		}

		this.props.children = element.parentNode.children
		this.props.total = this.props.children.length
		this.props.indexOf = Array.from(this.props.children).indexOf(element)

		// If is already the last element then stop
		if (this.props.indexOf === (this.props.total - 1)) {
			return
		}

		// Defines movement function
		this.props.moveFunction = () => {
			element.parentNode.insertBefore(
				this.props.children[this.props.indexOf + 1],
				element
			)
		}

		if (options.animation !== 'none') {
			// Save any previous user's defined transition style
			this.props.previous.transition = element.style.transition
			this.props.previous.opacity = element.style.opacity

			// Define transition effect values for animation
			element.style.transition = this.buildTransition(
				element.style.transition,
				options
			)
		}

		// Check which animation is being used
		if (options.animation === 'fadeInOut') {
			// Set the effect as running
			element.dataset.moveme = true

			// Fade out element
			element.style.opacity = 0

			element.ontransitionend = null

			// Define transition end event listener
			element.ontransitionend = function () {
				if (element.dataset.moveme === 'true') {
					this.props.moveFunction()
					element.style.opacity = this.props.previous.opacity
					element.dataset.moveme = false
				} else {
					element.style.transition = this.props.previous.transition
				}
			}.bind(this)
		} else {
			this.props.moveFunction()
		}
	},

	/**
	 * Moves the given element to the previous position,
	 * relative to its current position.
	 * @param  {Object} element  Given element
	 * @param  {Object} [options]  Additional options for movement
	 */
	toPrevious(element, options) {
		options = options || {}
		options = this.buildOptions(options)

		// If element is not a object or has less than two children then stop
		if (!this.isGroup(element)) {
			return
		}

		this.props.children = element.parentNode.children
		this.props.indexOf = Array.from(this.props.children).indexOf(element)

		// If is already the first element then stop
		if (this.props.indexOf === 0) {
			return
		}

		// Defines movement function
		this.props.moveFunction = () => {
			element.parentNode.insertBefore(
				element,
				this.props.children[this.props.indexOf - 1]
			)
		}

		if (options.animation !== 'none') {
			// Save any previous user's defined transition style
			this.props.previous.transition = element.style.transition
			this.props.previous.opacity = element.style.opacity

			// Define transition effect values for animation
			element.style.transition = this.buildTransition(
				element.style.transition,
				options
			)
		}

		// Check which animation is being used
		if (options.animation === 'fadeInOut') {
			// Set the effect as running
			element.dataset.moveme = true

			// Fade out element
			element.style.opacity = 0

			element.ontransitionend = null

			// Define transition end event listener
			element.ontransitionend = function () {
				if (element.dataset.moveme === 'true') {
					this.props.moveFunction()
					element.style.opacity = this.props.previous.opacity
					element.dataset.moveme = false
				} else {
					element.style.transition = this.props.previous.transition
				}
			}.bind(this)
		} else {
			this.props.moveFunction()
		}
	},

	/**
	 * Moves the given element to the first position of the parent node.
	 * @param  {Object} element  Given element
	 * @param  {Object} [options]  Additional options for movement
	 */
	toFirst(element, options) {
		options = options || {}
		options = this.buildOptions(options)

		// If element is not a object or has less than two children then stop
		if (!this.isGroup(element)) {
			return
		}

		this.props.children = element.parentNode.children
		this.props.indexOf = Array.from(this.props.children).indexOf(element)

		// If is already the first element then stop
		if (this.props.indexOf === 0) {
			return
		}

		// Defines movement function
		this.props.moveFunction = () => {
			element.parentNode.insertBefore(
				element,
				this.props.children[0]
			)
		}

		if (options.animation !== 'none') {
			// Save any previous user's defined transition style
			this.props.previous.transition = element.style.transition
			this.props.previous.opacity = element.style.opacity

			// Define transition effect values for animation
			element.style.transition = this.buildTransition(
				element.style.transition,
				options
			)
		}

		// Check which animation is being used
		if (options.animation === 'fadeInOut') {
			// Set the effect as running
			element.dataset.moveme = true

			// Fade out element
			element.style.opacity = 0

			element.ontransitionend = null

			// Define transition end event listener
			element.ontransitionend = function () {
				if (element.dataset.moveme === 'true') {
					this.props.moveFunction()
					element.style.opacity = this.props.previous.opacity
					element.dataset.moveme = false
				} else {
					element.style.transition = this.props.previous.transition
				}
			}.bind(this)
		} else {
			this.props.moveFunction()
		}
	},

	/**
	 * Moves the given element to the last position of the parent node.
	 * @param  {Object} element  Given element
	 * @param  {Object} [options]  Additional options for movement
	 */
	toLast(element, options) {
		options = options || {}
		options = this.buildOptions(options)

		// If element is not a object or has less than two children then stop
		if (!this.isGroup(element)) {
			return
		}

		this.props.children = element.parentNode.children
		this.props.total = this.props.children.length
		this.props.indexOf = Array.from(this.props.children).indexOf(element)

		// If is already the first element then stop
		if (this.props.indexOf === (this.props.total - 1)) {
			return
		}

		// Defines movement function
		this.props.moveFunction = () => {
			element.parentNode.appendChild(element)
		}

		if (options.animation !== 'none') {
			// Save any previous user's defined transition style
			this.props.previous.transition = element.style.transition
			this.props.previous.opacity = element.style.opacity

			// Define transition effect values for animation
			element.style.transition = this.buildTransition(
				element.style.transition,
				options
			)
		}

		// Check which animation is being used
		if (options.animation === 'fadeInOut') {
			// Set the effect as running
			element.dataset.moveme = true

			// Fade out element
			element.style.opacity = 0

			element.ontransitionend = null

			// Define transition end event listener
			element.ontransitionend = function () {
				if (element.dataset.moveme === 'true') {
					this.props.moveFunction()
					element.style.opacity = this.props.previous.opacity
					element.dataset.moveme = false
				} else {
					element.style.transition = this.props.previous.transition
				}
			}.bind(this)
		} else {
			this.props.moveFunction()
		}
	},

	/**
	 * Moves the given element to the given position of the parent node.
	 * @param  {Object} element  Given element
	 * @param  {Number} position Position where to move the element
	 * @param  {Object} [options]  Additional options for movement
	 */
	toPosition(element, position, options) {
		options = options || {}
		options = this.buildOptions(options)

		position = parseInt(position, 10)

		// If element is not a object or has less than two children then stop
		if (!this.isGroup(element)) {
			return
		}

		this.props.children = element.parentNode.children
		this.props.total = this.props.children.length
		this.props.indexOf = Array.from(this.props.children).indexOf(element)

		// If the given position is an index out of bounds then stop
		if (position < 1 || position > this.props.total) {
			return
		}

		// If the element is already at the specified position then stop
		if (this.props.indexOf === (position - 1)) {
			return
		}

		// Defines movement function
		this.props.moveFunction = () => {
			if (position === 1) {
				element.parentNode.insertBefore(element, this.props.children[0])
			} else if (position === this.props.total) {
				element.parentNode.appendChild(element)
			} else if ((position - 1) > this.props.indexOf) {
				element.parentNode.insertBefore(element, this.props.children[position])
			} else {
				element.parentNode.insertBefore(
					element,
					this.props.children[position - 1]
				)
			}
		}

		if (options.animation !== 'none') {
			// Save any previous user's defined transition style
			this.props.previous.transition = element.style.transition
			this.props.previous.opacity = element.style.opacity

			// Define transition effect values for animation
			element.style.transition = this.buildTransition(
				element.style.transition,
				options
			)
		}

		// Check which animation is being used
		if (options.animation === 'fadeInOut') {
			// Set the effect as running
			element.dataset.moveme = true

			// Fade out element
			element.style.opacity = 0

			element.ontransitionend = null

			// Define transition end event listener
			element.ontransitionend = function () {
				if (element.dataset.moveme === 'true') {
					this.props.moveFunction()
					element.style.opacity = this.props.previous.opacity
					element.dataset.moveme = false
				} else {
					element.style.transition = this.props.previous.transition
				}
			}.bind(this)
		} else {
			this.props.moveFunction()
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
		const effect = [
			this.animationsProperties[options.animation],
			options.duration,
			options.timingFunction,
			options.delay
		]
		return transition === '' ?
			effect.join(' ') : transition + ', ' + effect.join(' ')
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