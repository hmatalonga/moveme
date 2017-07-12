import moveme from '../index'

// Buttons to trigger action
const btnUp = document.querySelector('#moveup')
const btnDown = document.querySelector('#movedown')

// Select input
const selector = document.querySelector('#selector')

// Selected element of group
var selected = document.querySelector('#first')

// On click move element down one position
btnDown.addEventListener('click', () => {
  moveme.down(selected)
})

// On click move element up one position
btnUp.addEventListener('click', () => {
  moveme.up(selected)
})

// Update selected element of group
selector.addEventListener('change', (e) => {
  selected = document.querySelector(e.target.value)
})
