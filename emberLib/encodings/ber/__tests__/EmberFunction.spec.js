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
const EmberFunction_1 = require("../../../model/EmberFunction");
const EmberFunction_2 = require("../encoder/EmberFunction");
const EmberFunction_3 = require("../decoder/EmberFunction");
const FunctionArgument_1 = require("../../../model/FunctionArgument");
const Parameter_1 = require("../../../model/Parameter");
const DecodeResult_1 = require("../decoder/DecodeResult");
describe('encodings/ber/EmberFunction', () => {
    describe('roundtrips', () => {
        function testFunction(fn) {
            const writer = new Ber.Writer();
            EmberFunction_2.encodeFunction(fn, writer);
            console.log(writer.buffer);
            const reader = new Ber.Reader(writer.buffer);
            const decoded = DecodeResult_1.guarded(EmberFunction_3.decodeFunctionContent(reader));
            expect(decoded).toEqual(fn);
        }
        test('identifier', () => {
            const fn = new EmberFunction_1.EmberFunctionImpl('identifier');
            testFunction(fn);
        });
        test('description', () => {
            const fn = new EmberFunction_1.EmberFunctionImpl();
            fn.description = 'Description of many words';
            testFunction(fn);
        });
        test('args', () => {
            const fn = new EmberFunction_1.EmberFunctionImpl('identifier');
            fn.args = [new FunctionArgument_1.FunctionArgumentImpl(Parameter_1.ParameterType.Integer, 'Arg')];
            testFunction(fn);
        });
        test('result', () => {
            const fn = new EmberFunction_1.EmberFunctionImpl('identifier');
            fn.result = [new FunctionArgument_1.FunctionArgumentImpl(Parameter_1.ParameterType.Integer, 'Result')];
            testFunction(fn);
        });
        test('templateReference', () => {
            const fn = new EmberFunction_1.EmberFunctionImpl('identifier');
            fn.templateReference = '1.2.3';
            testFunction(fn);
        });
    });
});
