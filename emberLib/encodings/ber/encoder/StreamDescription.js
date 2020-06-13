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
exports.encodeStreamDescription = void 0;
const Ber = __importStar(require("../../../Ber"));
const StreamDescription_1 = require("../../../model/StreamDescription");
const constants_1 = require("../constants");
function encodeStreamDescription(description, writer) {
    writer.startSequence(constants_1.StreamDescriptionBERID);
    writer.writeIfDefined(description.format && formatToInt(description.format), writer.writeInt, 0, Ber.BERDataTypes.INTEGER);
    writer.writeIfDefined(description.offset, writer.writeInt, 1, Ber.BERDataTypes.INTEGER);
    writer.endSequence();
}
exports.encodeStreamDescription = encodeStreamDescription;
function formatToInt(format) {
    const formatToInt = {
        [StreamDescription_1.StreamFormat.UInt8]: 0,
        [StreamDescription_1.StreamFormat.UInt16BE]: 2,
        [StreamDescription_1.StreamFormat.UInt16LE]: 3,
        [StreamDescription_1.StreamFormat.UInt32BE]: 4,
        [StreamDescription_1.StreamFormat.UInt32LE]: 5,
        [StreamDescription_1.StreamFormat.UInt64BE]: 6,
        [StreamDescription_1.StreamFormat.UInt64LE]: 7,
        [StreamDescription_1.StreamFormat.Int8]: 8,
        [StreamDescription_1.StreamFormat.Int16BE]: 10,
        [StreamDescription_1.StreamFormat.Int16LE]: 11,
        [StreamDescription_1.StreamFormat.Int32BE]: 12,
        [StreamDescription_1.StreamFormat.Int32LE]: 13,
        [StreamDescription_1.StreamFormat.Int64BE]: 14,
        [StreamDescription_1.StreamFormat.Int64LE]: 15,
        [StreamDescription_1.StreamFormat.Float32BE]: 20,
        [StreamDescription_1.StreamFormat.Float32LE]: 21,
        [StreamDescription_1.StreamFormat.Float64BE]: 22,
        [StreamDescription_1.StreamFormat.Float64LE]: 23
    };
    return formatToInt[format];
}
