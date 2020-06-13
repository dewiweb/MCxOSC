"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmberElement = exports.ElementType = void 0;
/** Type specifyer for ember elements. */
var ElementType;
(function (ElementType) {
    ElementType["Parameter"] = "PARAMETER";
    ElementType["Node"] = "NODE";
    ElementType["Command"] = "COMMAND";
    ElementType["Matrix"] = "MATRIX";
    ElementType["Function"] = "FUNCTION";
    ElementType["Template"] = "TEMPLATE";
})(ElementType || (ElementType = {}));
exports.ElementType = ElementType;
function isEmberElement(obj) {
    if (obj === undefined || obj === null) {
        return false;
    }
    const { type } = obj;
    if (!type || !Object.values(ElementType).includes(type)) {
        return false;
    }
    return true;
}
exports.isEmberElement = isEmberElement;
