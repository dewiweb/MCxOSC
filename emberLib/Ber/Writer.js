"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Writer = void 0;
const long_1 = __importDefault(require("long"));
const asn1_1 = require("asn1");
const functions_1 = require("./functions");
const BERDataTypes_1 = require("./BERDataTypes");
const Parameter_1 = require("../model/Parameter");
class ExtendedWriter extends asn1_1.Writer {
    constructor(options) {
        super(options);
    }
    writeReal(value, tag) {
        if (tag === undefined) {
            tag = functions_1.UNIVERSAL(9);
        }
        this.writeByte(tag);
        switch (value) {
            case 0:
                this.writeLength(0);
                return;
            case Infinity:
                this.writeLength(1);
                this.writeByte(0x40);
                return;
            case -Infinity:
                this.writeLength(1);
                this.writeByte(0x41);
                return;
            default:
                if (isNaN(value)) {
                    this.writeLength(1);
                    this.writeByte(0x42);
                    return;
                }
        }
        const fbuf = Buffer.alloc(8);
        fbuf.writeDoubleLE(value, 0);
        const bits = long_1.default.fromBits(fbuf.readUInt32LE(0), fbuf.readUInt32LE(4), true);
        let significand = bits
            .and(long_1.default.fromBits(0xffffffff, 0x000fffff, true))
            .or(long_1.default.fromBits(0x00000000, 0x00100000, true));
        let exponent = bits
            .and(long_1.default.fromBits(0x00000000, 0x7ff00000, true))
            .shru(52)
            .sub(1023)
            .toSigned();
        while (significand.and(0xff).toNumber() === 0) {
            significand = significand.shru(8);
        }
        while (significand.and(0x01).toNumber() === 0) {
            significand = significand.shru(1);
        }
        exponent = exponent.toNumber();
        const shortExp = shorten(exponent);
        const shortSig = shortenLong(significand);
        this.writeLength(1 + shortExp.size + shortSig.size);
        const preamble = value < 0 ? 0x80 | 0x40 : 0x80; // in what case will 0x80|0x40 be anything but 0xC0?
        this.writeByte(preamble);
        for (let i = 0; i < shortExp.size; i++) {
            this.writeByte((shortExp.value & 0xff000000) >> 24);
            shortExp.value <<= 8;
        }
        const mask = long_1.default.fromBits(0x00000000, 0xff000000, true);
        for (let i = 0; i < shortSig.size; i++) {
            this.writeByte(shortSig.value.and(mask).shru(56).toNumber());
            shortSig.value = shortSig.value.shl(8);
        }
    }
    writeValue(arg1, tag) {
        let value;
        if (arg1 && typeof arg1 === 'object' && 'type' in arg1) {
            value = arg1.value;
            tag = parameterTypetoBERTAG(arg1.type);
        }
        else {
            value = arg1;
        }
        if (tag === BERDataTypes_1.BERDataTypes.NULL && (value === null || value === undefined)) {
            this.writeNull();
            return;
        }
        if (value === null || value === undefined) {
            this.writeNull();
            return;
        }
        if (typeof value === 'number') {
            if (tag !== BERDataTypes_1.BERDataTypes.REAL && Number.isInteger(value)) {
                if (tag === undefined) {
                    tag = BERDataTypes_1.BERDataTypes.INTEGER;
                }
                this.writeInt(value, tag);
                return;
            }
            if (tag === undefined) {
                tag = BERDataTypes_1.BERDataTypes.REAL;
            }
            this.writeReal(value, tag);
            return;
        }
        if (typeof value == 'boolean') {
            if (tag === undefined) {
                tag = BERDataTypes_1.BERDataTypes.BOOLEAN;
            }
            this.writeBoolean(value, tag);
            return;
        }
        if (Buffer.isBuffer(value) && tag) {
            if (value.length === 0) {
                this.writeByte(tag);
                this.writeLength(0);
            }
            else {
                this.writeBuffer(value, tag);
            }
            return;
        }
        if (tag === undefined) {
            tag = BERDataTypes_1.BERDataTypes.STRING;
        }
        this.writeString(value.toString(), tag);
    }
    writeEmberParameter(value) {
        if (Parameter_1.isParameter(value)) {
            switch (value.parameterType) {
                case Parameter_1.ParameterType.Real:
                    this.writeReal(value.value, BERDataTypes_1.BERDataTypes.REAL);
                    break;
                case Parameter_1.ParameterType.Integer:
                    this.writeInt(value.value, BERDataTypes_1.BERDataTypes.INTEGER);
                    break;
                case Parameter_1.ParameterType.Boolean:
                    this.writeBoolean(value.value, BERDataTypes_1.BERDataTypes.BOOLEAN);
                    break;
                case Parameter_1.ParameterType.Octets:
                    if (!Buffer.isBuffer(value.value)) {
                        value.value = Buffer.from(`${value.value}`);
                    }
                    if (value.value.length) {
                        this.writeByte(BERDataTypes_1.BERDataTypes.OCTETSTRING);
                        this.writeLength(0);
                    }
                    else {
                        this.writeBuffer(value.value, BERDataTypes_1.BERDataTypes.OCTETSTRING);
                    }
                    break;
                case Parameter_1.ParameterType.Null:
                    this.writeNull();
                    break;
                default:
                    this.writeString(value.value, BERDataTypes_1.BERDataTypes.STRING);
            }
        }
        else {
            this.writeValue(value.value, undefined);
        }
    }
    writeIfDefined(property, writer, outer, inner) {
        if (property != null) {
            this.startSequence(functions_1.CONTEXT(outer));
            writer.call(this, property, inner);
            this.endSequence();
        }
    }
    writeIfDefinedEnum(property, type, writer, outer, inner) {
        if (property != null) {
            this.startSequence(functions_1.CONTEXT(outer));
            if (property.value != null) {
                writer.call(this, property.value, inner);
            }
            else {
                writer.call(this, type.get(property), inner);
            }
            this.endSequence();
        }
    }
}
exports.Writer = ExtendedWriter;
function shorten(value) {
    let size = 4;
    while (((value & 0xff800000) === 0 || (value & 0xff800000) === 0xff800000 >> 0) && size > 1) {
        size--;
        value <<= 8;
    }
    return { size, value };
}
function shortenLong(value) {
    const mask = long_1.default.fromBits(0x00000000, 0xff800000, true);
    value = value.toUnsigned();
    let size = 8;
    while (value.and(mask).eq(0) || (value.and(mask).eq(mask) && size > 1)) {
        size--;
        value = value.shl(8);
    }
    return { size, value };
}
function parameterTypetoBERTAG(parameterType) {
    switch (parameterType) {
        case Parameter_1.ParameterType.Integer:
            return BERDataTypes_1.BERDataTypes.INTEGER;
        case Parameter_1.ParameterType.Real:
            return BERDataTypes_1.BERDataTypes.REAL;
        case Parameter_1.ParameterType.String:
            return BERDataTypes_1.BERDataTypes.STRING;
        case Parameter_1.ParameterType.Boolean:
            return BERDataTypes_1.BERDataTypes.BOOLEAN;
        case Parameter_1.ParameterType.Trigger:
            return BERDataTypes_1.BERDataTypes.STRING; // TODO: this is a guess
        case Parameter_1.ParameterType.Enum:
            return BERDataTypes_1.BERDataTypes.ENUMERATED;
        case Parameter_1.ParameterType.Octets:
            return BERDataTypes_1.BERDataTypes.OCTETSTRING;
        case Parameter_1.ParameterType.Null:
            return BERDataTypes_1.BERDataTypes.NULL;
        default:
            throw new Error(``);
    }
}
