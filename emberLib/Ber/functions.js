"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNIVERSAL = exports.CONTEXT = exports.APPLICATION = void 0;
/**  ITU-TX.690 (08/2015) 8.1.2 */
function APPLICATION(x) {
    return x | 0x60;
}
exports.APPLICATION = APPLICATION;
function CONTEXT(x) {
    return x | 0xa0;
}
exports.CONTEXT = CONTEXT;
function UNIVERSAL(x) {
    return x;
}
exports.UNIVERSAL = UNIVERSAL;
