/// <reference types="node" />
import { EmberElement, ElementType } from './EmberElement';
import { EmberValue, MinMax, StringIntegerCollection, RelativeOID } from '../types/types';
import { StreamDescription } from './StreamDescription';
export { Parameter, ParameterType, ParameterAccess, isParameter, ParameterImpl };
declare enum ParameterType {
    Null = "NULL",
    Integer = "INTEGER",
    Real = "REAL",
    String = "STRING",
    Boolean = "BOOLEAN",
    Trigger = "TRIGGER",
    Enum = "ENUM",
    Octets = "OCTETS"
}
declare enum ParameterAccess {
    None = "NONE",
    Read = "READ",
    Write = "WRITE",
    ReadWrite = "READ_WRITE"
}
/**
 *  An entity that contains a value.
 *
 *  A value may be _null_, allowing a provider to inform a consumer that a value
 *  is not currently present.
 */
interface Parameter extends EmberElement {
    type: ElementType.Parameter;
    /** Hint to the parameter's type. */
    parameterType: ParameterType;
    /** Name. Must be unique within the current scope. */
    identifier?: string;
    /** Display name. Used for UI presentation. */
    description?: string;
    /** Current value. Must be integer, real or string. Enumerations are converted to 0-based indexes. */
    value?: EmberValue;
    /** Largest allowed value. */
    maximum?: MinMax;
    /** Smallest allowed value. */
    minimum?: MinMax;
    /** Permitted access. */
    access?: ParameterAccess;
    /** C-style format string to e.g. append a unit, control number of digits displayed etc.. */
    format?: string;
    /** List of enumeration value names, separated by line feed `\n`. */
    enumeration?: string;
    /** For a device unable to process decimal values, a factor may be used.
     *  The consumer then has to divide the reported value when it displays it
     *  and multiply it with this factor when it wants to change the parameter.
     */
    factor?: number;
    /** True if the parameter's node is online. */
    isOnline?: boolean;
    /** Transform a paramter value to its displayed form. Two formulas must be
     *  provided, separated by a linefeed `\n`, the first from prvider to consumer
     *  and the seconds from consumer to provider.
     */
    formula?: string;
    /** Incrementing and decrementing step. (Deprecated - use factor instead.) */
    step?: number;
    /** Default value. */
    defaultValue?: EmberValue;
    /** Identifies an audio level meter, or any other frequently changing data stream. */
    streamIdentifier?: number;
    /** Detailed description of an enumeration. */
    enumMap?: StringIntegerCollection;
    /** For streams where each value has more than one component. */
    streamDescriptor?: StreamDescription;
    schemaIdentifiers?: string;
    templateReference?: RelativeOID;
}
/**
 * Type predicate for Parameter interface.
 * TODO: write tests for actual values and optional properties
 *
 * @param obj - object to check
 * @returns true if object is a valid Parameter, false if not
 */
declare function isParameter(obj: any): obj is Parameter;
declare class ParameterImpl implements Parameter {
    parameterType: ParameterType;
    identifier?: string | undefined;
    description?: string | undefined;
    value?: string | number | boolean | Buffer | null | undefined;
    maximum?: number | null | undefined;
    minimum?: number | null | undefined;
    access?: ParameterAccess | undefined;
    format?: string | undefined;
    enumeration?: string | undefined;
    factor?: number | undefined;
    isOnline?: boolean | undefined;
    formula?: string | undefined;
    step?: number | undefined;
    defaultValue?: string | number | boolean | Buffer | null | undefined;
    streamIdentifier?: number | undefined;
    enumMap?: StringIntegerCollection | undefined;
    streamDescriptor?: StreamDescription | undefined;
    schemaIdentifiers?: string | undefined;
    templateReference?: string | undefined;
    readonly type: ElementType.Parameter;
    constructor(parameterType: ParameterType, identifier?: string | undefined, description?: string | undefined, value?: string | number | boolean | Buffer | null | undefined, maximum?: number | null | undefined, minimum?: number | null | undefined, access?: ParameterAccess | undefined, format?: string | undefined, enumeration?: string | undefined, factor?: number | undefined, // Integer32
    isOnline?: boolean | undefined, formula?: string | undefined, step?: number | undefined, // Integer32
    defaultValue?: string | number | boolean | Buffer | null | undefined, streamIdentifier?: number | undefined, // BER readInt
    enumMap?: StringIntegerCollection | undefined, streamDescriptor?: StreamDescription | undefined, schemaIdentifiers?: string | undefined, templateReference?: string | undefined);
}
