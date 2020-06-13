"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamDescriptionImpl = exports.StreamFormat = void 0;
var StreamFormat;
(function (StreamFormat) {
    StreamFormat["UInt8"] = "UInt8";
    StreamFormat["UInt16BE"] = "UInt16BE";
    StreamFormat["UInt16LE"] = "UInt16LE";
    StreamFormat["UInt32BE"] = "UInt32BE";
    StreamFormat["UInt32LE"] = "UInt32LE";
    StreamFormat["UInt64BE"] = "UInt64BE";
    StreamFormat["UInt64LE"] = "UInt64LE";
    StreamFormat["Int8"] = "Int8";
    StreamFormat["Int16BE"] = "Int16BE";
    StreamFormat["Int16LE"] = "Int16LE";
    StreamFormat["Int32BE"] = "Int32BE";
    StreamFormat["Int32LE"] = "Int32LE";
    StreamFormat["Int64BE"] = "Int64BE";
    StreamFormat["Int64LE"] = "Int64LE";
    StreamFormat["Float32BE"] = "Float32BE";
    StreamFormat["Float32LE"] = "Float32LE";
    StreamFormat["Float64BE"] = "Float64BE";
    StreamFormat["Float64LE"] = "Float64LE";
})(StreamFormat || (StreamFormat = {}));
exports.StreamFormat = StreamFormat;
class StreamDescriptionImpl {
    constructor(format, offset) {
        this.format = format;
        this.offset = offset;
    }
}
exports.StreamDescriptionImpl = StreamDescriptionImpl;
