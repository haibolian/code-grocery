// import { h } from 'snabbdom';
import { h } from './h';
import patch from './patch';

const container = document.getElementById('app')

const demo1 = h('ul', { key: 'ul' }, [
  h('li', { key: 'libai' }, '李白'),
  h('li', { key: 'sushi' }, '苏轼'),
  h('li', { key: 'baijuyi' }, '白居易'),
  h('li', { key: 'xinqiji' }, '辛弃疾')
])

const demo2 = h('ul', { key: 'ul' }, [
  h('li', { key: 'libai' }, '李白0'),
  h('li', { key: 'sushi' }, '苏轼1'),
  h('li', { key: 'baijuyi' }, '白居易2'),
  h('li', { key: 'xinqiji' }, '辛弃疾3'),
])

patch(container, demo1)

const btn = document.getElementById('btn')
btn.addEventListener('click', () => {
  patch(demo1, demo2)
})
