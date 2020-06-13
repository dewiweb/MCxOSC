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
exports.decodeStreamDescription = void 0;
const Ber = __importStar(require("../../../Ber"));
const StreamDescription_1 = require("../../../model/StreamDescription");
const constants_1 = require("../constants");
const DecodeResult_1 = require("./DecodeResult");
function decodeStreamDescription(reader, options = DecodeResult_1.defaultDecode) {
    reader.readSequence(constants_1.StreamDescriptionBERID);
    let format = null;
    let offset = null;
    const errors = [];
    const endOffset = reader.offset + reader.length;
    while (reader.offset < endOffset) {
        const tag = reader.readSequence();
        switch (tag) {
            case Ber.CONTEXT(0):
                format = DecodeResult_1.appendErrors(readStreamFormat(reader.readInt(), options), errors);
                break;
            case Ber.CONTEXT(1):
                offset = reader.readInt();
                break;
            case 0:
                break; // indefinite length
            default:
                DecodeResult_1.unknownContext(errors, 'decode stream description', tag, options);
                DecodeResult_1.skipNext(reader);
                break;
        }
    }
    format = DecodeResult_1.check(format, 'decode stream description', 'format', StreamDescription_1.StreamFormat.UInt8, errors, options);
    offset = DecodeResult_1.check(offset, 'decode stream description', 'offset', 0, errors, options);
    return DecodeResult_1.makeResult(new StreamDescription_1.StreamDescriptionImpl(format, offset), errors);
}
exports.decodeStreamDescription = decodeStreamDescription;
function readStreamFormat(value, options = DecodeResult_1.defaultDecode) {
    switch (value) {
        case 0:
            return DecodeResult_1.makeResult(StreamDescription_1.StreamFormat.UInt8);
        case 2:
            return DecodeResult_1.makeResult(StreamDescription_1.StreamFormat.UInt16BE);
        case 3:
            return DecodeResult_1.makeResult(StreamDescription_1.StreamFormat.UInt16LE);
        case 4:
            return DecodeResult_1.makeResult(StreamDescription_1.StreamFormat.UInt32BE);
        case 5:
            return DecodeResult_1.makeResult(StreamDescription_1.StreamFormat.UInt32LE);
        case 6:
            return DecodeResult_1.makeResult(StreamDescription_1.StreamFormat.UInt64BE);
        case 7:
            return DecodeResult_1.makeResult(StreamDescription_1.StreamFormat.UInt64LE);
        case 8:
            return DecodeResult_1.makeResult(StreamDescription_1.StreamFormat.Int8);
        case 10:
            return DecodeResult_1.makeResult(StreamDescription_1.StreamFormat.Int16BE);
        case 11:
            return DecodeResult_1.makeResult(StreamDescription_1.StreamFormat.Int16LE);
        case 12:
            return DecodeResult_1.makeResult(StreamDescription_1.StreamFormat.Int32BE);
        case 13:
            return DecodeResult_1.makeResult(StreamDescription_1.StreamFormat.Int32LE);
        case 14:
            return DecodeResult_1.makeResult(StreamDescription_1.StreamFormat.Int64BE);
        case 15:
            return DecodeResult_1.makeResult(StreamDescription_1.StreamFormat.Int64LE);
        case 20:
            return DecodeResult_1.makeResult(StreamDescription_1.StreamFormat.Float32BE);
        case 21:
            return DecodeResult_1.makeResult(StreamDescription_1.StreamFormat.Float32LE);
        case 22:
            return DecodeResult_1.makeResult(StreamDescription_1.StreamFormat.Float64BE);
        case 23:
            return DecodeResult_1.makeResult(StreamDescription_1.StreamFormat.Float64LE);
        default:
            return DecodeResult_1.unexpected([], 'read stream format', `unexpected stream format '${value}'`, StreamDescription_1.StreamFormat.UInt8, options);
    }
}
