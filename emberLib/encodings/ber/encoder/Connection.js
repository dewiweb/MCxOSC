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
exports.encodeConnection = void 0;
const Connection_1 = require("../../../model/Connection");
const Ber = __importStar(require("../../../Ber"));
const constants_1 = require("../constants");
function encodeConnection(connection, writer) {
    writer.startSequence(constants_1.ConnectionBERID);
    writer.startSequence(Ber.CONTEXT(0));
    writer.writeInt(connection.target);
    writer.endSequence();
    if (connection.sources != null) {
        writer.startSequence(Ber.CONTEXT(1));
        writer.writeRelativeOID(connection.sources.join('.'), Ber.BERDataTypes.RELATIVE_OID);
        writer.endSequence();
    }
    if (connection.operation != null) {
        writer.startSequence(Ber.CONTEXT(2));
        writeConnectionOperation(connection.operation, writer);
        writer.endSequence();
    }
    if (connection.disposition != null) {
        writer.startSequence(Ber.CONTEXT(3));
        writeConnectionDisposition(connection.disposition, writer);
        writer.endSequence();
    }
    writer.endSequence();
}
exports.encodeConnection = encodeConnection;
function writeConnectionOperation(operation, writer) {
    const operationToInt = {
        [Connection_1.ConnectionOperation.Absolute]: 0,
        [Connection_1.ConnectionOperation.Connect]: 1,
        [Connection_1.ConnectionOperation.Disconnect]: 2
    };
    writer.writeInt(operationToInt[operation]);
}
function writeConnectionDisposition(operation, writer) {
    const operationToInt = {
        [Connection_1.ConnectionDisposition.Tally]: 0,
        [Connection_1.ConnectionDisposition.Modified]: 1,
        [Connection_1.ConnectionDisposition.Pending]: 2,
        [Connection_1.ConnectionDisposition.Locked]: 3
    };
    writer.writeInt(operationToInt[operation]);
}
