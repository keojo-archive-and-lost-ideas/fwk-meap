import { DOM_TYPES, MontedVirtualNode } from "./types"

/*
* areNodesEqual doesn't really compare node equality, but rather if an old node can be considered equal as a new one. ie patchable
*/
export function areNodesEqual(nodeOne:MontedVirtualNode, nodeTwo:MontedVirtualNode) {
  if (nodeOne.type !== nodeTwo.type) {
    return false
  }

  if (nodeOne.type === DOM_TYPES.ELEMENT && nodeTwo.type === DOM_TYPES.ELEMENT) {
    const { tag: tagOne } = nodeOne
    const { tag: tagTwo } = nodeTwo

    return tagOne === tagTwo
  }

  return true
}