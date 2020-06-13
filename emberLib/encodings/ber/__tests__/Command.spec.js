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
const Command_1 = require("../../../model/Command");
const Command_2 = require("../encoder/Command");
const Command_3 = require("../decoder/Command");
const EmberElement_1 = require("../../../model/EmberElement");
const DecodeResult_1 = require("../decoder/DecodeResult");
describe('encodings/ber/Command', () => {
    function testCommand(command) {
        const writer = new Ber.Writer();
        Command_2.encodeCommand(command, writer);
        console.log(writer.buffer);
        const reader = new Ber.Reader(writer.buffer);
        const decoded = DecodeResult_1.guarded(Command_3.decodeCommand(reader));
        expect(decoded).toEqual(command);
    }
    test('Subscribe', () => {
        const command = {
            type: EmberElement_1.ElementType.Command,
            number: Command_1.CommandType.Subscribe
        };
        testCommand(command);
    });
    test('Unsubscribe', () => {
        const command = {
            type: EmberElement_1.ElementType.Command,
            number: Command_1.CommandType.Unsubscribe
        };
        testCommand(command);
    });
    test('GetDirectory', () => {
        const command = {
            type: EmberElement_1.ElementType.Command,
            number: Command_1.CommandType.GetDirectory,
            dirFieldMask: Command_1.FieldFlags.All
        };
        testCommand(command);
    });
    test('Invoke', () => {
        const command = {
            type: EmberElement_1.ElementType.Command,
            number: Command_1.CommandType.Invoke,
            invocation: { args: [] }
        };
        testCommand(command);
    });
});
