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
const Ber = __importStar(require("../../../Ber"));
const StringIntegerCollection_1 = require("../encoder/StringIntegerCollection");
const StringIntegerCollection_2 = require("../decoder/StringIntegerCollection");
const DecodeResult_1 = require("../decoder/DecodeResult");
describe('encodings/ber/StringIntegerCollection', () => {
    const sic = new Map([
        ['first', 1],
        ['second', 2],
        ['third', 3]
    ]);
    test('write and read string integer collection - 3 values', () => {
        const writer = new Ber.Writer();
        StringIntegerCollection_1.encodeStringIntegerCollection(sic, writer);
        console.log(writer.buffer);
        const reader = new Ber.Reader(writer.buffer);
        const decoded = DecodeResult_1.guarded(StringIntegerCollection_2.decodeStringIntegerCollection(reader));
        expect(decoded).toEqual(sic);
    });
    test('write and read string integer collection - empty', () => {
        const emptySic = new Map();
        const writer = new Ber.Writer();
        StringIntegerCollection_1.encodeStringIntegerCollection(emptySic, writer);
        console.log(writer.buffer);
        const reader = new Ber.Reader(writer.buffer);
        const decoded = DecodeResult_1.guarded(StringIntegerCollection_2.decodeStringIntegerCollection(reader));
        expect(decoded).toEqual(emptySic);
    });
});
