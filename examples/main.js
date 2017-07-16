import moveMe from '../index'

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
  moveMe.toNext(selected, { animation: currentAnimation })
})

// On click move element back one position
btnBack.addEventListener('click', () => {
  moveMe.toPrevious(selected, { animation: currentAnimation })
})

// On click move element to first position
btnFirst.addEventListener('click', () => {
  moveMe.toFirst(selected, { animation: currentAnimation })
})

// On click move element to last position
btnLast.addEventListener('click', () => {
  moveMe.toLast(selected, { animation: currentAnimation })
})

// On click move element to specified position
btnPos.addEventListener('click', () => {
  const position = document.querySelector('#position').value
  moveMe.toPosition(selected, position, { animation: currentAnimation })
})

// Update selected element of group
selector.addEventListener('change', e => {
  selected = document.querySelector(e.target.value)
})

// Update animate option
animator.addEventListener('change', e => {
  currentAnimation = e.target.value
})
