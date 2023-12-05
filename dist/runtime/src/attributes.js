var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
export function setAttributes(element, attributes) {
    const { class: className, style } = attributes, otherAttrs = __rest(attributes, ["class", "style"]);
    if (className) {
        setClass(element, className);
    }
    if (style) {
        Object.entries(style).forEach(([prop, value]) => {
            setStyle(element, prop, value);
        });
    }
    for (const [name, value] of Object.entries(otherAttrs)) {
        setAttribute(element, name, value);
    }
}
// TODO: implement setClass
export function setClass(element, className) {
    element.className = '';
    if (typeof className === 'string') {
        element.className = className;
    }
    if (Array.isArray(className)) {
        element.classList.add(...className);
    }
}
// TODO: implement setStyle
// keyof CSSStyleDeclaration
export function setStyle(element, name, value) {
    //@ts-ignore
    element.style[name] = value;
}
export function removeStyle(element, name) {
    //@ts-ignore
    element.style[name] = '';
}
// TODO: implement setAttribute
export function setAttribute(element, name, value) {
    if (value == null) {
        removeAttribute(element, name);
    }
    else if (name.startsWith('data-')) {
        element.setAttribute(name, value);
    }
    else {
        element[name] = value;
    }
}
export function removeAttribute(element, name) {
    element[name] = null;
    element.removeAttribute(name);
}
