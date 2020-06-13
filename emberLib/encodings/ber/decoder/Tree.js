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
exports.decodeRootElements = exports.decodeGenericElement = exports.decodeChildren = void 0;
const Ber = __importStar(require("../../../Ber"));
const EmberElement_1 = require("../../../model/EmberElement");
const Tree_1 = require("../../../model/Tree");
const EmberFunction_1 = require("./EmberFunction");
const EmberNode_1 = require("./EmberNode");
const Parameter_1 = require("./Parameter");
const Template_1 = require("./Template");
const constants_1 = require("../constants");
const Matrix_1 = require("./Matrix");
const Command_1 = require("./Command");
const DecodeResult_1 = require("./DecodeResult");
const EmberNode_2 = require("../../../model/EmberNode");
const model_1 = require("../../../model");
function decodeChildren(reader, options = DecodeResult_1.defaultDecode) {
    reader.readSequence(constants_1.ElementCollectionBERID);
    const kids = DecodeResult_1.makeResult({});
    const endOffset = reader.offset + reader.length;
    while (reader.offset < endOffset) {
        const tag = reader.readSequence();
        if (tag === 0)
            continue;
        const kidEl = decodeGenericElement(reader, options);
        DecodeResult_1.safeSet(kidEl, kids, (x, y) => {
            y[x.number] = x;
            return y;
        });
    }
    return kids;
}
exports.decodeChildren = decodeChildren;
function decodeGenericElement(reader, options = DecodeResult_1.defaultDecode) {
    const tag = reader.peek();
    const errors = new Array();
    if (tag === null) {
        DecodeResult_1.unknownApplication(errors, 'decode generic element', tag, options);
        DecodeResult_1.skipNext(reader);
        return DecodeResult_1.makeResult(new Tree_1.NumberedTreeNodeImpl(-1, new EmberNode_2.EmberNodeImpl()), errors);
    }
    const isQualified = isTagQualified(tag);
    const type = DecodeResult_1.appendErrors(tagToElType(tag, options), errors);
    if (tag === constants_1.MatrixBERID || tag === constants_1.QualifiedMatrixBERID) {
        return Matrix_1.decodeMatrix(reader, isQualified);
    }
    if (tag === constants_1.TemplateBERID || tag === constants_1.QualifiedTemplateBERID) {
        return Template_1.decodeTemplate(reader, isQualified);
    }
    else if (tag === constants_1.CommandBERID) {
        const commandResult = Command_1.decodeCommand(reader, options);
        return DecodeResult_1.makeResult(new Tree_1.NumberedTreeNodeImpl(commandResult.value.number, commandResult.value), commandResult.errors);
    }
    reader.readSequence(tag);
    let path = null;
    let number = null;
    let contents = undefined;
    let children;
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
                // parse contents
                switch (type) {
                    case EmberElement_1.ElementType.Command:
                        DecodeResult_1.unknownApplication(errors, 'decode generic element: command is not generic', tag, options);
                        // contents = new EmberNodeImpl()
                        DecodeResult_1.skipNext(reader);
                        break;
                    case EmberElement_1.ElementType.Function:
                        contents = DecodeResult_1.appendErrors(EmberFunction_1.decodeFunctionContent(reader, options), errors);
                        break;
                    case EmberElement_1.ElementType.Matrix:
                        DecodeResult_1.unknownApplication(errors, 'decode generic element: matrix is not generic', tag, options);
                        // contents = new EmberNodeImpl()
                        DecodeResult_1.skipNext(reader);
                        break;
                    case EmberElement_1.ElementType.Node:
                        contents = DecodeResult_1.appendErrors(EmberNode_1.decodeNode(reader, options), errors);
                        break;
                    case EmberElement_1.ElementType.Parameter:
                        contents = DecodeResult_1.appendErrors(Parameter_1.decodeParameter(reader, options), errors);
                        break;
                    case EmberElement_1.ElementType.Template:
                        DecodeResult_1.unknownApplication(errors, 'decode generic element: template is not generic', tag, options);
                        // contents = new EmberNodeImpl()
                        DecodeResult_1.skipNext(reader);
                        break;
                    default:
                        DecodeResult_1.unknownApplication(errors, 'decode generic element', tag, options);
                        // contents = new EmberNodeImpl()
                        DecodeResult_1.skipNext(reader);
                        break;
                }
                break;
            case Ber.CONTEXT(2):
                children = DecodeResult_1.appendErrors(decodeChildren(reader, options), errors);
                break;
            case 0:
                break; // indefinite length
            default:
                DecodeResult_1.unknownContext(errors, 'decode generic element', tag, options);
                DecodeResult_1.skipNext(reader);
                break;
        }
    }
    if (!contents) {
        switch (type) {
            case EmberElement_1.ElementType.Node:
                contents = new EmberNode_2.EmberNodeImpl();
                break;
            case EmberElement_1.ElementType.Parameter:
                contents = new model_1.ParameterImpl(model_1.ParameterType.Null);
                break;
            case EmberElement_1.ElementType.Function:
                contents = new model_1.EmberFunctionImpl();
                break;
            default:
                errors.push(new Error(`decodeGenericElement: No contents and unexpected type ${type}`));
                contents = new EmberNode_2.EmberNodeImpl();
                break;
        }
    }
    let el;
    if (isQualified) {
        path = DecodeResult_1.check(path, 'decode generic element', 'path', '', errors, options);
        el = new Tree_1.QualifiedElementImpl(path, contents, children);
    }
    else {
        number = DecodeResult_1.check(number, 'decode generic element', 'number', -1, errors, options);
        el = new Tree_1.NumberedTreeNodeImpl(number, contents, children);
    }
    if (children) {
        for (const kid of Object.values(children)) {
            kid.parent = el;
        }
    }
    return DecodeResult_1.makeResult(el, errors);
}
exports.decodeGenericElement = decodeGenericElement;
function decodeRootElements(reader, options = DecodeResult_1.defaultDecode) {
    reader.readSequence(constants_1.RootElementsBERID);
    const rootEls = DecodeResult_1.makeResult({});
    const endOffset = reader.offset + reader.length;
    while (reader.offset < endOffset) {
        const tag = reader.readSequence();
        if (tag === 0)
            continue;
        if (tag !== Ber.CONTEXT(0)) {
            DecodeResult_1.unknownContext(rootEls, 'decode root elements', tag, options);
            DecodeResult_1.skipNext(reader);
            continue;
        }
        const rootEl = decodeGenericElement(reader, options);
        DecodeResult_1.safeSet(rootEl, rootEls, (x, y) => {
            if (x.number) {
                y[x.number] = x;
            }
            else {
                y[Object.values(y).length] = x;
            }
            return y;
        });
    }
    return rootEls;
}
exports.decodeRootElements = decodeRootElements;
function isTagQualified(tag) {
    const qualifiedTags = new Set([
        constants_1.QualifiedTemplateBERID,
        constants_1.QualifiedParameterBERID,
        constants_1.QualifiedNodeBERID,
        constants_1.QualifiedMatrixBERID,
        constants_1.QualifiedFunctionBERID
    ]);
    return qualifiedTags.has(tag);
}
function tagToElType(tag, options = DecodeResult_1.defaultDecode) {
    const tags = {
        [constants_1.CommandBERID]: EmberElement_1.ElementType.Command,
        [constants_1.FunctionBERID]: EmberElement_1.ElementType.Function,
        [constants_1.NodeBERID]: EmberElement_1.ElementType.Node,
        [constants_1.MatrixBERID]: EmberElement_1.ElementType.Matrix,
        [constants_1.ParameterBERID]: EmberElement_1.ElementType.Parameter,
        [constants_1.TemplateBERID]: EmberElement_1.ElementType.Template,
        [constants_1.QualifiedTemplateBERID]: EmberElement_1.ElementType.Template,
        [constants_1.QualifiedParameterBERID]: EmberElement_1.ElementType.Parameter,
        [constants_1.QualifiedNodeBERID]: EmberElement_1.ElementType.Node,
        [constants_1.QualifiedMatrixBERID]: EmberElement_1.ElementType.Matrix,
        [constants_1.QualifiedFunctionBERID]: EmberElement_1.ElementType.Function
    };
    if (!tags[tag]) {
        return DecodeResult_1.unexpected([], 'tag to element type', `Unexpected element type tag '${tag}'`, EmberElement_1.ElementType.Node, options);
    }
    return DecodeResult_1.makeResult(tags[tag]);
}
