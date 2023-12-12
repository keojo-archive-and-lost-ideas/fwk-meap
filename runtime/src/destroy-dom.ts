import { removeEventListeners } from './events'
import { DOM_TYPES, MontedVirtualNode, Vdom, VirtualElementNode, VirtualFragmentNode, VirtualTextNode } from './types'

export const isMountedDom = (vdom: Vdom): vdom is MontedVirtualNode => {
  if (vdom === null || typeof vdom === "string" || Array.isArray(vdom)) {
    return false
  }
  else {
    return true
  }
}

export const destroyDOM = ({ vdom }: { vdom: Vdom }) => {
  console.log('destrttoyDOM', vdom)
  if (!isMountedDom(vdom)) return

  const { type } = vdom
  switch (type) {
    case DOM_TYPES.TEXT:
      removeTextNode({ node: vdom })
      break

    case DOM_TYPES.FRAGMENT:
      removeFragmentNode({ node: vdom })
      break

    case DOM_TYPES.ELEMENT:
      removeElementNode({ node: vdom })
      break

    default: {
      throw new Error(`Can't destroy DOM of type: ${type}`)
    }
  }

  delete vdom.domRef
}

export const removeTextNode = ({ node }: { node: VirtualTextNode }) => {
  const { domRef } = node
  domRef?.remove()
}

export const removeFragmentNode = ({ node }: { node: VirtualFragmentNode }) => {
  const { children } = node
  children.forEach((child) => destroyDOM({ vdom: child }))
}

export const removeElementNode = ({ node }: { node: VirtualElementNode }) => {
  const { domRef, children, listeners } = node

  domRef?.remove()
  children.forEach((child) => destroyDOM({ vdom: child }))
  if(listeners) {
    removeEventListeners({element: domRef, listeners: listeners})
    delete node.listeners
  }
}