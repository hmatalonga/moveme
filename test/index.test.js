import test from 'ava'
import { JSDOM } from 'jsdom'
import * as moveMe from '../index'

const html = 
`<div class="parent">
	<div id="el1">#1 One</div>
	<div id="el2">#2 Two</div>
	<div id="el3">#3 Three</div>
	<div id="el4">#4 Four</div>
</div>`

test('HTML document exists and has one child', t => {
	const { document } = new JSDOM(html).window
	t.not(document, null)
	t.is(document.body.children.length, 1)
})

test('Document div with class parent exists', t => {
	const { document } = new JSDOM(html).window
	const parent = document.querySelector('.parent')
	t.not(parent, null)
})

test('Div with class parent has four children', t => {
	const { document } = new JSDOM(html).window
	const parent = document.querySelector('.parent')
	t.not(parent.children, null || [])
	t.is(parent.children.length, 4)
})

test('Move #el1 to next position', t => {
	const { document } = new JSDOM(html).window
	const children = document.querySelector('.parent').children
	const firstElem = document.querySelector('#el1')
	t.not(firstElem, null)
	t.is(children[0], firstElem)
	moveMe.toNext(firstElem, { animation: 'none' })
	t.is(children[1], firstElem)
})

test('Move #el2 to previous position', t => {
	const { document } = new JSDOM(html).window
	const children = document.querySelector('.parent').children
	const secondElem = document.querySelector('#el2')
	t.not(secondElem, null)
	t.is(children[1], secondElem)
	moveMe.toPrevious(secondElem, { animation: 'none' })
	t.is(children[0], secondElem)
})

test('Move #el4 to first position', t => {
	const { document } = new JSDOM(html).window
	const children = document.querySelector('.parent').children
	const lastElem = document.querySelector('#el4')
	t.not(lastElem, null)
	t.is(children[3], lastElem)
	moveMe.toFirst(lastElem, { animation: 'none' })
	t.is(children[0], lastElem)
})

test('Move #el1 to last position', t => {
	const { document } = new JSDOM(html).window
	const children = document.querySelector('.parent').children
	const firstElem = document.querySelector('#el1')
	t.not(firstElem, null)
	t.is(children[0], firstElem)
	moveMe.toLast(firstElem, { animation: 'none' })
	t.is(children[3], firstElem)
})

test('Move #el1 to third position', t => {
	const { document } = new JSDOM(html).window
	const children = document.querySelector('.parent').children
	const firstElem = document.querySelector('#el1')
	t.not(firstElem, null)
	t.is(children[0], firstElem)
	moveMe.toPosition(firstElem, 3, { animation: 'none' })
	t.is(children[2], firstElem)
})
