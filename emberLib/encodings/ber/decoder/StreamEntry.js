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
exports.decodeStreamEntries = exports.decodeStreamEntry = void 0;
const Ber = __importStar(require("../../../Ber"));
const StreamEntry_1 = require("../../../model/StreamEntry");
const types_1 = require("../../../types/types");
const constants_1 = require("../constants");
const DecodeResult_1 = require("./DecodeResult");
const Parameter_1 = require("../../../model/Parameter");
function decodeStreamEntries(reader, options = DecodeResult_1.defaultDecode) {
    reader.readSequence(constants_1.StreamEntriesBERID);
    const streamEntries = DecodeResult_1.makeResult([]);
    const endOffset = reader.offset + reader.length;
    while (reader.offset < endOffset) {
        const tag = reader.readSequence();
        if (tag === 0)
            continue;
        if (tag !== Ber.CONTEXT(0)) {
            DecodeResult_1.unknownContext(streamEntries, 'decode stream entries', tag, options);
            DecodeResult_1.skipNext(reader);
            continue;
        }
        const rootEl = decodeStreamEntry(reader);
        DecodeResult_1.safeSet(rootEl, streamEntries, (x, y) => {
            y.push(x);
            return y;
        });
    }
    return streamEntries;
}
exports.decodeStreamEntries = decodeStreamEntries;
function decodeStreamEntry(reader, options = DecodeResult_1.defaultDecode) {
    reader.readSequence(constants_1.StreamEntryBERID);
    let identifier = null;
    let value = null;
    const errors = [];
    const endOffset = reader.offset + reader.length;
    while (reader.offset < endOffset) {
        const tag = reader.readSequence();
        switch (tag) {
            case Ber.CONTEXT(0):
                identifier = reader.readInt();
                break;
            case Ber.CONTEXT(1):
                value = reader.readValue();
                break;
            case 0:
                break; // indefinite length
            default:
                DecodeResult_1.unknownContext(errors, 'decode stream entry', tag, options);
                DecodeResult_1.skipNext(reader);
                break;
        }
    }
    identifier = DecodeResult_1.check(identifier, 'decode stream entry', 'identifier', 0, errors, options);
    value = DecodeResult_1.check(value, 'decode stream entry', 'value', types_1.literal({ value: null, type: Parameter_1.ParameterType.Null }), errors, options);
    return DecodeResult_1.makeResult(new StreamEntry_1.StreamEntryImpl(identifier, value), errors);
}
exports.decodeStreamEntry = decodeStreamEntry;
