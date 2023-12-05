import { c } from "vitest/dist/reporters-5f784f42";
import { VirtualNode, VirtualElementNode, VirtualTextNode, VirtualFragmentNode, DOM_TYPES } from "./types";
import { mapTextNodes, withoutNulls } from "./utils/arrays";

export function createShadowString(str:string): VirtualTextNode {
  return { type: DOM_TYPES.TEXT, value: str }
}

export function createShadowFragment({vNodes}:{vNodes:VirtualNode[]}): VirtualFragmentNode {
  console.log('createShadowFragment', {vNodes})
  const c = {
    type: DOM_TYPES.FRAGMENT,
    children: mapTextNodes(withoutNulls(vNodes)),
  }
  console.log('createShadowFragment', c)

  return c
}

export function createShadowElement(tag:string|object, props = {}, children: VirtualNode[] = []): VirtualElementNode {
  return {
    tag,
    props,
    children: mapTextNodes(withoutNulls(children)),
    type: DOM_TYPES.ELEMENT,
  }
}
