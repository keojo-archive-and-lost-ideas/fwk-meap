import { DOM_TYPES, VirtualNode } from "../types";


export function withoutNulls(arr:Array<VirtualNode>) {
  return arr.filter((item) => item != null)
}

export const mapTextNodes = (arr: VirtualNode[]) => arr.map((item) => {
  if (typeof item === 'string') {
    return {
      type: DOM_TYPES.TEXT,
      value: item,
    }
  }
  return item;
})