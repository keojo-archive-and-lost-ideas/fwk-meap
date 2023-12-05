var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Dispatcher_subs, _Dispatcher_afterHandlers;
export class Dispatcher {
    constructor() {
        _Dispatcher_subs.set(this, new Map());
        _Dispatcher_afterHandlers.set(this, []);
    }
    subscribe(commandName, handler) {
        if (!__classPrivateFieldGet(this, _Dispatcher_subs, "f").has(commandName)) {
            __classPrivateFieldGet(this, _Dispatcher_subs, "f").set(commandName, []);
        }
        const handlers = __classPrivateFieldGet(this, _Dispatcher_subs, "f").get(commandName);
        if (handlers === null || handlers === void 0 ? void 0 : handlers.includes(handler)) {
            return () => { };
        }
        handlers === null || handlers === void 0 ? void 0 : handlers.push(handler);
        return () => {
            const idx = handlers === null || handlers === void 0 ? void 0 : handlers.indexOf(handler);
            handlers === null || handlers === void 0 ? void 0 : handlers.splice(idx, 1);
        };
    }
    ;
    afterEveryCommand(handler) {
        __classPrivateFieldGet(this, _Dispatcher_afterHandlers, "f").push(handler);
        return () => {
            const idx = __classPrivateFieldGet(this, _Dispatcher_afterHandlers, "f").indexOf(handler);
            __classPrivateFieldGet(this, _Dispatcher_afterHandlers, "f").splice(idx, 1);
        };
    }
    dispatch(commandName, payload) {
        if (__classPrivateFieldGet(this, _Dispatcher_subs, "f").has(commandName)) {
            __classPrivateFieldGet(this, _Dispatcher_subs, "f").get(commandName).forEach((handler) => handler(payload));
        }
        else {
            console.warn(`No handlers for command: ${commandName}`);
        }
        __classPrivateFieldGet(this, _Dispatcher_afterHandlers, "f").forEach(handler => handler());
    }
    getHandlers(commandName) {
        return __classPrivateFieldGet(this, _Dispatcher_subs, "f").get(commandName);
    }
    getAfterHandlers() {
        return __classPrivateFieldGet(this, _Dispatcher_afterHandlers, "f");
    }
}
_Dispatcher_subs = new WeakMap(), _Dispatcher_afterHandlers = new WeakMap();
