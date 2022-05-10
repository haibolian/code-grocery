import { isVnode, isSameNode, createElement } from './helper';
import vnode from './vnode';
import patchVnode from './pathVnode';

// patch 更新旧节点为新节点
// 如果旧节点不是 vnode，将其转换成 vnode，再进行比较
// 如果新节点和旧节点不是相同节点，则新节点直接覆盖旧节点，不需要再往下比较了
// 如果新旧节点是同一个节点，什么都不做
// 如果新节点和旧节点是相同节点（sel、key 相同，input 还要比较 type，在此不考虑 input 类型）
// ① 如果新节点的 content 是 text，则直接 elm.innerText = content
// ② 如果新节点的 content 是 array，旧节点的 content 是 text，则创建 array 中的 dom，挂载上去
// ③ 如果新节点和旧节点的 content 都是 array，则进行 diff

export default function patch(oldVnode, newVnode){
  // 如果旧节点不是 vnode，将其转换成 vnode，再进行比较
  if(!isVnode(oldVnode)){
    oldVnode = vnode(
      oldVnode.tagName.toLowerCase(),
      {},
      oldVnode,
      undefined,
      undefined
    )
  }
  // 如果新旧节点是同一个节点，什么都不做
  if(oldVnode === newVnode) return
  // 如果新节点和旧节点不是相同节点，则新节点直接覆盖旧节点，不需要再往下比较了
  if(isSameNode(oldVnode, newVnode)){
    patchVnode(oldVnode, newVnode)
  }else{
    const el = createElement(newVnode)
    const oldElm = oldVnode.elm
    oldElm.parentNode.insertBefore(el, oldElm)
    oldElm.remove()
    newVnode.elm = el
  }
}