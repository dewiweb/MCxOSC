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
const Connection_1 = require("../../../model/Connection");
const Connection_2 = require("../encoder/Connection");
const Connection_3 = require("../decoder/Connection");
const types_1 = require("../../../types/types");
const DecodeResult_1 = require("../decoder/DecodeResult");
describe('encodings/ber/Connection', () => {
    const connection = types_1.literal({
        target: 42,
        sources: [89, 98],
        operation: Connection_1.ConnectionOperation.Connect,
        disposition: Connection_1.ConnectionDisposition.Tally
    });
    test('write and read a connection', () => {
        const writer = new Ber.Writer();
        Connection_2.encodeConnection(connection, writer);
        console.log(writer.buffer);
        const reader = new Ber.Reader(writer.buffer);
        const decoded = DecodeResult_1.guarded(Connection_3.decodeConnection(reader));
        expect(decoded).toEqual(connection);
    });
    test('write and read a connection - minimal', () => {
        const minCon = { target: 42 };
        const writer = new Ber.Writer();
        Connection_2.encodeConnection(minCon, writer);
        console.log(writer.buffer);
        const reader = new Ber.Reader(writer.buffer);
        const decoded = DecodeResult_1.guarded(Connection_3.decodeConnection(reader));
        expect(decoded).toEqual(minCon);
    });
});
