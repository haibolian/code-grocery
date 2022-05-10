import { createElement } from "./helper"

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


}