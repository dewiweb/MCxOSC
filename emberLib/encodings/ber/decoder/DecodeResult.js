"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skipNext = exports.unexpected = exports.appendErrors = exports.guarded = exports.safeSet = exports.unknownApplication = exports.unknownContext = exports.makeResult = exports.DecodeError = exports.check = exports.whatever = exports.defaultDecode = void 0;
const types_1 = require("../../../types/types");
/**
 * Default decoding values. Prevents throwing exceptions while decoding.
 */
const defaultDecode = types_1.literal({
    skipApplicationTags: true,
    skipContextTags: true,
    substituteForRequired: true,
    skipUnexpected: true
});
exports.defaultDecode = defaultDecode;
/**
 * Return the decoded result whatever errors are reported.
 * @param decres Result of decoding.
 * @returns Candidate result of decoding, ignoring any errors.
 * @
 */
function whatever(decres) {
    return decres.value;
}
exports.whatever = whatever;
/**
 * Compound error containing details of all problems encountered when
 * decoding an EmberPlus BER stream.
 */
class DecodeError extends Error {
    /**
     * Create an error with details of decoding issues.
     * @param errors List of decoding sub-errors.
     */
    constructor(errors) {
        super(`Decoding failed. Errors are:\n${errors.join('\n')}`);
        this.sub = errors;
    }
}
exports.DecodeError = DecodeError;
/**
 * Return the decoded result if no errors, otherwise throw a summary error.
 * @param decres Result of decoding.
 * @returns Candidate result of decoding, only if no errors.
 * @throws Summary when errors exists.
 */
function guarded(decres) {
    if (decres.errors && decres.errors.length > 0) {
        throw new DecodeError(decres.errors);
    }
    return decres.value;
}
exports.guarded = guarded;
/**
 * Make a decoded result from an initial value with an empty list if errors.
 * @param t Value to embed in the initial result.
 */
function makeResult(t, errors) {
    return types_1.literal({
        value: t,
        errors: Array.isArray(errors) ? errors : []
    });
}
exports.makeResult = makeResult;
/**
 * Process a decoding problem when a context parameter tag is not recognized.
 * @param decres Decoding result to add the error to (if appropriate).
 * @param context Description of where the tag is.
 * @param tag Unrecognized tag.
 * @param options Control the processing of the error.
 */
function unknownContext(decres, context, tag, options = defaultDecode) {
    const err = new Error(`${context}: Unexpected BER context tag '${tag}'`);
    let errors = Array.isArray(decres) ? decres : decres.errors;
    if (options.skipContextTags) {
        if (!errors) {
            errors = [];
        }
        errors.push(err);
        if (!Array.isArray(decres)) {
            decres.errors = errors;
        }
    }
    else {
        throw err;
    }
}
exports.unknownContext = unknownContext;
/**
 * Process a decoding problem when an application tag is not recognized.
 * @param decres Decoding result to add the error to (if appropriate).
 * @param context Description of where the tag is.
 * @param tag Unrecognized tag.
 * @param options Control the processing of the error.
 */
function unknownApplication(decres, context, tag, options = defaultDecode) {
    const err = new Error(`${context}: Unexpected BER application tag '${tag}'`);
    let errors = Array.isArray(decres) ? decres : decres.errors;
    if (options.skipApplicationTags) {
        if (!errors) {
            errors = [];
        }
        errors.push(err);
        if (!Array.isArray(decres)) {
            decres.errors = errors;
        }
    }
    else {
        throw err;
    }
}
exports.unknownApplication = unknownApplication;
/**
 * Safely update a value from another decoding stage, merging errors.
 * @param result Result of a decoding stage.
 * @param update Value to be updated.
 * @param fn Function to use to update a value with the result.
 */
function safeSet(result, update, fn) {
    if (result.errors && result.errors.length > 0) {
        update.errors = update.errors ? update.errors.concat(result.errors) : result.errors;
    }
    update.value = fn(result.value, update.value);
    return update;
}
exports.safeSet = safeSet;
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
function check(value, context, propertyName, substitute, decres, options = defaultDecode) {
    if (value === null || value === undefined) {
        const errMsg = `${context}: For required property '${propertyName}', value is missing.`;
        if (options.substituteForRequired) {
            let errors = Array.isArray(decres) ? decres : decres.errors;
            if (!errors) {
                errors = [];
            }
            errors.push(new Error(errMsg + ` Substituting '${substitute}'`));
            if (!Array.isArray(decres)) {
                decres.errors = errors;
            }
            return substitute;
        }
        else {
            throw new Error(errMsg);
        }
    }
    return value;
}
exports.check = check;
/**
 * Extend an error list using any errors in the given source, returning the
 * source value.
 * @param source Decoding result to split apart.
 * @param decres Decoding result to extend the error list of or a stand alone
 * error list.
 * @returns The value embedded in the source.
 */
function appendErrors(source, decres) {
    if (source.errors && source.errors.length > 0) {
        if (Array.isArray(decres)) {
            decres.push(...source.errors);
        }
        else {
            decres.errors = decres.errors ? decres.errors.concat(source.errors) : source.errors;
        }
    }
    return source.value;
}
exports.appendErrors = appendErrors;
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
function unexpected(decres, context, message = '', substitute, options = defaultDecode) {
    let errors = Array.isArray(decres) ? decres : decres.errors;
    const err = new Error(`${context}${message ? ': ' + message : ''}`);
    if (options.skipUnexpected) {
        if (!errors) {
            errors = [];
        }
        errors.push(err);
        if (Array.isArray(decres)) {
            return makeResult(substitute, errors);
        }
        else {
            decres.errors = errors;
            decres.value = substitute;
            return decres;
        }
    }
    else {
        throw err;
    }
}
exports.unexpected = unexpected;
/**
 * Skip over a single value in the stream when it is not recognized.
 * @param reader Reader to skip over the next tag for.
 */
function skipNext(reader) {
    const skipTag = reader.peek();
    if (skipTag) {
        reader.readString(skipTag, true);
    }
}
exports.skipNext = skipNext;
