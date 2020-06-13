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
exports.decodeFunctionContent = void 0;
const Ber = __importStar(require("../../../Ber"));
// import { EmberFunction, EmberFunctionImpl } from '../../../model/EmberFunction'
const EmberFunction_1 = require("../../../model/EmberFunction");
const FunctionArgument_1 = require("./FunctionArgument");
const DecodeResult_1 = require("./DecodeResult");
function decodeFunctionContent(reader, options = DecodeResult_1.defaultDecode) {
    reader.readSequence(Ber.BERDataTypes.SET);
    let identifier = undefined;
    let description = undefined;
    let args = undefined;
    let result = undefined;
    let templateReference = undefined;
    let seqOffset;
    let resOffset;
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
                args = [];
                reader.readSequence(Ber.BERDataTypes.SEQUENCE);
                seqOffset = reader.offset + reader.length;
                while (reader.offset < seqOffset) {
                    const argTag = reader.readSequence();
                    if (argTag === 0)
                        continue; // indefinite length
                    if (argTag !== Ber.CONTEXT(0)) {
                        DecodeResult_1.unknownContext(errors, 'decode function content: arguments', argTag, options);
                        DecodeResult_1.skipNext(reader);
                        continue;
                    }
                    const argEl = DecodeResult_1.appendErrors(FunctionArgument_1.decodeFunctionArgument(reader, options), errors);
                    args.push(argEl);
                }
                break;
            case Ber.CONTEXT(3):
                result = [];
                reader.readSequence(Ber.BERDataTypes.SEQUENCE);
                resOffset = reader.offset + reader.length;
                while (reader.offset < resOffset) {
                    const resTag = reader.readSequence();
                    if (resTag === 0)
                        continue; // indefinite length
                    if (resTag !== Ber.CONTEXT(0)) {
                        DecodeResult_1.unknownContext(errors, 'decode function content: result', resTag, options);
                        DecodeResult_1.skipNext(reader);
                        continue;
                    }
                    const resEl = DecodeResult_1.appendErrors(FunctionArgument_1.decodeFunctionArgument(reader, options), errors);
                    result.push(resEl);
                }
                break;
            case Ber.CONTEXT(4):
                templateReference = reader.readRelativeOID(Ber.BERDataTypes.RELATIVE_OID);
                break;
            case 0:
                break; // Idefinite length
            default:
                DecodeResult_1.unknownContext(errors, 'decode function content', tag, options);
                DecodeResult_1.skipNext(reader);
                break;
        }
    }
    return DecodeResult_1.makeResult(new EmberFunction_1.EmberFunctionImpl(identifier, description, args, result, templateReference), errors);
}
exports.decodeFunctionContent = decodeFunctionContent;
