import { DOM_TYPES } from "./types";
import { mapTextNodes, withoutNulls } from "./utils/arrays";
export function createShadowString(str) {
  return {
    type: DOM_TYPES.TEXT,
    value: str
  };
}
export function createShadowFragment({
  vNodes,
  parentElement
}) {
  return {
    type: DOM_TYPES.FRAGMENT,
    children: mapTextNodes(withoutNulls(vNodes))
  };
}
export function createShadowElement(tag, props = {}, children = []) {
  return {
    tag,
    props,
    children: mapTextNodes(withoutNulls(children)),
    type: DOM_TYPES.ELEMENT
  };
}