'use strict'

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
