import { DOM_TYPES } from "../types";
export function withoutNulls(arr) {
  return arr.filter(item => item != null);
}
export const mapTextNodes = arr => arr.map(item => {
  if (typeof item === 'string') {
    return {
      type: DOM_TYPES.TEXT,
      value: item
    };
  }
  return item;
});