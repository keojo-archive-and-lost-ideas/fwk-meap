import { areNodesEqual } from './ nodes-equal'
import { removeAttribute, removeStyle, setAttribute, setStyle } from './attributes'
import { destroyDOM, isMountedDom } from './destroy-dom'
import { mountDOM } from './mount-dom'
import { ARRAY_DIFF_OP, DOMAttributes, DOM_TYPES, MontedVirtualNode, Vdom, VirtualElementNode, VirtualTextNode } from './types'
import { objectsDiff } from './utils/ objects'
import { arraysDiff, arraysDiffSequence } from './utils/arrays'
import { isNotBlankOrEmptyString } from './utils/strings'
import { addEventListener } from './events'
import { extractChildren } from './shadowNodes'

export function patchDOM(oldVdom:Vdom, newVdom:MontedVirtualNode, parentElement:HTMLElement) {
  console.log('patchDOM', oldVdom, newVdom, parentElement)

    if (!isMountedDom(oldVdom)) {
      throw new Error(`Can't patch DOM of type: ${typeof oldVdom}`)
    }

    if (!areNodesEqual(oldVdom, newVdom)) {
      console.log('here', oldVdom)
      const index = findIndexInParent(parentElement, oldVdom.domRef)

      destroyDOM({ vdom: oldVdom})
      mountDOM({ vdom: newVdom, parentElement, index })
  
      return newVdom
    }

    // node are equal we are patching this part of the dom
    newVdom.domRef = oldVdom.domRef
    
    switch (newVdom.type) {
      case DOM_TYPES.TEXT: {
        patchText({ oldVdom: oldVdom as VirtualTextNode, newVdom }) 
        return newVdom 
      }

      case DOM_TYPES.ELEMENT: {
        patchElement({ oldVdom: oldVdom as VirtualElementNode, newVdom })
        break
      }
    }

    patchChildren(oldVdom, newVdom)

    return newVdom
  }

function findIndexInParent(parentElement, element) {
  const index = Array.from(parentElement.childNodes).indexOf(element)
  if (index < 0) {
    return null
  }

  return index
}




interface PatchTextProps {
  oldVdom: VirtualTextNode;
  newVdom: VirtualTextNode;
}
function patchText({oldVdom, newVdom}: PatchTextProps) {
  const element = oldVdom.domRef
  const { value: oldText } = oldVdom
  const { value: newText } = newVdom

  if (oldText !== newText) {
    element.nodeValue = newText
  }
}

interface PatchElementProps {
  oldVdom: VirtualElementNode;
  newVdom: VirtualElementNode;
}

function patchElement({oldVdom, newVdom}: PatchElementProps) {
  const element = oldVdom.domRef
  const {
    class: oldClass,
    style: oldStyle,
    on: oldEvents,
    ...oldAttributes
  } = oldVdom.props
  const {
    class: newClass,
    style: newStyle,
    on: newEvents,
    ...newAttributes
  } = newVdom.props
  const { listeners: oldListeners } = oldVdom

  patchAttrs({element, oldAttributes, newAttributes})
  patchClasses({element, oldClass, newClass})
  patchStyles({element, oldStyle, newStyle})
  newVdom.listeners = patchEvents({element, oldListeners, oldEvents, newEvents})
}


interface PatchAttrsProps {
  element: HTMLElement;
  oldAttributes: DOMAttributes;
  newAttributes: DOMAttributes;
}
function patchAttrs({element, oldAttributes, newAttributes}:PatchAttrsProps){
  const { added, removed, updated } = objectsDiff(oldAttributes, newAttributes) 

  for (const attribute of removed) {
    removeAttribute(element, attribute) 
  }

  for (const attribute of added.concat(updated)) {
    setAttribute(element, attribute, newAttributes[attribute]) 
  }
}

interface PatchClassProps {
  element: HTMLElement;
  oldClass: string | string[];
  newClass: string | string[];
}
function patchClasses({element, oldClass, newClass}:PatchClassProps) {
  const oldClasses = toClassList(oldClass) 
  const newClasses = toClassList(newClass) 

  const { added, removed } = arraysDiff(oldClasses, newClasses) 

  if (removed.length > 0) {
    element.classList.remove(...removed) 
  }
  if (added.length > 0) {
    element.classList.add(...added) 
  }
}

function toClassList(classes: string | string[] = '') {
  return Array.isArray(classes)
    ? classes.filter(isNotBlankOrEmptyString) 
    : classes.split(/(\s+)/).filter(isNotBlankOrEmptyString) 
}

interface PatchStylesProps {
  element: HTMLElement;
  oldStyle: Record<string, string>;
  newStyle:  Record<string, string>;
}
function patchStyles({element, oldStyle = {}, newStyle = {}}: PatchStylesProps) {
  const { added, removed, updated } = objectsDiff(oldStyle, newStyle)

  for (const style of removed) {
    removeStyle(element, style)
  }

  for (const style of added.concat(updated)) {
    setStyle(element, style, newStyle[style])
  }
}


interface PatchEventsProps {
  element: HTMLElement;
  oldListeners: { [key: string]: (event: Event) => void}
  oldEvents: { [key: string]: (event: Event) => void}
  newEvents: { [key: string]: (event: Event) => void}
}
function patchEvents({element, oldListeners, oldEvents, newEvents}: PatchEventsProps) {
  console.log('patchEvents', element)
  const { removed, added, updated } = objectsDiff(oldEvents, newEvents) 

  for (const eventName of removed.concat(updated)) {
    element.removeEventListener(eventName, oldListeners[eventName]) 
  }

  const addedListeners = {} 

  for (const eventName of added.concat(updated)) {
    const listener = addEventListener({ eventName, handler: newEvents[eventName] as () => any, element}) 
    addedListeners[eventName] = listener 
  }

  return addedListeners 
}


function patchChildren(oldVdom, newVdom) {
  const oldChildren = extractChildren({vdom: oldVdom}) 
  const newChildren = extractChildren({vdom: newVdom}) 
  const parentElement = oldVdom.domRef

  const diffSequence = arraysDiffSequence( 
    oldChildren,
    newChildren,
    areNodesEqual
  )

  for (const operation of diffSequence) { 
    const { originalIndex, index, item } = operation

    switch (operation.op) { 
      case ARRAY_DIFF_OP.ADD: {
        // TODO: implement
        mountDOM({vdom: item, parentElement, index})
        break
      }

      case ARRAY_DIFF_OP.REMOVE: {
        // TODO: implement
        destroyDOM({vdom: item})
        break
      }

      case ARRAY_DIFF_OP.MOVE: {
        // TODO: implement
        const oldChild = oldChildren[originalIndex] 
        const newChild = newChildren[index] 
        const el = oldChild.el 
        const elAtTargetIndex = parentElement.childNodes[index] 

        parentElement.insertBefore(el, elAtTargetIndex) 
        patchDOM(oldChild, newChild, parentElement) 

        break
      }

      case ARRAY_DIFF_OP.NOOP: {
        // TODO: implement
        patchDOM(oldChildren[originalIndex], newChildren[index], parentElement)
        break
      }
    }
  }
}