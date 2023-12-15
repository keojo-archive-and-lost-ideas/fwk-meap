import { c } from "vitest/dist/reporters-5f784f42";
import { VirtualNode, VirtualElementNode, VirtualTextNode, VirtualFragmentNode, DOM_TYPES } from "./types";
import { mapTextNodes, withoutNulls } from "./utils/arrays";
import { isMountedDom } from "./destroy-dom";

export function createShadowString(str:string): VirtualTextNode {
  return { type: DOM_TYPES.TEXT, value: str }
}

export function createShadowFragment({vNodes}:{vNodes:VirtualNode[]}): VirtualFragmentNode {
  const c = {
    type: DOM_TYPES.FRAGMENT,
    children: mapTextNodes(withoutNulls(vNodes)),
  }

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


export function extractChildren({vdom}:{vdom: VirtualElementNode | VirtualFragmentNode}) {
  if (vdom.children == null) {
    return []
  }

  const children = []

  for (const child of vdom.children) {
    if (!isMountedDom(child)) {
      throw new Error(`Child should be mounted at this step`)
    }
    if (child.type === DOM_TYPES.FRAGMENT) {
      children.push(...extractChildren({ vdom: child }))
    } else {
      children.push(child)
    }
  }

  return children
}