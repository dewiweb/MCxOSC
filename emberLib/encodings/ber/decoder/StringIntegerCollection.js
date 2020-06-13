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
exports.decodeStringIntegerCollection = void 0;
const Ber = __importStar(require("../../../Ber"));
const constants_1 = require("../constants");
const DecodeResult_1 = require("./DecodeResult");
function decodeStringIntegerCollection(reader, options = DecodeResult_1.defaultDecode) {
    reader.readSequence(constants_1.StringIntegerCollectionBERID);
    const collection = new Map();
    const errors = [];
    const endOffset = reader.offset + reader.length;
    while (reader.offset < endOffset) {
        const tag = reader.readSequence();
        if (tag === 0)
            continue;
        if (tag !== Ber.CONTEXT(0)) {
            DecodeResult_1.unknownContext(errors, 'decode string integer collection', tag, options);
            DecodeResult_1.skipNext(reader);
            continue;
        }
        const pair = DecodeResult_1.appendErrors(decodeStringIntegerPair(reader, options), errors);
        collection.set(pair.key, pair.value);
    }
    return DecodeResult_1.makeResult(collection, errors);
}
exports.decodeStringIntegerCollection = decodeStringIntegerCollection;
function decodeStringIntegerPair(reader, options = DecodeResult_1.defaultDecode) {
    let key = null;
    let value = null;
    const errors = [];
    reader.readSequence(constants_1.StringIntegerPairBERID);
    const endOffset = reader.offset + reader.length;
    while (reader.offset < endOffset) {
        const tag = reader.readSequence();
        switch (tag) {
            case Ber.CONTEXT(0):
                key = reader.readString(Ber.BERDataTypes.STRING);
                break;
            case Ber.CONTEXT(1):
                value = reader.readInt();
                break;
            case 0:
                break; // indefinite length
            default:
                DecodeResult_1.unknownContext(errors, 'deocde string integer pair', tag, options);
                DecodeResult_1.skipNext(reader);
                break;
        }
    }
    key = DecodeResult_1.check(key, 'decode string integer pair', 'key', `key${(Math.random() * 1000000) | 0}`, errors, options);
    value = DecodeResult_1.check(value, 'decode string integer pair', 'value', -1, errors, options);
    return DecodeResult_1.makeResult({ key, value }, errors);
}
