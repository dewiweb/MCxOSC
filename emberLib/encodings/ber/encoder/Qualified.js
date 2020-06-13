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
exports.encodeQualifedElement = void 0;
const Ber = __importStar(require("../../../Ber"));
const EmberElement_1 = require("../../../model/EmberElement");
const Tree_1 = require("./Tree");
const constants_1 = require("../constants");
// note, this no longer encodes a full element, only the start
function encodeQualifedElement(el, writer) {
    switch (el.contents.type) {
        case EmberElement_1.ElementType.Function:
            writer.startSequence(constants_1.QualifiedFunctionBERID);
            break;
        case EmberElement_1.ElementType.Matrix:
            writer.startSequence(constants_1.QualifiedMatrixBERID);
            break;
        case EmberElement_1.ElementType.Node:
            writer.startSequence(constants_1.QualifiedNodeBERID);
            break;
        case EmberElement_1.ElementType.Parameter:
            writer.startSequence(constants_1.QualifiedParameterBERID);
            break;
        case EmberElement_1.ElementType.Template:
            writer.startSequence(constants_1.QualifiedTemplateBERID);
            break;
    }
    writer.startSequence(Ber.CONTEXT(0));
    writer.writeRelativeOID(el.path, Ber.BERDataTypes.RELATIVE_OID);
    writer.endSequence();
    Tree_1.encodeTree(el, writer);
}
exports.encodeQualifedElement = encodeQualifedElement;
