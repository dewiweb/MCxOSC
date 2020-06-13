"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Writer_1 = require("../Writer");
const BERDataTypes_1 = require("../BERDataTypes");
describe('BER', () => {
    describe('Writer', () => {
        test('Real', () => {
            const w = new Writer_1.Writer();
            w.writeReal(8.32, BERDataTypes_1.BERDataTypes.REAL);
            const expected = Buffer.from([
                0x09,
                0x09,
                0x80,
                0x03,
                0x04,
                0x28,
                0xf5,
                0xc2,
                0x8f,
                0x5c,
                0x29
            ]);
            expect(w.buffer).toEqual(expected);
        });
    });
});
