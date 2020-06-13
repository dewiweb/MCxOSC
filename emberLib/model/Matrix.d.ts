import { EmberElement, ElementType } from './EmberElement';
import { Connection } from './Connection';
import { Label } from './Label';
import { RelativeOID } from '../types/types';
export { Matrix, MatrixType, MatrixAddressingMode, Connections, MatrixImpl };
/**
 *  Type of a matrix.
 */
declare enum MatrixType {
    /** One source may be connected to n targets, but each target must not be
     *  connected to more than one source. */
    OneToN = "ONE_TO_N",
    /** One source may be connected to only one target, and each target must
     *  not be connected to more than one source. */
    OneToOne = "ONE_TO_ONE",
    /** A source may be connected to n targets, and a target may have n sources
     *  connected to it. */
    NToN = "N_TO_N"
}
/**
 *  Addressing mode for a matrix.
 */
declare enum MatrixAddressingMode {
    /** Signal numbers are row/column indices. */
    Linear = "LINEAR",
    /** Signle numbers are random. */
    NonLinear = "NON_LINEAR"
}
/**
 *  Dictionary or targets, indexed by element number.
 */
interface Connections {
    [target: number]: Connection;
}
/**
 *  A two-dimensional array of Boolean values used for eg. signal routing, bus
 *  assignments on mixing consoles etc..
 */
interface Matrix extends EmberElement {
    type: ElementType.Matrix;
    /** Target objects, the columns of the matrix. */
    targets?: Array<number>;
    /** Source objects, the row of the matric. */
    sources?: Array<number>;
    /** Describes the targets active connections. */
    connections?: Connections;
    /** Name. */
    identifier: string;
    /** Display name. */
    description?: string;
    /** Matrix type. */
    matrixType?: MatrixType;
    /** Matrix adressing mode. */
    addressingMode?: MatrixAddressingMode;
    /** Linear matrix: number of columns. Nonlinear matrix: number of targets. */
    targetCount?: number;
    /** Linea matirx: number of rows. Nonlinear matrix: number of sources. */
    sourceCount?: number;
    /** For n-to-n matrices, the maximum number of total connections. */
    maximumTotalConnects?: number;
    /** For n-to-n matrices, maximum number of sources for any single target. */
    maximumConnectsPerTarget?: number;
    /** Reference to parameters associated with signals, e.g. relative levels. */
    parametersLocation?: RelativeOID | number;
    /** For n-to-n matrices, element number of the parameter for gain or ration
     *  of a connection. */
    gainParameterNumber?: number;
    /** Labels for signals. */
    labels?: Array<Label>;
    /** List of schemas that the matrid complies with. `\n` separators. */
    schemaIdentifiers?: string;
    /** Path of a template containing structure and defaults of this element. */
    templateReference?: RelativeOID;
}
declare class MatrixImpl implements Matrix {
    identifier: string;
    targets?: number[] | undefined;
    sources?: number[] | undefined;
    connections?: Connections | undefined;
    description?: string | undefined;
    matrixType?: MatrixType | undefined;
    addressingMode?: MatrixAddressingMode | undefined;
    targetCount?: number | undefined;
    sourceCount?: number | undefined;
    maximumTotalConnects?: number | undefined;
    maximumConnectsPerTarget?: number | undefined;
    parametersLocation?: string | number | undefined;
    gainParameterNumber?: number | undefined;
    labels?: Label[] | undefined;
    schemaIdentifiers?: string | undefined;
    templateReference?: string | undefined;
    readonly type: ElementType.Matrix;
    constructor(identifier: string, targets?: number[] | undefined, sources?: number[] | undefined, connections?: Connections | undefined, description?: string | undefined, matrixType?: MatrixType | undefined, addressingMode?: MatrixAddressingMode | undefined, targetCount?: number | undefined, sourceCount?: number | undefined, maximumTotalConnects?: number | undefined, maximumConnectsPerTarget?: number | undefined, parametersLocation?: string | number | undefined, gainParameterNumber?: number | undefined, labels?: Label[] | undefined, schemaIdentifiers?: string | undefined, templateReference?: string | undefined);
}
