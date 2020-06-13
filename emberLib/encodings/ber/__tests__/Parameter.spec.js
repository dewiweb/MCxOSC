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
const Parameter_1 = require("../../../model/Parameter");
const Parameter_2 = require("../encoder/Parameter");
const Parameter_3 = require("../decoder/Parameter");
const EmberElement_1 = require("../../../model/EmberElement");
const StreamDescription_1 = require("../../../model/StreamDescription");
const types_1 = require("../../../types/types");
const DecodeResult_1 = require("../decoder/DecodeResult");
describe('encodings/ber/Parameter', () => {
    const prm = types_1.literal({
        type: EmberElement_1.ElementType.Parameter,
        parameterType: Parameter_1.ParameterType.String
    });
    function roundtripParameter(prm) {
        const writer = new Ber.Writer();
        Parameter_2.encodeParameter(prm, writer);
        console.log(writer.buffer);
        const reader = new Ber.Reader(writer.buffer);
        const decoded = DecodeResult_1.guarded(Parameter_3.decodeParameter(reader));
        expect(decoded).toEqual(prm);
    }
    test('write and read a parameter', () => {
        roundtripParameter(prm);
    });
    test('write and read a parameter - identifer', () => {
        const param = {
            ...prm,
            identifier: 'Angela'
        };
        roundtripParameter(param);
    });
    test('write and read a parameter - description', () => {
        const param = {
            ...prm,
            description: 'This parameter is\nsupposed to be a good boy'
        };
        roundtripParameter(param);
    });
    test('write and read a parameter - value', () => {
        const param = {
            ...prm,
            value: 'Oscar'
        };
        roundtripParameter(param);
    });
    test('write and read a parameter - maximum', () => {
        const param = {
            ...prm,
            parameterType: Parameter_1.ParameterType.Integer,
            maximum: 150
        };
        roundtripParameter(param);
    });
    test('write and read a parameter - maximum', () => {
        const param = {
            ...prm,
            parameterType: Parameter_1.ParameterType.Integer,
            minimum: -22
        };
        roundtripParameter(param);
    });
    test('write and read a parameter - access', () => {
        const param = {
            ...prm,
            access: Parameter_1.ParameterAccess.ReadWrite
        };
        roundtripParameter(param);
    });
    test('write and read a parameter - format', () => {
        const param = {
            ...prm,
            format: '2i%50%F20'
        };
        roundtripParameter(param);
    });
    test('write and read a parameter - enumeration', () => {
        const param = {
            ...prm,
            enumeration: '1\n2\n3\n4\n5\n'
        };
        roundtripParameter(param);
    });
    test('write and read a parameter - factor', () => {
        const param = {
            ...prm,
            factor: 512
        };
        roundtripParameter(param);
    });
    test('write and read a parameter - isOnline', () => {
        const param = {
            ...prm,
            isOnline: false
        };
        roundtripParameter(param);
    });
    test('write and read a parameter - formula', () => {
        const param = {
            ...prm,
            formula: '1\n1'
        };
        roundtripParameter(param);
    });
    test('write and read a parameter - defaultValue', () => {
        const param = {
            ...prm,
            defaultValue: 'Michael'
        };
        roundtripParameter(param);
    });
    test('write and read a parameter - streamIdentifier', () => {
        const param = {
            ...prm,
            streamIdentifier: 33
        };
        roundtripParameter(param);
    });
    test('write and read a parameter - enumMap', () => {
        const param = {
            ...prm,
            enumMap: new Map([
                ['Jim', 0],
                ['Pam', 1]
            ])
        };
        roundtripParameter(param);
    });
    test('write and read a parameter - streamDescriptor', () => {
        const param = {
            ...prm,
            streamDescriptor: { format: StreamDescription_1.StreamFormat.UInt8, offset: 22 }
        };
        roundtripParameter(param);
    });
    test('write and read a parameter - schemaIdentifiers', () => {
        const param = {
            ...prm,
            schemaIdentifiers: '3.2.1.1'
        };
        roundtripParameter(param);
    });
    test('write and read a parameter - templateReference', () => {
        const param = {
            ...prm,
            templateReference: '3.2.1.1'
        };
        roundtripParameter(param);
    });
    test('write and read a parameter - all', () => {
        const param = {
            ...prm,
            parameterType: Parameter_1.ParameterType.Integer,
            identifier: 'Angela',
            description: 'This parameter is\nsupposed to be a good boy',
            value: 24,
            maximum: 150,
            minimum: -22,
            access: Parameter_1.ParameterAccess.ReadWrite,
            format: '2i%50%F20',
            enumeration: '1\n2\n3\n4\n5\n',
            factor: 512,
            isOnline: false,
            formula: '1\n1',
            defaultValue: 0,
            streamIdentifier: 33,
            enumMap: new Map([
                ['Jim', 0],
                ['Pam', 1]
            ]),
            streamDescriptor: new StreamDescription_1.StreamDescriptionImpl(StreamDescription_1.StreamFormat.UInt8, 22),
            schemaIdentifiers: '3.2.1.1',
            templateReference: '3.2.1.1'
        };
        roundtripParameter(param);
    });
});
