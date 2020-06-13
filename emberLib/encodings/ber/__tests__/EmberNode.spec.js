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
const EmberNode_1 = require("../encoder/EmberNode");
const EmberNode_2 = require("../decoder/EmberNode");
const EmberElement_1 = require("../../../model/EmberElement");
const types_1 = require("../../../types/types");
const DecodeResult_1 = require("../decoder/DecodeResult");
const __1 = require("../");
const Tree_1 = require("../decoder/Tree");
const indefiniteLength = Buffer.from([
    0x60,
    0x80,
    0x6b,
    0x80,
    0xa0,
    0x80,
    0x6a,
    0x80,
    0xa0,
    0x03,
    0x0d,
    0x01,
    0x01,
    0xa2,
    0x80,
    0x64,
    0x80,
    0xa0,
    0x80,
    0x63,
    0x80,
    0xa0,
    0x03,
    0x02,
    0x01,
    0x01,
    0xa1,
    0x80,
    0x31,
    0x80,
    0xa0,
    0x09,
    0x0c,
    0x07,
    0x53,
    0x6f,
    0x75,
    0x72,
    0x63,
    0x65,
    0x73,
    0xa3,
    0x03,
    0x01,
    0x01,
    0xff,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00
]);
const nodeOnly = Buffer.from([
    0x63,
    0x80,
    0xa0,
    0x03,
    0x02,
    0x01,
    0x01,
    0xa1,
    0x80,
    0x31,
    0x80,
    0xa0,
    0x09,
    0x0c,
    0x07,
    0x53,
    0x6f,
    0x75,
    0x72,
    0x63,
    0x65,
    0x73,
    0xa3,
    0x03,
    0x01,
    0x01,
    0xff,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00
]);
describe('encodings/ber/EmberNode', () => {
    const en = types_1.literal({
        type: EmberElement_1.ElementType.Node,
        identifier: 'Nodey',
        description: 'Call me nodey',
        isRoot: false,
        isOnline: true,
        schemaIdentifiers: `I'm a schema identifier\nand I'm OK`,
        templateReference: '3.2.1.2'
    });
    test('write and read a node', () => {
        const writer = new Ber.Writer();
        EmberNode_1.encodeNode(en, writer);
        console.log(writer.buffer);
        const reader = new Ber.Reader(writer.buffer);
        const decoded = DecodeResult_1.guarded(EmberNode_2.decodeNode(reader));
        expect(decoded).toEqual(en);
    });
    test('decode indefinite length', () => {
        const decoded = __1.berDecode(indefiniteLength);
        console.log(decoded.value);
        expect(decoded.errors).toHaveLength(0);
    });
    test('decode indefinite node only', () => {
        const reader = new Ber.Reader(nodeOnly);
        const decoded = Tree_1.decodeGenericElement(reader);
        console.log(decoded.value);
        expect(decoded.errors).toHaveLength(0);
    });
});
