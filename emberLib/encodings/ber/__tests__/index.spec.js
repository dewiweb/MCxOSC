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
const InvocationResult_1 = require("../../../model/InvocationResult");
const Parameter_1 = require("../../../model/Parameter");
const types_1 = require("../../../types/types");
const __1 = require("..");
const Tree_1 = require("../../../model/Tree");
const EmberNode_1 = require("../../../model/EmberNode");
const DecodeResult_1 = require("../decoder/DecodeResult");
const Ber = __importStar(require("../../../Ber"));
const EmberElement_1 = require("../../../model/EmberElement");
const constants_1 = require("../constants");
describe('encoders/Ber/index', () => {
    function roundTrip(res, type) {
        const encoded = __1.berEncode(res, type);
        const decoded = DecodeResult_1.guarded(__1.berDecode(encoded));
        expect(decoded).toEqual(res);
    }
    test('InvocationResult', () => {
        const res = new InvocationResult_1.InvocationResultImpl(64, true, [{ value: 6, type: Parameter_1.ParameterType.Integer }]);
        roundTrip(res, types_1.RootType.InvocationResult);
    });
    test('Qualified node', () => {
        const res = { 0: new Tree_1.QualifiedElementImpl('2.3.1', new EmberNode_1.EmberNodeImpl('Test node')) };
        roundTrip(res, types_1.RootType.Elements);
    });
    test('Numbered node', () => {
        const res = { 0: new Tree_1.NumberedTreeNodeImpl(0, new EmberNode_1.EmberNodeImpl('Test node')) };
        roundTrip(res, types_1.RootType.Elements);
    });
    test('Numbered tree', () => {
        const res = {
            0: new Tree_1.NumberedTreeNodeImpl(0, new EmberNode_1.EmberNodeImpl('Test node'), {
                0: new Tree_1.NumberedTreeNodeImpl(0, new EmberNode_1.EmberNodeImpl('Test node 1'))
            })
        };
        if (!res[0].children) {
            fail(`Tree must have children`);
        }
        res[0].children[0].parent = res[0];
        roundTrip(res, types_1.RootType.Elements);
    });
    test('Qualified tree', () => {
        const res = {
            0: new Tree_1.QualifiedElementImpl('2.3.1', new EmberNode_1.EmberNodeImpl('Test node'), {
                0: new Tree_1.NumberedTreeNodeImpl(0, new EmberNode_1.EmberNodeImpl('Node A'), {})
            })
        };
        if (!res[0].children) {
            fail(`Tree must have children`);
        }
        res[0].children[0].parent = res[0];
        roundTrip(res, types_1.RootType.Elements);
    });
    test('Unknown root', () => {
        var _a;
        const testBuffer = Buffer.from([Ber.APPLICATION(30)]);
        const decoded = __1.berDecode(testBuffer);
        expect(decoded.value).toHaveLength(1);
        expect(decoded.value[0].contents.type).toBe(EmberElement_1.ElementType.Node);
        expect(decoded.errors).toHaveLength(1);
        expect((_a = decoded.errors) === null || _a === void 0 ? void 0 : _a.toString()).toMatch(/Unexpected BER application tag '126'/);
    });
    test('Unknown root elements', () => {
        var _a;
        const testBuffer = Buffer.from([constants_1.RootBERID, 1, Ber.APPLICATION(31)]);
        const decoded = __1.berDecode(testBuffer);
        expect(decoded.value).toHaveLength(1);
        expect(decoded.value[0].contents.type).toBe(EmberElement_1.ElementType.Node);
        expect(decoded.errors).toHaveLength(1);
        expect((_a = decoded.errors) === null || _a === void 0 ? void 0 : _a.toString()).toMatch(/Unexpected BER application tag '127'/);
    });
});
