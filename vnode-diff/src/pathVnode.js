import { createElement, isSameNode } from "./helper"
import patch from "./patch"

const isText = vnode => typeof vnode.text == 'string' && (!vnode.children || !vnode.children.length)
// ① 如果新节点的 content 是 text，则直接 elm.innerHTML = content
// ② 如果新节点的 content 是 array，旧节点的 content 是 text，则创建 array 中的 dom，挂载上去
// ③ 如果新节点和旧节点的 content 都是 array，则进行 diff

export default function patchVnode(oldVnode, newVnode){
  // ① 如果新节点的 content 是 text，则直接 elm.innerText = content
  if(isText(newVnode)){
    oldVnode.elm.innerHTML = newVnode.text
    // ... 还有一些针对 data 里的数据的修改，这里先不写了
  }

  if(newVnode?.children && newVnode.children.length && isText(oldVnode)) {
    oldVnode.elm.innerHTML = null
    newVnode.children.forEach(child => 
      oldVnode.elm.appendChild(createElement(child))
    )
  }

  if(newVnode.children?.length && oldVnode.children?.length) {
    diff(oldVnode, newVnode)
  }
}

// 1. 旧前和新前
// 2. 旧后和新后
// 3. 旧前和新后
// 4. 旧后和新前
function diff(oldVnode, newVnode){
  const oldChildren = oldVnode.children
  const newChildren = newVnode.children
  let oldStartIdx = 0,
  oldEndIdx = oldVnode.children.length - 1,
  newStartIdx = 0,
  newEndIdx = newVnode.children.length - 1
  
  
  
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    const oldStartVnode = oldChildren[oldStartIdx],
      oldEndVnode = oldChildren[oldEndIdx],
      newStartVnode = newChildren[newStartIdx],
      newEndVnode = newChildren[newEndIdx]

    if(isSameNode(oldStartVnode, newStartVnode)) {
      patchVnode(oldChildren[oldStartIdx++], newChildren[newStartIdx++])

    }else if(isSameNode(oldEndVnode, newEndVnode)) {
      patchVnode(oldChildren[oldEndIdx--], newChildren[newEndIdx--])

    }else if(isSameNode(oldStartVnode, newEndVnode)) {
      const elm = oldStartVnode.elm
      oldVnode.elm.insertBefore(elm, oldEndVnode.elm.nextSibiling)
      newEndVnode.elm = elm
      patchVnode(oldChildren[oldStartIdx++ ], newChildren[newEndIdx--])

    }else if(isSameNode(oldEndVnode, newStartVnode)) {
      const elm = oldEndVnode.elm
      oldVnode.elm.insertBefore(elm, oldStartVnode.elm)
      newStartVnode.elm = elm
      patchVnode(oldChildren[oldEndIdx--], newChildren[newStartIdx++])

    }else {
      const targetVnode = oldChildren.find(oldChild => oldChild.key === newStartVnode.key)
      if(targetVnode) {
        
      }
    }
  }
  // 跳出 while 循环之后，if newChildren 的 两端 index 之前有内容，则视为新增的元素
  // if that has content between oldChildren's, that is delete element
  if(newStartIdx <= newEndIdx) {

  }
   
}
