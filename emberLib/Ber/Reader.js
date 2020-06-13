"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reader = void 0;
const asn1_1 = require("asn1");
const long_1 = __importDefault(require("long"));
const Errors_1 = require("../Errors");
const BERDataTypes_1 = require("./BERDataTypes");
const functions_1 = require("./functions");
const Parameter_1 = require("../model/Parameter");
class ExtendedReader extends asn1_1.Reader {
    constructor(data) {
        super(data);
    }
    // This is bad. No need to create a new reader for every tag!
    // getSequence(tag: number): ExtendedReader {
    // 	const buf = this.readString(tag, true)
    // 	return new ExtendedReader(buf)
    // }
    readValue() {
        const tag = this.peek();
        if (!tag) {
            throw new Error('No tag available');
        }
        switch (tag) {
            case BERDataTypes_1.BERDataTypes.STRING:
                return { type: Parameter_1.ParameterType.String, value: this.readString(BERDataTypes_1.BERDataTypes.STRING) };
            case BERDataTypes_1.BERDataTypes.INTEGER:
                return { type: Parameter_1.ParameterType.Integer, value: this.readInt() };
            case BERDataTypes_1.BERDataTypes.REAL:
                return { type: Parameter_1.ParameterType.Real, value: this.readReal() };
            case BERDataTypes_1.BERDataTypes.BOOLEAN:
                return { type: Parameter_1.ParameterType.Boolean, value: this.readBoolean() };
            case BERDataTypes_1.BERDataTypes.OCTETSTRING:
                return { type: Parameter_1.ParameterType.Octets, value: this.readString(functions_1.UNIVERSAL(4), true) };
            case BERDataTypes_1.BERDataTypes.RELATIVE_OID:
                return { type: Parameter_1.ParameterType.String, value: this.readOID(BERDataTypes_1.BERDataTypes.RELATIVE_OID) };
            case BERDataTypes_1.BERDataTypes.NULL: // Note: No readNull in BER library but writer writes 2 bytes
                this.readByte(false); // Read past - ASN1.NULL tag 0x05
                this.readByte(false); // and - 0x00 length
                return { type: Parameter_1.ParameterType.Null, value: null };
            default:
                throw new Errors_1.UnimplementedEmberTypeError(tag);
        }
    }
    readReal(tag) {
        if (tag !== null) {
            tag = functions_1.UNIVERSAL(9);
        }
        const b = this.peek();
        if (b === null) {
            return null;
        }
        const buf = this.readString(b, true);
        if (buf.length === 0) {
            return 0;
        }
        const preamble = buf.readUInt8(0);
        let o = 1;
        if (buf.length === 1) {
            switch (preamble) {
                case 0x40:
                    return Infinity;
                case 0x41:
                    return -Infinity;
                case 0x42:
                    return NaN;
            }
        }
        const sign = preamble & 0x40 ? -1 : 1;
        const exponentLength = 1 + (preamble & 3);
        const significandShift = (preamble >> 2) & 3;
        let exponent = 0;
        if (buf.readUInt8(o) & 0x80) {
            exponent = -1;
        }
        if (buf.length - o < exponentLength) {
            throw new Errors_1.ASN1Error('Invalid ASN.1; not enough length to contain exponent');
        }
        for (let i = 0; i < exponentLength; i++) {
            exponent = (exponent << 8) | buf.readUInt8(o++);
        }
        let significand = new long_1.default(0, 0, true);
        while (o < buf.length) {
            significand = significand.shl(8).or(buf.readUInt8(o++));
        }
        significand = significand.shl(significandShift);
        while (significand.and(long_1.default.fromBits(0x00000000, 0x7ffff000, true)).eq(0)) {
            significand = significand.shl(8);
        }
        while (significand.and(long_1.default.fromBits(0x00000000, 0x7ff00000, true)).eq(0)) {
            significand = significand.shl(1);
        }
        significand = significand.and(long_1.default.fromBits(0xffffffff, 0x000fffff, true));
        let bits = long_1.default.fromNumber(exponent).add(1023).shl(52).or(significand);
        if (sign < 0) {
            bits = bits.or(long_1.default.fromBits(0x00000000, 0x80000000, true));
        }
        const fbuf = Buffer.alloc(8);
        fbuf.writeUInt32LE(bits.getLowBitsUnsigned(), 0);
        fbuf.writeUInt32LE(bits.getHighBitsUnsigned(), 4);
        return fbuf.readDoubleLE(0);
    }
}
exports.Reader = ExtendedReader;
