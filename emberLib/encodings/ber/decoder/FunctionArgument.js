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
exports.decodeFunctionArgument = void 0;
const Ber = __importStar(require("../../../Ber"));
const FunctionArgument_1 = require("../../../model/FunctionArgument");
const Parameter_1 = require("../../../model/Parameter");
const constants_1 = require("../constants");
const Parameter_2 = require("./Parameter");
const DecodeResult_1 = require("./DecodeResult");
function decodeFunctionArgument(reader, options = DecodeResult_1.defaultDecode) {
    reader.readSequence(constants_1.FunctionArgumentBERID);
    let type = null;
    let name = undefined;
    const errors = [];
    const endOffset = reader.offset + reader.length;
    while (reader.offset < endOffset) {
        const tag = reader.readSequence();
        switch (tag) {
            case Ber.CONTEXT(0):
                type = DecodeResult_1.appendErrors(Parameter_2.readParameterType(reader.readInt(), options), errors);
                break;
            case Ber.CONTEXT(1):
                name = reader.readString(Ber.BERDataTypes.STRING);
                break;
            case 0:
                break; // indefinite length
            default:
                DecodeResult_1.unknownContext(errors, 'decode function context', tag, options);
                DecodeResult_1.skipNext(reader);
                break;
        }
    }
    type = DecodeResult_1.check(type, 'decode function argument', 'type', Parameter_1.ParameterType.Null, errors, options);
    return DecodeResult_1.makeResult(new FunctionArgument_1.FunctionArgumentImpl(type, name), errors);
}
exports.decodeFunctionArgument = decodeFunctionArgument;
