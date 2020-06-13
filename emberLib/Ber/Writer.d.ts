import { Writer, WriterOptions } from 'asn1';
import { Parameter } from '../model/Parameter';
import { EmberValue, EmberTypedValue } from '../types/types';
export { ExtendedWriter as Writer };
declare class ExtendedWriter extends Writer {
    constructor(options?: WriterOptions);
    writeReal(value: number, tag: number): void;
    writeValue(value: EmberValue, tag?: number): void;
    writeValue(typedValue: EmberTypedValue): void;
    writeEmberParameter(value: Parameter): void;
    writeIfDefined<T>(property: T | undefined, writer: (value: T, tag: number) => void, outer: number, inner: number): void;
    writeIfDefinedEnum(property: any, type: any, writer: (value: number, tag: number) => void, outer: number, inner: number): void;
}
