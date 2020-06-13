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
exports.decodeInvocationResult = void 0;
const Ber = __importStar(require("../../../Ber"));
const InvocationResult_1 = require("../../../model/InvocationResult");
const constants_1 = require("../constants");
const DecodeResult_1 = require("./DecodeResult");
function decodeInvocationResult(reader, options = DecodeResult_1.defaultDecode) {
    reader.readSequence(constants_1.InvocationResultBERID);
    let id = null;
    let success = undefined;
    let result = undefined;
    let seqOffset;
    const errors = [];
    const endOffset = reader.offset + reader.length;
    while (reader.offset < endOffset) {
        const tag = reader.readSequence();
        switch (tag) {
            case Ber.CONTEXT(0):
                id = reader.readInt();
                break;
            case Ber.CONTEXT(1):
                success = reader.readBoolean();
                break;
            case Ber.CONTEXT(2):
                result = [];
                reader.readSequence(Ber.BERDataTypes.SEQUENCE);
                seqOffset = reader.offset + reader.length;
                while (reader.offset < seqOffset) {
                    const resTag = reader.readSequence();
                    if (resTag === 0)
                        continue;
                    if (resTag === null || resTag !== Ber.CONTEXT(0)) {
                        DecodeResult_1.unknownContext(errors, 'decode invocation result: result', resTag, options);
                        DecodeResult_1.skipNext(reader);
                        continue;
                    }
                    result.push(reader.readValue());
                }
                break;
            case 0:
                break; // indefinite length
            default:
                DecodeResult_1.unknownContext(errors, 'decode invocation result', tag, options);
                DecodeResult_1.skipNext(reader);
                break;
        }
    }
    id = DecodeResult_1.check(id, 'decode invocation result', 'id', -1, errors, options);
    return DecodeResult_1.makeResult(new InvocationResult_1.InvocationResultImpl(id, success, result), errors);
}
exports.decodeInvocationResult = decodeInvocationResult;
