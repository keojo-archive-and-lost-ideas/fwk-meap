var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import { setAttributes } from "./attributes";
import { addEventListeners } from "./events";
import { mountDOM } from "./mount-dom";
export function appendTextNode({
  node,
  parentElement
}) {
  const {
    value
  } = node;
  const textNode = document.createTextNode(value);
  // create a ref to the dom node
  node.domRef = textNode;
  parentElement.appendChild(textNode);
}
export function appendFragmentNode({
  node,
  parentElement
}) {
  const {
    children: childrenVirtualDOMS
  } = node;
  node.domRef = parentElement;
  childrenVirtualDOMS.forEach(virtualDOM => mountDOM({
    vdom: virtualDOM,
    parentElement: parentElement
  }));
}
export function appendElementNode({
  node,
  parentElement
}) {
  const {
    tag,
    props,
    children: childrenVirtualDOMS
  } = node;
  const element = document.createElement(tag);
  addPropsToElement({
    element,
    props,
    vNode: node
  });
  node.domRef = element;
  childrenVirtualDOMS.forEach(virtualDOM => mountDOM({
    vdom: virtualDOM,
    parentElement: element
  }));
  parentElement.appendChild(element);
}
function addPropsToElement({
  element,
  props,
  vNode
}) {
  if (props === null) return;
  const {
      on: events
    } = props,
    attributes = __rest(props, ["on"]);
  vNode.listeners = addEventListeners({
    listeners: events,
    element
  });
  setAttributes(element, attributes);
}