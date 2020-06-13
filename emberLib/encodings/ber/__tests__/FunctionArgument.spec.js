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
const FunctionArgument_1 = require("../encoder/FunctionArgument");
const FunctionArgument_2 = require("../decoder/FunctionArgument");
const Parameter_1 = require("../../../model/Parameter");
const types_1 = require("../../../types/types");
const DecodeResult_1 = require("../decoder/DecodeResult");
describe('encoders/ber/FunctionArgument', () => {
    const fa = types_1.literal({
        type: Parameter_1.ParameterType.String,
        name: 'fred'
    });
    test('write and read function argument', () => {
        const writer = new Ber.Writer();
        FunctionArgument_1.encodeFunctionArgument(fa, writer);
        console.log(writer.buffer);
        const reader = new Ber.Reader(writer.buffer);
        const decoded = DecodeResult_1.guarded(FunctionArgument_2.decodeFunctionArgument(reader));
        expect(decoded).toEqual(fa);
    });
    test('write and read function argument', () => {
        const noName = types_1.literal({
            type: Parameter_1.ParameterType.Boolean
        });
        const writer = new Ber.Writer();
        FunctionArgument_1.encodeFunctionArgument(noName, writer);
        console.log(writer.buffer);
        const reader = new Ber.Reader(writer.buffer);
        const decoded = DecodeResult_1.guarded(FunctionArgument_2.decodeFunctionArgument(reader));
        expect(decoded).toEqual(noName);
    });
});
