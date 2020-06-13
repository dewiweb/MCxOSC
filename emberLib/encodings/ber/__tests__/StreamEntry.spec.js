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
const StreamEntry_1 = require("../encoder/StreamEntry");
const StreamEntry_2 = require("../decoder/StreamEntry");
const Parameter_1 = require("../../../model/Parameter");
const types_1 = require("../../../types/types");
const DecodeResult_1 = require("../decoder/DecodeResult");
describe('encodings/ber/StreamEntry', () => {
    test('write and read stream entry - integer', () => {
        const se = types_1.literal({
            identifier: 42,
            value: { type: Parameter_1.ParameterType.Integer, value: 42 }
        });
        const writer = new Ber.Writer();
        StreamEntry_1.encodeStreamEntry(se, writer);
        console.log(writer.buffer);
        const reader = new Ber.Reader(writer.buffer);
        const decoded = DecodeResult_1.guarded(StreamEntry_2.decodeStreamEntry(reader));
        expect(decoded).toEqual(se);
    });
    test('write and read stream entry - real', () => {
        const se = types_1.literal({
            identifier: 43,
            value: { type: Parameter_1.ParameterType.Real, value: 42.3 }
        });
        const writer = new Ber.Writer();
        StreamEntry_1.encodeStreamEntry(se, writer);
        console.log(writer.buffer);
        const reader = new Ber.Reader(writer.buffer);
        const decoded = DecodeResult_1.guarded(StreamEntry_2.decodeStreamEntry(reader));
        expect(decoded).toEqual(se);
    });
    test('write and read stream entry - string', () => {
        const se = types_1.literal({
            identifier: 42,
            value: { type: Parameter_1.ParameterType.String, value: 'roundtrip stream entry' }
        });
        const writer = new Ber.Writer();
        StreamEntry_1.encodeStreamEntry(se, writer);
        console.log(writer.buffer);
        const reader = new Ber.Reader(writer.buffer);
        const decoded = DecodeResult_1.guarded(StreamEntry_2.decodeStreamEntry(reader));
        expect(decoded).toEqual(se);
    });
    test('write and read stream entry - false', () => {
        const se = types_1.literal({
            identifier: 42,
            value: { type: Parameter_1.ParameterType.Boolean, value: false }
        });
        const writer = new Ber.Writer();
        StreamEntry_1.encodeStreamEntry(se, writer);
        console.log(writer.buffer);
        const reader = new Ber.Reader(writer.buffer);
        const decoded = DecodeResult_1.guarded(StreamEntry_2.decodeStreamEntry(reader));
        expect(decoded).toEqual(se);
    });
    test('write and read stream entry - true', () => {
        const se = types_1.literal({
            identifier: 42,
            value: { type: Parameter_1.ParameterType.Boolean, value: true }
        });
        const writer = new Ber.Writer();
        StreamEntry_1.encodeStreamEntry(se, writer);
        console.log(writer.buffer);
        const reader = new Ber.Reader(writer.buffer);
        const decoded = DecodeResult_1.guarded(StreamEntry_2.decodeStreamEntry(reader));
        expect(decoded).toEqual(se);
    });
    test('write and read stream entry - octets', () => {
        const se = types_1.literal({
            identifier: 42,
            value: { type: Parameter_1.ParameterType.Octets, value: Buffer.from('roundtrip a buffer') }
        });
        const writer = new Ber.Writer();
        StreamEntry_1.encodeStreamEntry(se, writer);
        console.log(writer.buffer);
        const reader = new Ber.Reader(writer.buffer);
        const decoded = DecodeResult_1.guarded(StreamEntry_2.decodeStreamEntry(reader));
        expect(decoded).toEqual(se);
    });
    test('write and read stream entry - empty buffer', () => {
        const se = types_1.literal({
            identifier: 42,
            value: { type: Parameter_1.ParameterType.Octets, value: Buffer.alloc(0) }
        });
        const writer = new Ber.Writer();
        StreamEntry_1.encodeStreamEntry(se, writer);
        console.log(writer.buffer);
        const reader = new Ber.Reader(writer.buffer);
        const decoded = DecodeResult_1.guarded(StreamEntry_2.decodeStreamEntry(reader));
        expect(decoded).toEqual(se);
    });
    test('write and read stream entry - null', () => {
        const se = types_1.literal({
            identifier: 42,
            value: { type: Parameter_1.ParameterType.Null, value: null }
        });
        const writer = new Ber.Writer();
        StreamEntry_1.encodeStreamEntry(se, writer);
        console.log(writer.buffer);
        const reader = new Ber.Reader(writer.buffer);
        const decoded = DecodeResult_1.guarded(StreamEntry_2.decodeStreamEntry(reader));
        expect(decoded).toEqual(se);
    });
});
