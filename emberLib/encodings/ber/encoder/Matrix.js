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
exports.matrixModeToInt = exports.matrixTypeToInt = exports.elementTypeToInt = exports.encodeSource = exports.encodeTarget = exports.encodeMatrix = void 0;
const Ber = __importStar(require("../../../Ber"));
const Matrix_1 = require("../../../model/Matrix");
const EmberElement_1 = require("../../../model/EmberElement");
const Label_1 = require("./Label");
const constants_1 = require("../constants");
function encodeMatrix(matrix, writer) {
    writer.startSequence(Ber.BERDataTypes.SET);
    writer.writeIfDefined(matrix.identifier, writer.writeString, 0, Ber.BERDataTypes.STRING);
    writer.writeIfDefined(matrix.description, writer.writeString, 1, Ber.BERDataTypes.STRING);
    writer.writeIfDefined(matrix.matrixType && matrixTypeToInt(matrix.matrixType), writer.writeInt, 2, Ber.BERDataTypes.INTEGER);
    writer.writeIfDefined(matrix.addressingMode && matrixModeToInt(matrix.addressingMode), writer.writeInt, 3, Ber.BERDataTypes.INTEGER);
    writer.writeIfDefined(matrix.targetCount, writer.writeInt, 4, Ber.BERDataTypes.INTEGER);
    writer.writeIfDefined(matrix.sourceCount, writer.writeInt, 5, Ber.BERDataTypes.INTEGER);
    writer.writeIfDefined(matrix.maximumTotalConnects, writer.writeInt, 6, Ber.BERDataTypes.INTEGER);
    writer.writeIfDefined(matrix.maximumConnectsPerTarget, writer.writeInt, 7, Ber.BERDataTypes.INTEGER);
    if (matrix.parametersLocation != null) {
        writer.startSequence(Ber.CONTEXT(8));
        const param = Number(matrix.parametersLocation);
        if (isNaN(param)) {
            writer.writeRelativeOID(matrix.parametersLocation, Ber.BERDataTypes.RELATIVE_OID);
        }
        else {
            writer.writeInt(param);
        }
        writer.endSequence();
    }
    writer.writeIfDefined(matrix.gainParameterNumber, writer.writeInt, 9, Ber.BERDataTypes.INTEGER);
    if (matrix.labels != null) {
        writer.startSequence(Ber.CONTEXT(10));
        writer.startSequence(Ber.BERDataTypes.SEQUENCE);
        for (let i = 0; i < matrix.labels.length; i++) {
            writer.startSequence(Ber.CONTEXT(0));
            Label_1.encodeLabel(matrix.labels[i], writer);
            writer.endSequence();
        }
        writer.endSequence();
        writer.endSequence();
    }
    writer.writeIfDefined(matrix.schemaIdentifiers, writer.writeString, 11, Ber.BERDataTypes.STRING);
    if (matrix.templateReference != null) {
        writer.startSequence(Ber.CONTEXT(12));
        writer.writeRelativeOID(matrix.templateReference, Ber.BERDataTypes.RELATIVE_OID);
        writer.endSequence();
    }
    writer.endSequence();
}
exports.encodeMatrix = encodeMatrix;
function encodeTarget(target, writer) {
    writer.startSequence(constants_1.TargetBERID);
    writer.startSequence(Ber.CONTEXT(0));
    writer.writeInt(target, Ber.BERDataTypes.INTEGER);
    writer.endSequence();
    writer.endSequence();
}
exports.encodeTarget = encodeTarget;
function encodeSource(source, writer) {
    writer.startSequence(constants_1.SourceBERID);
    writer.startSequence(Ber.CONTEXT(0));
    writer.writeInt(source, Ber.BERDataTypes.INTEGER);
    writer.endSequence();
    writer.endSequence();
}
exports.encodeSource = encodeSource;
function elementTypeToInt(type) {
    const typeToInt = {
        [EmberElement_1.ElementType.Parameter]: 0,
        [EmberElement_1.ElementType.Node]: 1,
        [EmberElement_1.ElementType.Command]: 2,
        [EmberElement_1.ElementType.Matrix]: 3,
        [EmberElement_1.ElementType.Function]: 4,
        [EmberElement_1.ElementType.Template]: 5
    };
    return typeToInt[type];
}
exports.elementTypeToInt = elementTypeToInt;
function matrixTypeToInt(type) {
    const typeToInt = {
        [Matrix_1.MatrixType.OneToN]: 0,
        [Matrix_1.MatrixType.OneToOne]: 1,
        [Matrix_1.MatrixType.NToN]: 2
    };
    return typeToInt[type];
}
exports.matrixTypeToInt = matrixTypeToInt;
function matrixModeToInt(mode) {
    const modeToInt = {
        [Matrix_1.MatrixAddressingMode.Linear]: 0,
        [Matrix_1.MatrixAddressingMode.NonLinear]: 1
    };
    return modeToInt[mode];
}
exports.matrixModeToInt = matrixModeToInt;
