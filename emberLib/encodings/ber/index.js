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
exports.berDecode = exports.berEncode = void 0;
const types_1 = require("../../types/types");
const Ber = __importStar(require("../../Ber"));
const InvocationResult_1 = require("./encoder/InvocationResult");
const RootElement_1 = require("./encoder/RootElement");
const StreamEntry_1 = require("./encoder/StreamEntry");
const InvocationResult_2 = require("./decoder/InvocationResult");
const Tree_1 = require("./decoder/Tree");
const StreamEntry_2 = require("./decoder/StreamEntry");
const DecodeResult_1 = require("./decoder/DecodeResult");
const constants_1 = require("./constants");
const Tree_2 = require("../../model/Tree");
const EmberNode_1 = require("../../model/EmberNode");
function berEncode(el, rootType) {
    const writer = new Ber.Writer();
    writer.startSequence(constants_1.RootBERID); // Start ROOT
    switch (rootType) {
        case types_1.RootType.Elements:
            writer.startSequence(constants_1.RootElementsBERID); // Start RootElementCollection
            for (const rootEl of Object.values(el)) {
                writer.startSequence(Ber.CONTEXT(0));
                RootElement_1.encodeRootElement(rootEl, writer);
                writer.endSequence();
            }
            writer.endSequence(); // End RootElementCollection
            break;
        case types_1.RootType.Streams:
            writer.startSequence(constants_1.StreamEntriesBERID); // Start StreamCollection
            for (const entry of Object.values(el)) {
                writer.startSequence(Ber.CONTEXT(0));
                StreamEntry_1.encodeStreamEntry(entry, writer);
                writer.endSequence();
            }
            writer.endSequence(); // End StreamCollection
            break;
        case types_1.RootType.InvocationResult:
            InvocationResult_1.encodeInvocationResult(el, writer);
            break;
    }
    writer.endSequence(); // End ROOT
    return writer.buffer;
}
exports.berEncode = berEncode;
function berDecode(b, options = DecodeResult_1.defaultDecode) {
    const reader = new Ber.Reader(b);
    const errors = new Array();
    const tag = reader.peek();
    if (tag !== constants_1.RootBERID) {
        DecodeResult_1.unknownApplication(errors, 'decode root', tag, options);
        return DecodeResult_1.makeResult([new Tree_2.NumberedTreeNodeImpl(-1, new EmberNode_1.EmberNodeImpl())], errors);
    }
    reader.readSequence(tag);
    const rootSeqType = reader.peek();
    if (rootSeqType === constants_1.RootElementsBERID) {
        // RootElementCollection
        const root = Tree_1.decodeRootElements(reader, options);
        return root;
    }
    else if (rootSeqType === constants_1.StreamEntriesBERID) {
        // StreamCollection
        const root = StreamEntry_2.decodeStreamEntries(reader, options);
        return root;
    }
    else if (rootSeqType === constants_1.InvocationResultBERID) {
        // InvocationResult
        const root = InvocationResult_2.decodeInvocationResult(reader, options);
        return root;
    }
    DecodeResult_1.unknownApplication(errors, 'decode root', rootSeqType, options);
    return DecodeResult_1.makeResult([new Tree_2.NumberedTreeNodeImpl(-1, new EmberNode_1.EmberNodeImpl())], errors);
}
exports.berDecode = berDecode;
