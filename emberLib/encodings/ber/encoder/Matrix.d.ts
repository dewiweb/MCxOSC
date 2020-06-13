import * as Ber from '../../../Ber';
import { Matrix, MatrixType, MatrixAddressingMode } from '../../../model/Matrix';
import { ElementType } from '../../../model/EmberElement';
export declare function encodeMatrix(matrix: Matrix, writer: Ber.Writer): void;
export declare function encodeTarget(target: number, writer: Ber.Writer): void;
export declare function encodeSource(source: number, writer: Ber.Writer): void;
export declare function elementTypeToInt(type: ElementType): number;
export declare function matrixTypeToInt(type: MatrixType): number;
export declare function matrixModeToInt(mode: MatrixAddressingMode): number;
