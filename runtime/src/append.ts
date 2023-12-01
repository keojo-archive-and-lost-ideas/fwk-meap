import { mountDOM } from "./mount-dom";
import { DOMAttributes, VirtualElementNode, VirtualFragmentNode, VirtualTextNode } from "./types";

export function appendTextNode({ node, parentElement }: { node: VirtualTextNode, parentElement: HTMLElement }) {
  const { value } = node;

  const textNode = document.createTextNode(value)

  // create a ref to the dom node
  node.domRef = textNode;
  parentElement.appendChild(textNode)
}

export function appendFragmentNode({ node, parentElement }: { node: VirtualFragmentNode, parentElement: HTMLElement }) {
  const { children: childrenVirtualDOMS } = node;

  node.domRef = parentElement;

  childrenVirtualDOMS.forEach((virtualDOM) => mountDOM({ vdom: virtualDOM, parentElement: parentElement }))
}

export function appendElementNode({ node, parentElement }: { node: VirtualElementNode, parentElement: HTMLElement }) {
  const { tag, props, children: childrenVirtualDOMS } = node;

  const element = document.createElement(tag as string);
  addPropsToElement({ element, props, vNode: node })
  node.element = element;
  node.domRef = parentElement;

  childrenVirtualDOMS.forEach((virtualDOM) => mountDOM({ vdom: virtualDOM, parentElement: parentElement }))
  parentElement.appendChild(element)
}

function addPropsToElement({ element, props, vNode }: { element: HTMLElement, props: DOMAttributes | null, vNode: VirtualElementNode }) {
  if (props === null) return;
  const { on: events, ...attributes } = props

  vNode.listeners = addEventListeners({ events, documentNode: element })
  setAttributes({ documentNode: element, attributes })
}

