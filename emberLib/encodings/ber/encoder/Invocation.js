"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeInvocation = void 0;
const Ber = __importStar(require("../../../Ber"));
const constants_1 = require("../constants");
function encodeInvocation(invocation, writer) {
    writer.startSequence(constants_1.InvocationBERID);
    if (invocation.id != null) {
        writer.startSequence(Ber.CONTEXT(0));
        writer.writeInt(invocation.id);
        writer.endSequence();
    }
    writer.startSequence(Ber.CONTEXT(1));
    writer.startSequence(Ber.BERDataTypes.SEQUENCE);
    for (let i = 0; i < invocation.args.length; i++) {
        writer.startSequence(Ber.CONTEXT(0));
        writer.writeValue(invocation.args[i]);
        writer.endSequence();
    }
    writer.endSequence();
    writer.endSequence();
    writer.endSequence(); // InvocationBERID
}
exports.encodeInvocation = encodeInvocation;
