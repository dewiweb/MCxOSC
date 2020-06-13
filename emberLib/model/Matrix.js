"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatrixImpl = exports.MatrixAddressingMode = exports.MatrixType = void 0;
const EmberElement_1 = require("./EmberElement");
/**
 *  Type of a matrix.
 */
var MatrixType;
(function (MatrixType) {
    /** One source may be connected to n targets, but each target must not be
     *  connected to more than one source. */
    MatrixType["OneToN"] = "ONE_TO_N";
    /** One source may be connected to only one target, and each target must
     *  not be connected to more than one source. */
    MatrixType["OneToOne"] = "ONE_TO_ONE";
    /** A source may be connected to n targets, and a target may have n sources
     *  connected to it. */
    MatrixType["NToN"] = "N_TO_N";
})(MatrixType || (MatrixType = {}));
exports.MatrixType = MatrixType;
/**
 *  Addressing mode for a matrix.
 */
var MatrixAddressingMode;
(function (MatrixAddressingMode) {
    /** Signal numbers are row/column indices. */
    MatrixAddressingMode["Linear"] = "LINEAR";
    /** Signle numbers are random. */
    MatrixAddressingMode["NonLinear"] = "NON_LINEAR";
})(MatrixAddressingMode || (MatrixAddressingMode = {}));
exports.MatrixAddressingMode = MatrixAddressingMode;
class MatrixImpl {
    constructor(identifier, targets, sources, connections, description, matrixType, addressingMode, targetCount, sourceCount, maximumTotalConnects, maximumConnectsPerTarget, parametersLocation, gainParameterNumber, labels, schemaIdentifiers, templateReference) {
        this.identifier = identifier;
        this.targets = targets;
        this.sources = sources;
        this.connections = connections;
        this.description = description;
        this.matrixType = matrixType;
        this.addressingMode = addressingMode;
        this.targetCount = targetCount;
        this.sourceCount = sourceCount;
        this.maximumTotalConnects = maximumTotalConnects;
        this.maximumConnectsPerTarget = maximumConnectsPerTarget;
        this.parametersLocation = parametersLocation;
        this.gainParameterNumber = gainParameterNumber;
        this.labels = labels;
        this.schemaIdentifiers = schemaIdentifiers;
        this.templateReference = templateReference;
        this.type = EmberElement_1.ElementType.Matrix;
    }
}
exports.MatrixImpl = MatrixImpl;
