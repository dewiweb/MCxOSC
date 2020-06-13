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
const Invocation_1 = require("../encoder/Invocation");
const Invocation_2 = require("../decoder/Invocation");
const Parameter_1 = require("../../../model/Parameter");
const types_1 = require("../../../types/types");
const DecodeResult_1 = require("../decoder/DecodeResult");
describe('encodings/ber/Invocation', () => {
    const iv = types_1.literal({
        id: 45654,
        args: [
            { type: Parameter_1.ParameterType.Integer, value: -1 },
            { type: Parameter_1.ParameterType.Boolean, value: false },
            { type: Parameter_1.ParameterType.String, value: 'twotyfour' }
        ]
    });
    const noArgs = types_1.literal({
        id: 234,
        args: []
    });
    const noId = types_1.literal({
        args: [{ type: Parameter_1.ParameterType.Integer, value: 47 }]
    });
    test('write and read an invocation - 3 args', () => {
        const writer = new Ber.Writer();
        Invocation_1.encodeInvocation(iv, writer);
        console.log(writer.buffer);
        const reader = new Ber.Reader(writer.buffer);
        const decoded = DecodeResult_1.guarded(Invocation_2.decodeInvocation(reader));
        expect(decoded).toEqual(iv);
    });
    test('write and read an invocation - no arguments', () => {
        const writer = new Ber.Writer();
        Invocation_1.encodeInvocation(noArgs, writer);
        console.log(writer.buffer);
        const reader = new Ber.Reader(writer.buffer);
        const decoded = DecodeResult_1.guarded(Invocation_2.decodeInvocation(reader));
        expect(decoded).toEqual(noArgs);
    });
    test('write and read an invocation - no identifier', () => {
        const writer = new Ber.Writer();
        Invocation_1.encodeInvocation(noId, writer);
        console.log(writer.buffer);
        const reader = new Ber.Reader(writer.buffer);
        const decoded = DecodeResult_1.guarded(Invocation_2.decodeInvocation(reader));
        expect(decoded).toEqual(noId);
    });
});
