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
exports.encodeLabel = void 0;
const Ber = __importStar(require("../../../Ber"));
const Errors_1 = require("../../../Errors");
const constants_1 = require("../constants");
function encodeLabel(label, writer) {
    writer.startSequence(constants_1.LabelBERID);
    if (label.basePath == null) {
        throw new Errors_1.InvalidEmberNode('', 'Missing label base path');
    }
    writer.startSequence(Ber.CONTEXT(0));
    writer.writeRelativeOID(label.basePath, Ber.BERDataTypes.RELATIVE_OID);
    writer.endSequence();
    if (label.description == null) {
        throw new Errors_1.InvalidEmberNode('', 'Missing label description');
    }
    writer.startSequence(Ber.CONTEXT(1));
    writer.writeString(label.description, Ber.BERDataTypes.STRING);
    writer.endSequence();
    writer.endSequence();
}
exports.encodeLabel = encodeLabel;
