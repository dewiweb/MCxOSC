import * as Ber from '../../../Ber';
export { DecodeOptions, defaultDecode, DecodeResult, whatever, check, DecodeError, makeResult, unknownContext, unknownApplication, safeSet, guarded, appendErrors, unexpected, skipNext };
/**
 * Control what cuases an exception during decoding.
 */
interface DecodeOptions {
    /** Skip unknown application tags, used to identify objects. */
    skipApplicationTags: boolean;
    /** Skip unknown context tags, used to identify the properties of objects. */
    skipContextTags: boolean;
    /** Substitute a default value when a required value is missing. */
    substituteForRequired: boolean;
    /** Skip past unexpected enumeration values. */
    skipUnexpected: boolean;
}
/**
 * Default decoding values. Prevents throwing exceptions while decoding.
 */
declare const defaultDecode: DecodeOptions;
/**
 * Decoders are forgiving and return both a candidate value and a list of
 * errors found in the source data.
 */
interface DecodeResult<T> {
    /** Candicate decoded value. */
    value: T;
    /** List of errors, if any, found during decoding. */
    errors?: Array<Error>;
}
/**
 * Return the decoded result whatever errors are reported.
 * @param decres Result of decoding.
 * @returns Candidate result of decoding, ignoring any errors.
 * @
 */
declare function whatever<T>(decres: DecodeResult<T>): T;
/**
 * Compound error containing details of all problems encountered when
 * decoding an EmberPlus BER stream.
 */
declare class DecodeError extends Error {
    /** Details of each error enountered during encoding. */
    readonly sub: Array<Error>;
    /**
     * Create an error with details of decoding issues.
     * @param errors List of decoding sub-errors.
     */
    constructor(errors: Array<Error>);
}
/**
 * Return the decoded result if no errors, otherwise throw a summary error.
 * @param decres Result of decoding.
 * @returns Candidate result of decoding, only if no errors.
 * @throws Summary when errors exists.
 */
declare function guarded<T>(decres: DecodeResult<T>): T;
/**
 * Make a decoded result from an initial value with an empty list if errors.
 * @param t Value to embed in the initial result.
 */
declare function makeResult<T>(t: T, errors?: Array<Error>): DecodeResult<T>;
/**
 * Process a decoding problem when a context parameter tag is not recognized.
 * @param decres Decoding result to add the error to (if appropriate).
 * @param context Description of where the tag is.
 * @param tag Unrecognized tag.
 * @param options Control the processing of the error.
 */
declare function unknownContext<T>(decres: DecodeResult<T> | Array<Error>, context: string, tag: number | null, options?: DecodeOptions): void;
/**
 * Process a decoding problem when an application tag is not recognized.
 * @param decres Decoding result to add the error to (if appropriate).
 * @param context Description of where the tag is.
 * @param tag Unrecognized tag.
 * @param options Control the processing of the error.
 */
declare function unknownApplication<T>(decres: DecodeResult<T> | Array<Error>, context: string, tag: number | null, options?: DecodeOptions): void;
/**
 * Safely update a value from another decoding stage, merging errors.
 * @param result Result of a decoding stage.
 * @param update Value to be updated.
 * @param fn Function to use to update a value with the result.
 */
declare function safeSet<S, T>(result: DecodeResult<S>, update: DecodeResult<T>, fn: (s: S, t: T) => T): DecodeResult<T>;
/**
 * Check a value and if it is _null_ or _undefined_ then follow the options
 * to either substitute a replacement truthy value, reporting an issue in the
 * errors list, or throw an error when `subsituteForRequired` is `false`.
 * @param value Value that may be somehow not defined.
 * @param context Description of where the value is.
 * @param propertyName Name of the property.
 * @param substitute Substitute value in the event that the value is missing.
 * @param decres A decoding result with an error list to be extended or a
 * stand alone error list.
 * @param options Control the processing of the check.
 * @returns Value or, if somehow not defined, the substitute.
 */
declare function check<T>(value: T | null | undefined, context: string, propertyName: string, substitute: T, decres: DecodeResult<T> | Array<Error>, options?: DecodeOptions): T;
/**
 * Extend an error list using any errors in the given source, returning the
 * source value.
 * @param source Decoding result to split apart.
 * @param decres Decoding result to extend the error list of or a stand alone
 * error list.
 * @returns The value embedded in the source.
 */
declare function appendErrors<T, U>(source: DecodeResult<T>, decres: DecodeResult<U> | Array<Error>): T;
/**
 * Handle an unexpected enumeration value, returning a substitute value or
 * throwing an errors depending on option `skipUnexpected`.
 * @param decres Decoding result to add the error to (if appropriate).
 * @param context Description of where the tag is.
 * @param message Description of the unexpected value.
 * @param substitute Value to substitute (if appropriate).
 * @param options Control the processing of the check.
 * @returns Decode result with the substitute value and an error.
 */
declare function unexpected<T>(decres: DecodeResult<T> | Array<Error>, context: string, message: string | undefined, substitute: T, options?: DecodeOptions): DecodeResult<T>;
/**
 * Skip over a single value in the stream when it is not recognized.
 * @param reader Reader to skip over the next tag for.
 */
declare function skipNext(reader: Ber.Reader): void;
