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
exports.encodeStringIntegerCollection = void 0;
const Ber = __importStar(require("../../../Ber"));
const constants_1 = require("../constants");
function encodeStringIntegerCollection(collection, writer) {
    writer.startSequence(constants_1.StringIntegerCollectionBERID);
    for (const [key, value] of collection) {
        writer.startSequence(Ber.CONTEXT(0));
        writer.startSequence(constants_1.StringIntegerPairBERID);
        writer.startSequence(Ber.CONTEXT(0));
        writer.writeString(key, Ber.BERDataTypes.STRING);
        writer.endSequence();
        writer.startSequence(Ber.CONTEXT(1));
        writer.writeInt(value);
        writer.endSequence();
        writer.endSequence();
        writer.endSequence();
    }
    writer.endSequence();
}
exports.encodeStringIntegerCollection = encodeStringIntegerCollection;
