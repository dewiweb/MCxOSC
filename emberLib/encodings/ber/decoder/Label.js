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
exports.decodeLabel = void 0;
const Ber = __importStar(require("../../../Ber"));
const Label_1 = require("../../../model/Label");
const constants_1 = require("../constants");
const DecodeResult_1 = require("./DecodeResult");
function decodeLabel(reader, options = DecodeResult_1.defaultDecode) {
    reader.readSequence(constants_1.LabelBERID);
    let basePath = null;
    let description = null;
    const errors = [];
    const endOffset = reader.offset + reader.length;
    while (reader.offset < endOffset) {
        const tag = reader.readSequence();
        switch (tag) {
            case Ber.CONTEXT(0):
                basePath = reader.readRelativeOID(Ber.BERDataTypes.RELATIVE_OID);
                break;
            case Ber.CONTEXT(1):
                description = reader.readString(Ber.BERDataTypes.STRING);
                break;
            case 0:
                break; // indefinite length
            default:
                DecodeResult_1.unknownContext(errors, 'decode label', tag, options);
                DecodeResult_1.skipNext(reader);
                break;
        }
    }
    basePath = DecodeResult_1.check(basePath, 'decode label', 'basePath', '', errors, options);
    description = DecodeResult_1.check(description, 'decode label', 'description', '', errors, options);
    return DecodeResult_1.makeResult(new Label_1.LabelImpl(basePath, description), errors);
}
exports.decodeLabel = decodeLabel;
