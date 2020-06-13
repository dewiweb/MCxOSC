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
exports.decodeConnection = void 0;
const Ber = __importStar(require("../../../Ber"));
const Connection_1 = require("../../../model/Connection");
const constants_1 = require("../constants");
const DecodeResult_1 = require("./DecodeResult");
function decodeConnection(reader, options = DecodeResult_1.defaultDecode) {
    reader.readSequence(constants_1.ConnectionBERID);
    let target = null;
    let sources = undefined;
    let operation = undefined;
    let disposition = undefined;
    let encodedSources;
    const errors = [];
    const endOffset = reader.offset + reader.length;
    while (reader.offset < endOffset) {
        const tag = reader.readSequence();
        switch (tag) {
            case Ber.CONTEXT(0):
                target = reader.readInt();
                break;
            case Ber.CONTEXT(1):
                encodedSources = reader.readRelativeOID(Ber.BERDataTypes.RELATIVE_OID);
                if (encodedSources.length === 0) {
                    sources = [];
                }
                else {
                    sources = encodedSources.split('.').map((i) => Number(i));
                }
                break;
            case Ber.CONTEXT(2):
                operation = DecodeResult_1.appendErrors(readConnectionOperation(reader.readInt(), options), errors);
                break;
            case Ber.CONTEXT(3):
                disposition = DecodeResult_1.appendErrors(readConnectionDisposition(reader.readInt(), options), errors);
                break;
            case 0:
                break; // Indefinite lengths
            default:
                DecodeResult_1.unknownContext(errors, 'decode connection', tag, options);
                DecodeResult_1.skipNext(reader);
                break;
        }
    }
    target = DecodeResult_1.check(target, 'deocde connection', 'target', -1, errors, options);
    return DecodeResult_1.makeResult(new Connection_1.ConnectionImpl(target, sources, operation, disposition), errors);
}
exports.decodeConnection = decodeConnection;
function readConnectionOperation(value, options = DecodeResult_1.defaultDecode) {
    switch (value) {
        case 0:
            return DecodeResult_1.makeResult(Connection_1.ConnectionOperation.Absolute);
        case 1:
            return DecodeResult_1.makeResult(Connection_1.ConnectionOperation.Connect);
        case 2:
            return DecodeResult_1.makeResult(Connection_1.ConnectionOperation.Disconnect);
        default:
            return DecodeResult_1.unexpected([], 'read connection options', `unexpected connection operation '${value}'`, Connection_1.ConnectionOperation.Absolute, options);
    }
}
function readConnectionDisposition(value, options = DecodeResult_1.defaultDecode) {
    switch (value) {
        case 0:
            return DecodeResult_1.makeResult(Connection_1.ConnectionDisposition.Tally);
        case 1:
            return DecodeResult_1.makeResult(Connection_1.ConnectionDisposition.Modified);
        case 2:
            return DecodeResult_1.makeResult(Connection_1.ConnectionDisposition.Pending);
        case 3:
            return DecodeResult_1.makeResult(Connection_1.ConnectionDisposition.Locked);
        default:
            return DecodeResult_1.unexpected([], 'read connection options', `unexpected connection operation '${value}'`, Connection_1.ConnectionDisposition.Tally, options);
    }
}
