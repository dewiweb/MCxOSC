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
const InvocationResult_1 = require("../encoder/InvocationResult");
const InvocationResult_2 = require("../decoder/InvocationResult");
const Parameter_1 = require("../../../model/Parameter");
const types_1 = require("../../../types/types");
const DecodeResult_1 = require("../decoder/DecodeResult");
describe('encodings/ber/InvocationResult', () => {
    const ir = types_1.literal({
        id: 42,
        success: true,
        result: [
            { type: Parameter_1.ParameterType.String, value: 'fortytwo' },
            { type: Parameter_1.ParameterType.Real, value: 42.1 }
        ]
    });
    const voidRes = types_1.literal({
        id: 987654,
        success: true
    });
    test('write and read invocation result', () => {
        const writer = new Ber.Writer();
        InvocationResult_1.encodeInvocationResult(ir, writer);
        console.log(writer.buffer);
        const reader = new Ber.Reader(writer.buffer);
        const decoded = DecodeResult_1.guarded(InvocationResult_2.decodeInvocationResult(reader));
        expect(decoded).toEqual(ir);
    });
    test('write and read invocation result - void return', () => {
        const writer = new Ber.Writer();
        InvocationResult_1.encodeInvocationResult(voidRes, writer);
        console.log(writer.buffer);
        const reader = new Ber.Reader(writer.buffer);
        const decoded = DecodeResult_1.guarded(InvocationResult_2.decodeInvocationResult(reader));
        expect(decoded).toEqual(voidRes);
    });
    // Note: Using an empty array result is encoded the same as no array
    test('write and read invocation result - empty result', () => {
        const writer = new Ber.Writer();
        InvocationResult_1.encodeInvocationResult({ id: voidRes.id, success: true, result: [] }, writer);
        console.log(writer.buffer);
        const reader = new Ber.Reader(writer.buffer);
        const decoded = DecodeResult_1.guarded(InvocationResult_2.decodeInvocationResult(reader));
        expect(decoded).toEqual(voidRes);
    });
});
