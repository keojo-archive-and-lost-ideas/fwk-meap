import { removeEventListeners } from './events';
import { DOM_TYPES } from './types';
const isMountedDom = (vdom) => {
    if (vdom === null || typeof vdom === "string" || Array.isArray(vdom)) {
        return false;
    }
    else {
        return true;
    }
};
export const destroyDOM = ({ vdom }) => {
    console.log('destrttoyDOM', vdom);
    if (!isMountedDom(vdom))
        return;
    const { type } = vdom;
    switch (type) {
        case DOM_TYPES.TEXT:
            removeTextNode({ node: vdom });
            break;
        case DOM_TYPES.FRAGMENT:
            removeFragmentNode({ node: vdom });
            break;
        case DOM_TYPES.ELEMENT:
            removeElementNode({ node: vdom });
            break;
        default: {
            throw new Error(`Can't destroy DOM of type: ${type}`);
        }
    }
    delete vdom.domRef;
};
export const removeTextNode = ({ node }) => {
    const { domRef } = node;
    domRef === null || domRef === void 0 ? void 0 : domRef.remove();
};
export const removeFragmentNode = ({ node }) => {
    const { children } = node;
    children.forEach((child) => destroyDOM({ vdom: child }));
};
export const removeElementNode = ({ node }) => {
    const { domRef, children, listeners } = node;
    domRef === null || domRef === void 0 ? void 0 : domRef.remove();
    children.forEach((child) => destroyDOM({ vdom: child }));
    if (listeners) {
        removeEventListeners({ element: domRef, listeners: listeners });
        delete node.listeners;
    }
};
