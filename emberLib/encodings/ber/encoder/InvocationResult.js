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
exports.encodeInvocationResult = void 0;
const Ber = __importStar(require("../../../Ber"));
const constants_1 = require("../constants");
function encodeInvocationResult(result, writer) {
    writer.startSequence(constants_1.InvocationResultBERID);
    if (result.id != null) {
        writer.startSequence(Ber.CONTEXT(0));
        writer.writeInt(result.id);
        writer.endSequence();
    }
    if (result.success != null) {
        writer.startSequence(Ber.CONTEXT(1));
        writer.writeBoolean(result.success);
        writer.endSequence();
    }
    if (result.result != null && result.result.length) {
        writer.startSequence(Ber.CONTEXT(2));
        writer.startSequence(Ber.BERDataTypes.SEQUENCE);
        for (let i = 0; i < result.result.length; i++) {
            writer.startSequence(Ber.CONTEXT(0));
            writer.writeValue(result.result[i]);
            writer.endSequence();
        }
        writer.endSequence();
        writer.endSequence();
    }
    writer.endSequence(); // InvocationResultBERID
}
exports.encodeInvocationResult = encodeInvocationResult;
