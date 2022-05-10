// import { h } from 'snabbdom';
import { h } from './h';
import patch from './patch';

const container = document.getElementById('app')

const demo1 = h('ul', {}, [
  h('li', {}, '王熙凤'),
  h('li', {}, '贾宝玉'),
  h('li', {}, '林黛玉'),
  h('li', {}, '薛宝钗'),
])

patch(container, demo1)