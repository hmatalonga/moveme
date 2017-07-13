import moveMe from '../index'

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
  moveMe.toNext(selected, { animate: isAnimated })
})

// On click move element back one position
btnBack.addEventListener('click', () => {
  moveMe.toPrevious(selected, { animate: isAnimated })
})

// On click move element to first position
btnFirst.addEventListener('click', () => {
  moveMe.toFirst(selected, { animate: isAnimated })
})

// On click move element to last position
btnLast.addEventListener('click', () => {
  moveMe.toLast(selected, { animate: isAnimated })
})

// On click move element to specified position
btnPos.addEventListener('click', () => {
  const position = document.querySelector('#position').value
  moveMe.toPosition(selected, position, { animate: isAnimated })
})

// Update selected element of group
selector.addEventListener('change', e => {
  selected = document.querySelector(e.target.value)
})

// Update animate option
animate.addEventListener('change', e => {
  isAnimated = e.target.value === 'true'
})
