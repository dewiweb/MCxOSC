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
exports.decodeMatrix = void 0;
const Ber = __importStar(require("../../../Ber"));
const Matrix_1 = require("../../../model/Matrix");
const Tree_1 = require("./Tree");
const Connection_1 = require("./Connection");
const Label_1 = require("./Label");
const constants_1 = require("../constants");
const Tree_2 = require("../../../model/Tree");
const DecodeResult_1 = require("./DecodeResult");
function decodeMatrix(reader, isQualified = false, options = DecodeResult_1.defaultDecode) {
    reader.readSequence(isQualified ? constants_1.QualifiedMatrixBERID : constants_1.MatrixBERID);
    let number = null;
    let path = null;
    let targets = undefined;
    let sources = undefined;
    let connections = undefined;
    let contents = null;
    let kids = undefined;
    const errors = [];
    const endOffset = reader.offset + reader.length;
    while (reader.offset < endOffset) {
        const tag = reader.readSequence();
        switch (tag) {
            case Ber.CONTEXT(0):
                if (isQualified) {
                    path = reader.readRelativeOID();
                }
                else {
                    number = reader.readInt();
                }
                break;
            case Ber.CONTEXT(1):
                contents = DecodeResult_1.appendErrors(decodeMatrixContents(reader, options), errors);
                break;
            case Ber.CONTEXT(2):
                kids = DecodeResult_1.appendErrors(Tree_1.decodeChildren(reader, options), errors);
                break;
            case Ber.CONTEXT(3):
                targets = DecodeResult_1.appendErrors(decodeTargets(reader, options), errors);
                break;
            case Ber.CONTEXT(4):
                sources = DecodeResult_1.appendErrors(decodeSources(reader, options), errors);
                break;
            case Ber.CONTEXT(5):
                connections = DecodeResult_1.appendErrors(decodeConnections(reader, options), errors);
                break;
            case 0:
                break; // indefinite length
            default:
                DecodeResult_1.unknownContext(errors, 'decode matrix', tag, options);
                DecodeResult_1.skipNext(reader);
                break;
        }
    }
    contents = DecodeResult_1.check(contents, 'decode matrix', 'contents', new Matrix_1.MatrixImpl(''), errors, options);
    contents.targets = targets;
    contents.sources = sources;
    contents.connections = connections;
    let el;
    if (isQualified) {
        path = DecodeResult_1.check(path, 'decode matrix', 'path', '', errors, options);
        el = new Tree_2.QualifiedElementImpl(path, contents, kids);
    }
    else {
        number = DecodeResult_1.check(number, 'decode matrix', 'number', -1, errors, options);
        el = new Tree_2.NumberedTreeNodeImpl(number, contents, kids);
    }
    if (kids) {
        for (const kiddo of Object.values(kids)) {
            kiddo.parent = el;
        }
    }
    return DecodeResult_1.makeResult(el, errors);
}
exports.decodeMatrix = decodeMatrix;
function decodeMatrixContents(reader, options = DecodeResult_1.defaultDecode) {
    reader.readSequence(Ber.BERDataTypes.SET);
    let plTag;
    let identifier = undefined;
    let description = undefined;
    let matrixType = undefined;
    let addressingMode = undefined;
    let targetCount = undefined;
    let sourceCount = undefined;
    let maximumTotalConnects = undefined;
    let maximumConnectsPerTarget = undefined;
    let parametersLocation = undefined;
    let gainParameterNumber = undefined;
    let labels = undefined;
    let schemaIdentifiers = undefined;
    let templateReference = undefined;
    let seqOffset;
    const errors = [];
    const endOffset = reader.offset + reader.length;
    while (reader.offset < endOffset) {
        const tag = reader.readSequence();
        switch (tag) {
            case Ber.CONTEXT(0):
                identifier = reader.readString(Ber.BERDataTypes.STRING);
                break;
            case Ber.CONTEXT(1):
                description = reader.readString(Ber.BERDataTypes.STRING);
                break;
            case Ber.CONTEXT(2):
                matrixType = DecodeResult_1.appendErrors(readMatrixType(reader.readInt(), options), errors);
                break;
            case Ber.CONTEXT(3):
                addressingMode = DecodeResult_1.appendErrors(readAddressingMode(reader.readInt(), options), errors);
                break;
            case Ber.CONTEXT(4):
                targetCount = reader.readInt();
                break;
            case Ber.CONTEXT(5):
                sourceCount = reader.readInt();
                break;
            case Ber.CONTEXT(6):
                maximumTotalConnects = reader.readInt();
                break;
            case Ber.CONTEXT(7):
                maximumConnectsPerTarget = reader.readInt();
                break;
            case Ber.CONTEXT(8):
                plTag = reader.peek();
                if (plTag === Ber.BERDataTypes.RELATIVE_OID) {
                    parametersLocation = reader.readRelativeOID(Ber.BERDataTypes.RELATIVE_OID);
                }
                else {
                    parametersLocation = reader.readInt();
                }
                break;
            case Ber.CONTEXT(9):
                gainParameterNumber = reader.readInt();
                break;
            case Ber.CONTEXT(10):
                labels = [];
                reader.readSequence(Ber.BERDataTypes.SEQUENCE);
                seqOffset = reader.offset + reader.length;
                while (reader.offset < seqOffset) {
                    reader.readSequence(Ber.CONTEXT(0));
                    const lvVal = DecodeResult_1.appendErrors(Label_1.decodeLabel(reader, options), errors);
                    labels.push(lvVal);
                }
                break;
            case Ber.CONTEXT(11):
                schemaIdentifiers = reader.readString(Ber.BERDataTypes.STRING);
                break;
            case Ber.CONTEXT(12):
                templateReference = reader.readRelativeOID(Ber.BERDataTypes.RELATIVE_OID);
                break;
            case 0:
                break; // indefinite length
            default:
                DecodeResult_1.unknownContext(errors, 'decode mattric contents', tag, options);
                DecodeResult_1.skipNext(reader);
                break;
        }
    }
    identifier = DecodeResult_1.check(identifier, 'decode matrix contents', 'identifier', '', errors, options);
    return DecodeResult_1.makeResult(new Matrix_1.MatrixImpl(identifier, undefined, // targets
    undefined, // sources
    undefined, // connections
    description, matrixType, addressingMode, targetCount, sourceCount, maximumTotalConnects, maximumConnectsPerTarget, parametersLocation, gainParameterNumber, labels, schemaIdentifiers, templateReference), errors);
}
function decodeTargets(reader, _options = DecodeResult_1.defaultDecode // eslint-disable-line @typescript-eslint/no-unused-vars
) {
    const targets = [];
    reader.readSequence(Ber.BERDataTypes.SEQUENCE);
    const endOffset = reader.offset + reader.length;
    while (reader.offset < endOffset) {
        reader.readSequence(Ber.CONTEXT(0));
        reader.readSequence(constants_1.TargetBERID);
        reader.readSequence(Ber.CONTEXT(0));
        targets.push(reader.readInt());
    }
    return DecodeResult_1.makeResult(targets);
}
function decodeSources(reader, _options = DecodeResult_1.defaultDecode // eslint-disable-line @typescript-eslint/no-unused-vars
) {
    const sources = [];
    reader.readSequence(Ber.BERDataTypes.SEQUENCE);
    const endOffset = reader.offset + reader.length;
    while (reader.offset < endOffset) {
        reader.readSequence(Ber.CONTEXT(0));
        reader.readSequence(constants_1.SourceBERID);
        reader.readSequence(Ber.CONTEXT(0));
        sources.push(reader.readInt());
    }
    return DecodeResult_1.makeResult(sources);
}
function decodeConnections(reader, options = DecodeResult_1.defaultDecode) {
    const connections = DecodeResult_1.makeResult({});
    reader.readSequence(Ber.BERDataTypes.SEQUENCE);
    const endOffset = reader.offset + reader.length;
    while (reader.offset < endOffset) {
        reader.readSequence(Ber.CONTEXT(0));
        const connection = DecodeResult_1.appendErrors(Connection_1.decodeConnection(reader, options), connections);
        connections.value[connection.target] = connection;
    }
    return connections;
}
function readMatrixType(value, options = DecodeResult_1.defaultDecode) {
    switch (value) {
        case 0:
            return DecodeResult_1.makeResult(Matrix_1.MatrixType.OneToN);
        case 1:
            return DecodeResult_1.makeResult(Matrix_1.MatrixType.OneToOne);
        case 2:
            return DecodeResult_1.makeResult(Matrix_1.MatrixType.NToN);
        default:
            return DecodeResult_1.unexpected([], 'read matrix type', `unexpected matrix type '${value}'`, Matrix_1.MatrixType.NToN, options);
    }
}
function readAddressingMode(value, options = DecodeResult_1.defaultDecode) {
    switch (value) {
        case 0:
            return DecodeResult_1.makeResult(Matrix_1.MatrixAddressingMode.Linear);
        case 1:
            return DecodeResult_1.makeResult(Matrix_1.MatrixAddressingMode.NonLinear);
        default:
            return DecodeResult_1.unexpected([], 'read addressing mode', `unexpected addressing mode '${value}'`, Matrix_1.MatrixAddressingMode.Linear, options);
    }
}
