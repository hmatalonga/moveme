import moveme from '../index'

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
  moveme.toNext(selected, { animate: isAnimated })
})

// On click move element back one position
btnBack.addEventListener('click', () => {
  moveme.toPrevious(selected, { animate: isAnimated })
})

// On click move element to first position
btnFirst.addEventListener('click', () => {
  moveme.toFirst(selected, { animate: isAnimated })
})

// On click move element to last position
btnLast.addEventListener('click', () => {
  moveme.toLast(selected, { animate: isAnimated })
})

// Update selected element of group
selector.addEventListener('change', (e) => {
  selected = document.querySelector(e.target.value)
})

// Update animate option
animate.addEventListener('change', (e) => {
  isAnimated = e.target.value === 'true'
})
