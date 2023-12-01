import { VirtualNode, VirtualElementNode, VirtualTextNode, VirtualFragmentNode, DOM_TYPES } from "./types";
import { mapTextNodes, withoutNulls } from "./utils/arrays";

export function createShadowString(str:string): VirtualTextNode {
  return { type: DOM_TYPES.TEXT, value: str }
}

export function createShadowFragment({vNodes, parentElement}:{vNodes:VirtualNode[], parentElement?:HTMLElement}): VirtualFragmentNode {
  return {
    type: DOM_TYPES.FRAGMENT,
    children: mapTextNodes(withoutNulls(vNodes)),
  }
}

export function createShadowElement(tag:string|object, props = {}, children: VirtualNode[] = []): VirtualElementNode {
  return {
    tag,
    props,
    children: mapTextNodes(withoutNulls(children)),
    type: DOM_TYPES.ELEMENT,
  }
}
