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
exports.encodeNode = void 0;
const Ber = __importStar(require("../../../Ber"));
function encodeNode(node, writer) {
    writer.startSequence(Ber.BERDataTypes.SET);
    if (node.identifier != null) {
        writer.startSequence(Ber.CONTEXT(0));
        writer.writeString(node.identifier, Ber.BERDataTypes.STRING);
        writer.endSequence(); // Ber.CONTEXT(0)
    }
    if (node.description != null) {
        writer.startSequence(Ber.CONTEXT(1));
        writer.writeString(node.description, Ber.BERDataTypes.STRING);
        writer.endSequence(); // Ber.CONTEXT(1)
    }
    if (node.isRoot != null) {
        writer.startSequence(Ber.CONTEXT(2));
        writer.writeBoolean(node.isRoot);
        writer.endSequence(); // Ber.CONTEXT(2)
    }
    if (node.isOnline != null) {
        writer.startSequence(Ber.CONTEXT(3));
        writer.writeBoolean(node.isOnline);
        writer.endSequence(); // Ber.CONTEXT(3)
    }
    if (node.schemaIdentifiers != null) {
        writer.startSequence(Ber.CONTEXT(4));
        writer.writeString(node.schemaIdentifiers, Ber.BERDataTypes.STRING);
        writer.endSequence(); // Ber.CONTEXT(4)
    }
    if (node.templateReference != null) {
        writer.startSequence(Ber.CONTEXT(5));
        writer.writeRelativeOID(node.templateReference, Ber.BERDataTypes.RELATIVE_OID);
        writer.endSequence(); // Ber.CONTEXT(3)
    }
    writer.endSequence(); // Ber.BERDataTypes.SET
}
exports.encodeNode = encodeNode;
