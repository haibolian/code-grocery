import { isVnode } from './helper';
import vnode from './vnode';

export default function(oldVnode, newVnode){
  if(!isVnode(oldVnode)){
    oldVnode = vnode({
      sel: oldVnode.tagName,
      data: {},
      elm: oldVnode,
      undefined,
      undefined
    })
  }
}