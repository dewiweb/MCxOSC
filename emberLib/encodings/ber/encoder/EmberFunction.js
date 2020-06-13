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
exports.encodeFunction = void 0;
const Ber = __importStar(require("../../../Ber"));
const FunctionArgument_1 = require("./FunctionArgument");
function encodeFunction(el, writer) {
    // The function itself is a node, and then the contents are another node I think. This just encodes the contents:
    writer.startSequence(Ber.BERDataTypes.SET);
    if (el.identifier != null) {
        writer.startSequence(Ber.CONTEXT(0));
        writer.writeString(el.identifier, Ber.BERDataTypes.STRING);
        writer.endSequence(); // Ber.CONTEXT(0)
    }
    if (el.description != null) {
        writer.startSequence(Ber.CONTEXT(1));
        writer.writeString(el.description, Ber.BERDataTypes.STRING);
        writer.endSequence(); // Ber.CONTEXT(1)
    }
    if (el.args != null) {
        writer.startSequence(Ber.CONTEXT(2));
        writer.startSequence(Ber.BERDataTypes.SEQUENCE);
        for (let i = 0; i < el.args.length; i++) {
            writer.startSequence(Ber.CONTEXT(0));
            FunctionArgument_1.encodeFunctionArgument(el.args[i], writer);
            writer.endSequence();
        }
        writer.endSequence();
        writer.endSequence(); // Ber.CONTEXT(2)
    }
    if (el.result != null && el.result.length > 0) {
        writer.startSequence(Ber.CONTEXT(3));
        writer.startSequence(Ber.BERDataTypes.SEQUENCE);
        for (let i = 0; i < el.result.length; i++) {
            writer.startSequence(Ber.CONTEXT(0));
            FunctionArgument_1.encodeFunctionArgument(el.result[i], writer);
            writer.endSequence();
        }
        writer.endSequence();
        writer.endSequence(); // Ber.CONTEXT(3)
    }
    if (el.templateReference != null) {
        writer.startSequence(Ber.CONTEXT(4));
        writer.writeRelativeOID(el.templateReference, Ber.BERDataTypes.RELATIVE_OID);
        writer.endSequence(); // Ber.CONTEXT(4)
    }
    writer.endSequence(); // Ber.EMBER_SET
}
exports.encodeFunction = encodeFunction;
