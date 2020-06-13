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
const Tree_1 = require("../../../model/Tree");
const Matrix_1 = require("../../../model/Matrix");
const Tree_2 = require("../encoder/Tree");
const Qualified_1 = require("../encoder/Qualified");
const Matrix_2 = require("../decoder/Matrix");
const Connection_1 = require("../../../model/Connection");
const DecodeResult_1 = require("../decoder/DecodeResult");
describe('encodings/ber/Matrix', () => {
    function roundtripMatrix(matrix, qualified = false) {
        const node = qualified
            ? new Tree_1.QualifiedElementImpl('1.2.3', matrix)
            : new Tree_1.NumberedTreeNodeImpl(0, matrix);
        const writer = new Ber.Writer();
        if (!qualified)
            Tree_2.encodeNumberedElement(node, writer);
        else
            Qualified_1.encodeQualifedElement(node, writer);
        console.log(writer.buffer);
        expect(writer.buffer.length).toBeGreaterThan(0);
        const reader = new Ber.Reader(writer.buffer);
        const decoded = DecodeResult_1.guarded(Matrix_2.decodeMatrix(reader, qualified));
        expect(decoded).toEqual(node);
    }
    function runRoundtripTests(qualified) {
        test('identifier', () => {
            const matrix = new Matrix_1.MatrixImpl('identifier');
            roundtripMatrix(matrix, qualified);
        });
        test('targets', () => {
            const matrix = new Matrix_1.MatrixImpl('identifier');
            matrix.targets = [0, 1, 2, 3, 4];
            roundtripMatrix(matrix, qualified);
        });
        test('sources', () => {
            const matrix = new Matrix_1.MatrixImpl('identifier');
            matrix.sources = [0, 1, 2, 3, 4];
            roundtripMatrix(matrix, qualified);
        });
        test('connections', () => {
            const matrix = new Matrix_1.MatrixImpl('identifier');
            matrix.connections = {
                1: {
                    target: 1
                }
            };
            roundtripMatrix(matrix, qualified);
        });
        describe('connections', () => {
            test('sources', () => {
                const matrix = new Matrix_1.MatrixImpl('identifier');
                matrix.connections = {
                    1: {
                        target: 1,
                        sources: [2, 3]
                    }
                };
                roundtripMatrix(matrix, qualified);
            });
            test('operation', () => {
                const matrix = new Matrix_1.MatrixImpl('identifier');
                matrix.connections = {
                    1: {
                        target: 1,
                        operation: Connection_1.ConnectionOperation.Absolute
                    }
                };
                roundtripMatrix(matrix, qualified);
                matrix.connections = {
                    1: {
                        target: 1,
                        operation: Connection_1.ConnectionOperation.Connect
                    }
                };
                roundtripMatrix(matrix, qualified);
                matrix.connections = {
                    1: {
                        target: 1,
                        operation: Connection_1.ConnectionOperation.Disconnect
                    }
                };
                roundtripMatrix(matrix, qualified);
            });
            test('disposition', () => {
                const matrix = new Matrix_1.MatrixImpl('identifier');
                matrix.connections = {
                    1: {
                        target: 1,
                        disposition: Connection_1.ConnectionDisposition.Locked
                    }
                };
                roundtripMatrix(matrix, qualified);
                matrix.connections[1].disposition = Connection_1.ConnectionDisposition.Modified;
                roundtripMatrix(matrix, qualified);
                matrix.connections[1].disposition = Connection_1.ConnectionDisposition.Pending;
                roundtripMatrix(matrix, qualified);
                matrix.connections[1].disposition = Connection_1.ConnectionDisposition.Tally;
                roundtripMatrix(matrix, qualified);
            });
        });
        test('description', () => {
            const matrix = new Matrix_1.MatrixImpl('identifier');
            matrix.description = 'Display Name';
            roundtripMatrix(matrix, qualified);
        });
        test('matrixType', () => {
            const matrix = new Matrix_1.MatrixImpl('identifier');
            matrix.matrixType = Matrix_1.MatrixType.NToN;
            roundtripMatrix(matrix, qualified);
            matrix.matrixType = Matrix_1.MatrixType.OneToN;
            roundtripMatrix(matrix, qualified);
            matrix.matrixType = Matrix_1.MatrixType.OneToOne;
            roundtripMatrix(matrix, qualified);
        });
        test('addressingMode', () => {
            const matrix = new Matrix_1.MatrixImpl('identifier');
            matrix.addressingMode = Matrix_1.MatrixAddressingMode.Linear;
            roundtripMatrix(matrix, qualified);
            matrix.addressingMode = Matrix_1.MatrixAddressingMode.NonLinear;
            roundtripMatrix(matrix, qualified);
        });
        test('targetCount', () => {
            const matrix = new Matrix_1.MatrixImpl('identifier');
            matrix.targetCount = 5;
            roundtripMatrix(matrix, qualified);
        });
        test('sourceCount', () => {
            const matrix = new Matrix_1.MatrixImpl('identifier');
            matrix.sourceCount = 5;
            roundtripMatrix(matrix, qualified);
        });
        test('maximumTotalConnects', () => {
            const matrix = new Matrix_1.MatrixImpl('identifier');
            matrix.maximumTotalConnects = 25;
            roundtripMatrix(matrix, qualified);
        });
        test('maximumConnectsPerTarget', () => {
            const matrix = new Matrix_1.MatrixImpl('identifier');
            matrix.maximumConnectsPerTarget = 5;
            roundtripMatrix(matrix, qualified);
        });
        test('parametersLocation', () => {
            const matrix = new Matrix_1.MatrixImpl('identifier');
            matrix.parametersLocation = '1.2.3';
            roundtripMatrix(matrix, qualified);
        });
        test('gainParameterNumber', () => {
            const matrix = new Matrix_1.MatrixImpl('identifier');
            matrix.gainParameterNumber = 3;
            roundtripMatrix(matrix, qualified);
        });
        test('labels', () => {
            const matrix = new Matrix_1.MatrixImpl('identifier');
            matrix.labels = [{ basePath: '1.2.3', description: 'Descr' }];
            roundtripMatrix(matrix, qualified);
        });
        test('schemaIdentifiers', () => {
            const matrix = new Matrix_1.MatrixImpl('identifier');
            matrix.schemaIdentifiers = '1.2.3';
            roundtripMatrix(matrix, qualified);
        });
        test('templateReference', () => {
            const matrix = new Matrix_1.MatrixImpl('identifier');
            matrix.templateReference = '1.2.3';
            roundtripMatrix(matrix, qualified);
        });
    }
    describe('roundtrip numbered Matrix', () => {
        runRoundtripTests(false);
    });
    describe('roundtrip qualified Matrix', () => {
        runRoundtripTests(true);
    });
});
