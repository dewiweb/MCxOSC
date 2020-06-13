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
exports.decodeNode = void 0;
const Ber = __importStar(require("../../../Ber"));
const EmberNode_1 = require("../../../model/EmberNode");
const DecodeResult_1 = require("./DecodeResult");
function decodeNode(reader, options = DecodeResult_1.defaultDecode) {
    reader.readSequence(Ber.BERDataTypes.SET);
    let identifier = undefined;
    let description = undefined;
    let isRoot = undefined;
    let isOnline = undefined;
    let schemaIdentifiers = undefined;
    let templateReference = undefined;
    const errors = [];
    const endOffset = reader.offset + reader.length;
    while (reader.offset < endOffset) {
        const tag = reader.readSequence();
        switch (tag) {
            case Ber.CONTEXT(0):
                identifier = reader.readString(Ber.BERDataTypes.STRING);
                break;
            case Ber.CONTEXT(1):
                description = reader.readString(Ber.BERDataTypes.STRING);
                break;
            case Ber.CONTEXT(2):
                isRoot = reader.readBoolean();
                break;
            case Ber.CONTEXT(3):
                isOnline = reader.readBoolean();
                break;
            case Ber.CONTEXT(4):
                schemaIdentifiers = reader.readString(Ber.BERDataTypes.STRING);
                break;
            case Ber.CONTEXT(5):
                templateReference = reader.readRelativeOID(Ber.BERDataTypes.RELATIVE_OID);
                break;
            case 0:
                break; // indefinite length
            default:
                DecodeResult_1.unknownContext(errors, 'deocde node', tag, options);
                DecodeResult_1.skipNext(reader);
                break;
        }
    }
    return DecodeResult_1.makeResult(new EmberNode_1.EmberNodeImpl(identifier, description, isRoot, isOnline, schemaIdentifiers, templateReference), errors);
}
exports.decodeNode = decodeNode;
