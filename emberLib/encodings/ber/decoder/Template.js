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
exports.decodeTemplate = void 0;
const Ber = __importStar(require("../../../Ber"));
const Template_1 = require("../../../model/Template");
const constants_1 = require("../constants");
const Tree_1 = require("./Tree");
const Tree_2 = require("../../../model/Tree");
const DecodeResult_1 = require("./DecodeResult");
function decodeTemplate(reader, isQualified = false, options = DecodeResult_1.defaultDecode) {
    reader.readSequence(isQualified ? constants_1.QualifiedTemplateBERID : constants_1.TemplateBERID);
    let number = null;
    let path = null;
    let element = undefined;
    let description = undefined;
    const errors = [];
    const endOffset = reader.offset + reader.length;
    while (reader.offset < endOffset) {
        const tag = reader.readSequence();
        switch (tag) {
            case Ber.CONTEXT(0):
                if (isQualified) {
                    path = reader.readRelativeOID();
                }
                else {
                    number = reader.readInt();
                }
                break;
            case Ber.CONTEXT(1):
                element = DecodeResult_1.appendErrors(Tree_1.decodeGenericElement(reader, options), errors);
                break;
            case Ber.CONTEXT(2):
                description = reader.readString(Ber.BERDataTypes.STRING);
                break;
            case 0:
                break; // indefinite length
            default:
                DecodeResult_1.unknownContext(errors, 'decode template', tag, options);
                DecodeResult_1.skipNext(reader);
                break;
        }
    }
    if (isQualified) {
        path = DecodeResult_1.check(path, 'decode template', 'path', '', errors, options);
        return DecodeResult_1.makeResult(new Tree_2.QualifiedElementImpl(path, new Template_1.TemplateImpl(element, description)), errors);
    }
    else {
        number = DecodeResult_1.check(number, 'decode tempalte', 'number', -1, errors, options);
        return DecodeResult_1.makeResult(new Tree_2.NumberedTreeNodeImpl(number, new Template_1.TemplateImpl(element, description)), errors);
    }
}
exports.decodeTemplate = decodeTemplate;
