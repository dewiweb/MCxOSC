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
exports.decodeCommand = void 0;
const Ber = __importStar(require("../../../Ber"));
const Command_1 = require("../../../model/Command");
const Invocation_1 = require("./Invocation");
const constants_1 = require("../constants");
const DecodeResult_1 = require("./DecodeResult");
function readDirFieldMask(reader) {
    const intToMask = {
        [-2]: Command_1.FieldFlags.Sparse,
        [-1]: Command_1.FieldFlags.All,
        [0]: Command_1.FieldFlags.Default,
        [1]: Command_1.FieldFlags.Identifier,
        [2]: Command_1.FieldFlags.Description,
        [3]: Command_1.FieldFlags.Tree,
        [4]: Command_1.FieldFlags.Value,
        [5]: Command_1.FieldFlags.Connections
    };
    return intToMask[reader.readInt()];
}
function decodeCommand(reader, options = DecodeResult_1.defaultDecode) {
    reader.readSequence(constants_1.CommandBERID);
    let type = null;
    let dirFieldMask = undefined;
    let invocation = undefined;
    const errors = [];
    const endOffset = reader.offset + reader.length;
    while (reader.offset < endOffset) {
        const tag = reader.readSequence();
        switch (tag) {
            case Ber.CONTEXT(0):
                type = reader.readInt();
                break;
            case Ber.CONTEXT(1):
                dirFieldMask = readDirFieldMask(reader);
                if (!dirFieldMask) {
                    errors.push(new Error(`decode command: encounted unknown dir field mask`));
                }
                break;
            case Ber.CONTEXT(2):
                invocation = DecodeResult_1.appendErrors(Invocation_1.decodeInvocation(reader, options), errors);
                break;
            case 0:
                break; // Indefinite lengths
            default:
                DecodeResult_1.unknownContext(errors, 'decode command', tag, options);
                DecodeResult_1.skipNext(reader);
                break;
        }
    }
    type = DecodeResult_1.check(type, 'decode command', 'type', Command_1.CommandType.Subscribe, errors, options);
    switch (type) {
        case Command_1.CommandType.Subscribe:
            return DecodeResult_1.makeResult(new Command_1.SubscribeImpl(), errors);
        case Command_1.CommandType.Unsubscribe:
            return DecodeResult_1.makeResult(new Command_1.UnsubscribeImpl(), errors);
        case Command_1.CommandType.GetDirectory:
            return DecodeResult_1.makeResult(new Command_1.GetDirectoryImpl(dirFieldMask), errors);
        case Command_1.CommandType.Invoke:
            return DecodeResult_1.makeResult(new Command_1.InvokeImpl(invocation), errors);
        default:
            return DecodeResult_1.unexpected(errors, 'decode command', `command type '${type}' is not recognized`, new Command_1.SubscribeImpl(), options);
    }
}
exports.decodeCommand = decodeCommand;
