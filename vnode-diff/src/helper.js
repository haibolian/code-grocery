export function isVnode(node){
  const has = Object.hasOwnProperty.bind(node)
  return has('sel') && has('key') && has('elm')
}

export function isSameNode(oldVnode, newVnode){
  return oldVnode.sel === newVnode.sel &&
    oldVnode.key === newVnode.key
}

export function createElement(vnode){
  const { sel, data, children, elm, text } = vnode
  const el = document.createElement(sel.toLowerCase())
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      el[key] = data[key];
    }
  }
  if(typeof text == 'string' && (!children || !children.length)){
    el.innerHTML = text
  }
  if(children?.length){
    children.forEach(child => el.appendChild(createElement(child)))
  }
  vnode.elm = el
  return el
}