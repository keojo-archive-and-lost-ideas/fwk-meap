import { DOM_TYPES } from './types'

export function areNodesEqual({nodeOne, nodeTwo}:{nodeOne:any, nodeTwo:any}) {
  if (nodeOne.type !== nodeTwo.type) {
    return false
  }

  if (nodeOne.type === DOM_TYPES.ELEMENT) {
    const { tag: tagOne } = nodeOne
    const { tag: tagTwo } = nodeTwo

    return tagOne === tagTwo
  }

  return true
}