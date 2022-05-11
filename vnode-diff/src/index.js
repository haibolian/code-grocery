// import { h } from 'snabbdom';
import { h } from './h';
import patch from './patch';

const container = document.getElementById('app')

const demo1 = h('ul', {}, [
  h('li', { key: 'A' }, 'A'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'C' }, 'C'),
  h('li', { key: 'D' }, 'D'),
  h('li', { key: 'E' }, 'E')
])

const demo2 = h('ul', {}, [
  h('li', { key: 'QQ' }, 'QQB'),
  h('li', { key: 'C' }, 'C'),
  h('li', { key: 'D' }, 'D'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'F' }, 'F'),
  h('li', { key: 'G' }, 'G')
])

let oldVnode

patch(container, demo1)
oldVnode = demo1
const btn = document.getElementById('btn')
btn.addEventListener('click', () => {
  patch(oldVnode, demo2)
  oldVnode = demo2
})
