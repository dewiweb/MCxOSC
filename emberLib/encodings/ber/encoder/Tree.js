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
exports.encodeTree = exports.encodeNumberedElement = void 0;
const Ber = __importStar(require("../../../Ber"));
const EmberElement_1 = require("../../../model/EmberElement");
const EmberElement_2 = require("./EmberElement");
const Command_1 = require("./Command");
const Template_1 = require("./Template");
const Connection_1 = require("./Connection");
const Matrix_1 = require("./Matrix");
const constants_1 = require("../constants");
function encodeNumberedElement(el, writer) {
    if (el.contents.type === EmberElement_1.ElementType.Command) {
        // Command is a special case
        if (isQualified(el))
            throw new Error('Command cannot be qualified');
        Command_1.encodeCommand(el.contents, writer);
        return;
    }
    switch (el.contents.type) {
        case EmberElement_1.ElementType.Function:
            writer.startSequence(constants_1.FunctionBERID);
            break;
        case EmberElement_1.ElementType.Matrix:
            writer.startSequence(constants_1.MatrixBERID);
            break;
        case EmberElement_1.ElementType.Node:
            writer.startSequence(constants_1.NodeBERID); // start Node
            break;
        case EmberElement_1.ElementType.Parameter:
            writer.startSequence(constants_1.ParameterBERID);
            break;
        case EmberElement_1.ElementType.Template:
            writer.startSequence(constants_1.TemplateBERID);
            break;
    }
    writer.startSequence(Ber.CONTEXT(0)); // start number
    writer.writeInt(el.number, Ber.BERDataTypes.INTEGER);
    writer.endSequence();
    encodeTree(el, writer);
}
exports.encodeNumberedElement = encodeNumberedElement;
function encodeTree(el, writer) {
    if (isTemplate(el.contents)) {
        Template_1.encodeTemplate(el.contents, writer);
        writer.endSequence(); // end node
        return;
    }
    // Encode Contents:
    if (Object.values(el.contents).filter((v) => v !== undefined).length > 1) {
        writer.startSequence(Ber.CONTEXT(1)); // start contents
        EmberElement_2.encodeEmberElement(el.contents, writer);
        writer.endSequence(); // end contents
    }
    if (hasChildren(el)) {
        writer.startSequence(Ber.CONTEXT(2)); // start children
        writer.startSequence(constants_1.ElementCollectionBERID); // start ElementCollection
        if (el.children) {
            for (const child of Object.values(el.children)) {
                writer.startSequence(Ber.CONTEXT(0)); // start child
                encodeNumberedElement(child, writer);
                writer.endSequence(); // end child
            }
        }
        writer.endSequence(); // end ElementCollection
        writer.endSequence(); // end children
    }
    // Matrix contains some other props as well
    if (isMatrix(el.contents)) {
        // encode targets
        if (el.contents.targets) {
            writer.startSequence(Ber.CONTEXT(3)); // start targets
            writer.startSequence(Ber.BERDataTypes.SEQUENCE); // start sequence
            // write target collection
            for (const target of el.contents.targets) {
                writer.startSequence(Ber.CONTEXT(0)); // start child
                Matrix_1.encodeTarget(target, writer);
                writer.endSequence(); // end child
            }
            writer.endSequence(); // end sequence
            writer.endSequence(); // end children
        }
        if (el.contents.sources) {
            writer.startSequence(Ber.CONTEXT(4));
            writer.startSequence(Ber.BERDataTypes.SEQUENCE);
            // write sources collection
            for (const source of el.contents.sources) {
                writer.startSequence(Ber.CONTEXT(0));
                Matrix_1.encodeSource(source, writer);
                writer.endSequence();
            }
            writer.endSequence();
            writer.endSequence();
        }
        if (el.contents.connections) {
            writer.startSequence(Ber.CONTEXT(5));
            writer.startSequence(Ber.BERDataTypes.SEQUENCE);
            // write connections collection
            for (const connection of Object.values(el.contents.connections)) {
                writer.startSequence(Ber.CONTEXT(0));
                Connection_1.encodeConnection(connection, writer);
                writer.endSequence();
            }
            writer.endSequence();
            writer.endSequence();
        }
    }
    writer.endSequence(); // end node
}
exports.encodeTree = encodeTree;
function hasChildren(el) {
    return ('children' in el &&
        el.children !== undefined &&
        !(el.contents.type === EmberElement_1.ElementType.Command ||
            el.contents.type === EmberElement_1.ElementType.Parameter ||
            el.contents.type === EmberElement_1.ElementType.Template));
}
function isQualified(el) {
    return 'path' in el;
}
function isMatrix(el) {
    return el.type === EmberElement_1.ElementType.Matrix;
}
function isTemplate(el) {
    return el.type === EmberElement_1.ElementType.Template;
}
