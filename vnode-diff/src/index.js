// import { h } from 'snabbdom';
import { h } from './h';
import patch from './patch';

const container = document.getElementById('app')

const demo1 = h('ul', {}, [
  h('li', {}, '李白'),
  h('li', {}, '苏轼'),
  h('li', {}, '白居易'),
  h('li', {}, '辛弃疾'),
  h('ol', {}, [
    h('li', {}, '醉里挑灯看剑'),
    h('li', {}, '梦回吹角连营'),
  ]),
])

const demo2 = h('ul', {}, [
  h('li', {}, '李白'),
  h('li', {}, '苏轼'),
  h('li', {}, '白居易'),
])

patch(container, demo1)

const btn = document.getElementById('btn')
btn.addEventListener('click', () => {
  patch(demo1, demo2)
})
