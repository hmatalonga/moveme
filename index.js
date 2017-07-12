'use strict'

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
