// import { h } from 'snabbdom';
import { h } from './h';
import patch from './patch';

const container = document.getElementById('app')

const demo1 = h('ul', { key: 'ul' }, [
  h('li', { key: 'A' }, 'A'),
  h('li', { key: 'B' }, 'B'),
  // h('li', { key: 'Q' }, 'Q'),
  h('li', { key: 'C' }, 'C'),
  h('li', { key: 'D' }, 'D'),
])

const demo2 = h('ul', { key: 'ul' }, [
  h('li', { key: 'Q' }, 'Q5'),
  h('li', { key: 'P' }, 'P5'),
  h('li', { key: 'D' }, 'D3'),
  h('li', { key: 'C' }, 'C2'),
  h('li', { key: 'A' }, 'A0'),
  h('li', { key: 'B' }, 'B1'),
])

patch(container, demo1)

const btn = document.getElementById('btn')
btn.addEventListener('click', () => {
  patch(demo1, demo2)
})
