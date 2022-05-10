import vnode  from './vnode.js';

export function h(sel, data, content){
  // let children
  let elm, children, text
  if(typeof content == 'string'){
    text = content
  }
  if(Array.isArray(content)){
    children = content
  }
  if(typeof content == 'object' && content.hasOwnProperty('sel')){
    children = [content]
  }

  return vnode(
    sel,
    data,
    elm,
    children,
    text,
    data.key
  )
}