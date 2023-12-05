import { setAttributes } from "./attributes";
import { addEventListeners } from "./events";
import { insert, mountDOM } from "./mount-dom";
import { DOMAttributes, VirtualElementNode, VirtualFragmentNode, VirtualTextNode } from "./types";

//text
export function appendTextNode({ node, parentElement, index }: { node: VirtualTextNode, parentElement: HTMLElement, index?: number }) {
  const { value } = node;

  const textNode = document.createTextNode(value)

  // create a ref to the dom node
  node.domRef = textNode;
  parentElement.append(textNode)
}

//fragment
export function appendFragmentNode({ node, parentElement, index }: { node: VirtualFragmentNode, parentElement: HTMLElement, index?: number }) {
  const { children: childrenVirtualDOMS } = node;

  node.domRef = parentElement;

  childrenVirtualDOMS.forEach((virtualDOM, i) => mountDOM({ vdom: virtualDOM, parentElement: parentElement }))
}

//element
export function appendElementNode({ node, parentElement, index }: { node: VirtualElementNode, parentElement: HTMLElement, index?: number }) {
  const { tag, props, children: childrenVirtualDOMS } = node;

  const element = document.createElement(tag as string);
  addPropsToElement({ element, props, vNode: node })
  node.domRef = element;

  childrenVirtualDOMS.forEach((virtualDOM) => mountDOM({ vdom: virtualDOM, parentElement: element }))
  parentElement.append(element)
}

function addPropsToElement({ element, props, vNode }: { element: HTMLElement, props: DOMAttributes | null, vNode: VirtualElementNode }) {
  if (props === null) return;
  const { on: events, ...attributes } = props

  vNode.listeners = addEventListeners({ listeners: events, element })
  setAttributes(element, attributes)
}
