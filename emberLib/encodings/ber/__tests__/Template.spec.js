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
const Ber = __importStar(require("../../../Ber"));
const Template_1 = require("../../../model/Template");
const Template_2 = require("../decoder/Template");
const Tree_1 = require("../../../model/Tree");
const EmberNode_1 = require("../../../model/EmberNode");
const Tree_2 = require("../encoder/Tree");
const Qualified_1 = require("../encoder/Qualified");
const DecodeResult_1 = require("../decoder/DecodeResult");
describe('encodings/ber/Template', () => {
    function roundtripTemplate(tmpl, qualified = false) {
        const writer = new Ber.Writer();
        if (!qualified)
            Tree_2.encodeNumberedElement(tmpl, writer);
        else
            Qualified_1.encodeQualifedElement(tmpl, writer);
        console.log(writer.buffer);
        expect(writer.buffer.length).toBeGreaterThan(0);
        const reader = new Ber.Reader(writer.buffer);
        const decoded = DecodeResult_1.guarded(Template_2.decodeTemplate(reader, qualified));
        expect(decoded).toEqual(tmpl);
    }
    function runRoundtripTests(qualified) {
        test('description', () => {
            const template = new Template_1.TemplateImpl(undefined, 'Description');
            const node = qualified
                ? new Tree_1.QualifiedElementImpl('1.2.3', template)
                : new Tree_1.NumberedTreeNodeImpl(0, template);
            roundtripTemplate(node, qualified);
        });
        test('element', () => {
            const template = new Template_1.TemplateImpl(new Tree_1.NumberedTreeNodeImpl(0, new EmberNode_1.EmberNodeImpl('TestNode')));
            const node = qualified
                ? new Tree_1.QualifiedElementImpl('1.2.3', template)
                : new Tree_1.NumberedTreeNodeImpl(0, template);
            roundtripTemplate(node, qualified);
        });
    }
    describe('roundtrip numbered template', () => {
        runRoundtripTests(false);
    });
    describe('roundtrip qualified template', () => {
        runRoundtripTests(true);
    });
});
