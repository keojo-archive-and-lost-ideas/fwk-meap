import { appendElementNode, appendFragmentNode, appendTextNode } from "./append";
import { createShadowFragment, createShadowString } from "./shadowNodes";
import { Vdom, VirtualElementNode, VirtualNode } from "./types";

export function insert(node:any, parentElement:HTMLElement, index:number) {
  // If index is null or undefined, simply append.
  // Note the usage of == instead of ===.
  if (index == null) {
    parentElement.append(node)
    return
  }

  if (index < 0) {
    throw new Error(`Index must be a positive integer, got ${index}`)
  }

  const childrens = parentElement.childNodes

  if (index >= childrens.length) {
    parentElement.append(node)
  } else {
    parentElement.insertBefore(node, childrens[index])
  }
}

export function mountDOM({vdom, parentElement, index}:{vdom: Vdom, parentElement: HTMLElement | null, index?: number}) {
  console.log('mountDOM', {vdom, parentElement});
  if (vdom === null || parentElement === null) return;
  if(typeof vdom === 'string' || typeof vdom === 'number') {
    vdom = createShadowString(`${vdom}`);
  }
  if(Array.isArray(vdom)) {
    vdom = createShadowFragment({vNodes: vdom});
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
