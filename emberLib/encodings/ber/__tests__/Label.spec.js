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
const Label_1 = require("../encoder/Label");
const Label_2 = require("../decoder/Label");
const types_1 = require("../../../types/types");
const DecodeResult_1 = require("../decoder/DecodeResult");
describe('encodings/ber/Label', () => {
    const lbl = types_1.literal({
        basePath: '1.1.2.1.3',
        description: 'Oh what a lovely button'
    });
    test('write and read a label', () => {
        const writer = new Ber.Writer();
        Label_1.encodeLabel(lbl, writer);
        console.log(writer.buffer);
        const reader = new Ber.Reader(writer.buffer);
        const decoded = DecodeResult_1.guarded(Label_2.decodeLabel(reader));
        expect(decoded).toEqual(lbl);
    });
    test('write and read a label without description', () => {
        const writer = new Ber.Writer();
        const badLabel = { basePath: '5.4.3.2.1', description: '' };
        Label_1.encodeLabel(badLabel, writer);
        const badBuffer = writer.buffer.slice(0, writer.buffer.length - 4);
        badBuffer[1] = badBuffer[1] - 4;
        const reader = new Ber.Reader(badBuffer);
        const decoded = Label_2.decodeLabel(reader);
        expect(decoded.value).toEqual(badLabel);
        expect(decoded.errors).toHaveLength(1);
    });
    test('write and read a label with unknown context', () => {
        const writer = new Ber.Writer();
        Label_1.encodeLabel(lbl, writer);
        writer.buffer[11] = Ber.CONTEXT(13);
        const reader = new Ber.Reader(writer.buffer);
        const decoded = Label_2.decodeLabel(reader);
        expect(decoded.value).toEqual(types_1.literal({ basePath: lbl.basePath, description: '' }));
        expect(decoded.errors).toHaveLength(2);
    });
});
