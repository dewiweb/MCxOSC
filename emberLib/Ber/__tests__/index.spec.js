"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Writer_1 = require("../Writer");
const __1 = require("..");
const Reader_1 = require("../Reader");
const Parameter_1 = require("../../model/Parameter");
describe('BER', () => {
    describe('Roundtrip', () => {
        test('writeReal - readReal', () => {
            const w = new Writer_1.Writer();
            w.writeReal(8.32, __1.BERDataTypes.REAL);
            const r = new Reader_1.Reader(w.buffer);
            const tag = r.peek();
            expect(tag).toEqual(__1.BERDataTypes.REAL);
            const s = r.readReal();
            expect(s).toEqual(8.32);
        });
        test('writeReal - readValue', () => {
            const w = new Writer_1.Writer();
            w.writeReal(8.32, __1.BERDataTypes.REAL);
            const r = new Reader_1.Reader(w.buffer);
            const tag = r.peek();
            expect(tag).toEqual(__1.BERDataTypes.REAL);
            const s = r.readValue();
            expect(s).toEqual({ value: 8.32, type: Parameter_1.ParameterType.Real });
        });
        test('writeValue - readValue', () => {
            const w = new Writer_1.Writer();
            w.writeValue({ value: 8.32, type: Parameter_1.ParameterType.Real });
            const r = new Reader_1.Reader(w.buffer);
            const tag = r.peek();
            expect(tag).toEqual(__1.BERDataTypes.REAL);
            const s = r.readValue();
            expect(s).toEqual({ value: 8.32, type: Parameter_1.ParameterType.Real });
        });
        test('writeValue - readValue (input int)', () => {
            const w = new Writer_1.Writer();
            w.writeValue({ value: 4, type: Parameter_1.ParameterType.Real });
            const r = new Reader_1.Reader(w.buffer);
            const tag = r.peek();
            expect(tag).toEqual(__1.BERDataTypes.REAL);
            const s = r.readValue();
            expect(s).toEqual({ value: 4, type: Parameter_1.ParameterType.Real });
        });
    });
});
