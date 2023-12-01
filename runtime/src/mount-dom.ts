import { appendElementNode, appendFragmentNode, appendTextNode } from "./append";
import { createShadowFragment, createShadowString } from "./shadowNodes";
import { Vdom } from "./types";

export function mountDOM({vdom, parentElement}:{vdom: Vdom, parentElement: HTMLElement}) {
  if (vdom === null) return;
  if(typeof vdom === 'string') {
    createShadowString(vdom);
    return;
  }
  if(Array.isArray(vdom)) {
    createShadowFragment({vNodes: vdom});
    return;
  }
  switch (vdom.type) {
    case 'text':
      appendTextNode({ node: vdom, parentElement });
      break;
    case 'element':
      appendElementNode({ node: vdom, parentElement });
      break;
    case 'fragment':
      appendFragmentNode({ node: vdom, parentElement });
      break;
    default: {
      throw new Error(`Can't mount DOM of type: ${JSON.stringify(vdom)}`);
    }
  }
}
