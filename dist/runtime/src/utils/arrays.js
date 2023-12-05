import { createShadowString } from "../shadowNodes";
export function withoutNulls(arr) {
    return arr.filter((item) => item != null);
}
export const mapTextNodes = (arr) => arr.map((item) => {
    if (typeof item === 'string' || typeof item === 'number') {
        return createShadowString(`${item}`);
    }
    return item;
});
