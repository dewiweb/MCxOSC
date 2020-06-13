"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.literal = exports.RootType = void 0;
var RootType;
(function (RootType) {
    RootType[RootType["Elements"] = 0] = "Elements";
    RootType[RootType["Streams"] = 1] = "Streams";
    RootType[RootType["InvocationResult"] = 2] = "InvocationResult";
})(RootType || (RootType = {}));
exports.RootType = RootType;
function literal(arg) {
    return arg;
}
exports.literal = literal;
