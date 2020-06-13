"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../../types/types");
const DecodeResult_1 = require("../decoder/DecodeResult");
describe('encodings/ver/DecodeResult - default settings', () => {
    const goodResult = types_1.literal({
        value: 42
    });
    const resultEmptyErrors = types_1.literal({
        value: 42,
        errors: []
    });
    const resultWithError = types_1.literal({
        value: 42,
        errors: [new Error('decode wibbly wobble: tag was junk')]
    });
    test('whatever', () => {
        expect(DecodeResult_1.whatever(goodResult)).toBe(42);
        expect(DecodeResult_1.whatever(resultEmptyErrors)).toBe(42);
        expect(DecodeResult_1.whatever(resultWithError)).toBe(42);
    });
    test('guarded', () => {
        expect(DecodeResult_1.guarded(goodResult)).toBe(42);
        expect(DecodeResult_1.guarded(resultEmptyErrors)).toBe(42);
        expect(() => DecodeResult_1.guarded(resultWithError)).toThrow(/wibbly wobble/);
    });
    test('makeResult', () => {
        expect(DecodeResult_1.makeResult(42)).toEqual(resultEmptyErrors);
        expect(DecodeResult_1.makeResult(42, resultWithError.errors)).toEqual(resultWithError);
    });
    test('unknownContext - decode result, number tag', () => {
        var _a;
        const updateMe = Object.assign({}, goodResult);
        DecodeResult_1.unknownContext(updateMe, 'decode wibbly wobble', 42, DecodeResult_1.defaultDecode);
        expect(updateMe.errors).toHaveLength(1);
        expect((_a = updateMe.errors) === null || _a === void 0 ? void 0 : _a.toString()).toMatch(/Unexpected BER context tag '42'/);
        expect(updateMe.value).toBe(42);
    });
    test('unknownContext - decode result, null tag', () => {
        var _a;
        const updateMe = Object.assign({}, goodResult);
        DecodeResult_1.unknownContext(updateMe, 'decode wibbly wobble', null, DecodeResult_1.defaultDecode);
        expect(updateMe.errors).toHaveLength(1);
        expect((_a = updateMe.errors) === null || _a === void 0 ? void 0 : _a.toString()).toMatch(/Unexpected BER context tag 'null'/);
        expect(updateMe.value).toBe(42);
    });
    test('unknownContext - error array, number tag', () => {
        const updateMe = new Array();
        DecodeResult_1.unknownContext(updateMe, 'decode wibbly wobble', 42, DecodeResult_1.defaultDecode);
        expect(updateMe).toHaveLength(1);
        expect(updateMe.toString()).toMatch(/Unexpected BER context tag '42'/);
    });
    test('unknownContext - error array, null tag', () => {
        const updateMe = new Array();
        DecodeResult_1.unknownContext(updateMe, 'decode wibbly wobble', null, DecodeResult_1.defaultDecode);
        expect(updateMe).toHaveLength(1);
        expect(updateMe.toString()).toMatch(/Unexpected BER context tag 'null'/);
    });
    test('unknownApplication - decode result, number tag', () => {
        var _a;
        const updateMe = Object.assign({}, goodResult);
        DecodeResult_1.unknownApplication(updateMe, 'decode wibbly wobble', 42, DecodeResult_1.defaultDecode);
        expect(updateMe.errors).toHaveLength(1);
        expect((_a = updateMe.errors) === null || _a === void 0 ? void 0 : _a.toString()).toMatch(/Unexpected BER application tag '42'/);
        expect(updateMe.value).toBe(42);
    });
    test('unknownApplication - decode result, null tag', () => {
        var _a;
        const updateMe = Object.assign({}, goodResult);
        DecodeResult_1.unknownApplication(updateMe, 'decode wibbly wobble', null, DecodeResult_1.defaultDecode);
        expect(updateMe.errors).toHaveLength(1);
        expect((_a = updateMe.errors) === null || _a === void 0 ? void 0 : _a.toString()).toMatch(/Unexpected BER application tag 'null'/);
        expect(updateMe.value).toBe(42);
    });
    test('unknownApplication - error array, number tag', () => {
        const updateMe = new Array();
        DecodeResult_1.unknownApplication(updateMe, 'decode wibbly wobble', 42, DecodeResult_1.defaultDecode);
        expect(updateMe).toHaveLength(1);
        expect(updateMe.toString()).toMatch(/Unexpected BER application tag '42'/);
    });
    test('unknownApplication - error array, null tag', () => {
        const updateMe = new Array();
        DecodeResult_1.unknownApplication(updateMe, 'decode wibbly wobble', null, DecodeResult_1.defaultDecode);
        expect(updateMe).toHaveLength(1);
        expect(updateMe.toString()).toMatch(/Unexpected BER application tag 'null'/);
    });
    test('safeSet - no error', () => {
        const result = Object.assign({}, goodResult);
        const update = DecodeResult_1.makeResult([41]);
        expect(DecodeResult_1.safeSet(result, update, (x, y) => {
            y.push(x);
            return y;
        })).toEqual({
            value: [41, 42],
            errors: []
        });
    });
    test('safeSet - empty error', () => {
        const result = Object.assign({}, resultEmptyErrors);
        const update = DecodeResult_1.makeResult([41]);
        expect(DecodeResult_1.safeSet(result, update, (x, y) => {
            y.push(x);
            return y;
        })).toEqual({
            value: [41, 42],
            errors: []
        });
    });
    test('safeSet - wtih source error', () => {
        const result = Object.assign({}, resultWithError);
        const update = DecodeResult_1.makeResult([41]);
        expect(DecodeResult_1.safeSet(result, update, (x, y) => {
            y.push(x);
            return y;
        })).toEqual({
            value: [41, 42],
            errors: resultWithError.errors
        });
    });
    test('safeSet - wtih target error', () => {
        const result = Object.assign({}, goodResult);
        const update = DecodeResult_1.makeResult([41], [new Error(`Second error`)]);
        expect(DecodeResult_1.safeSet(result, update, (x, y) => {
            y.push(x);
            return y;
        })).toEqual({
            value: [41, 42],
            errors: [new Error(`Second error`)]
        });
    });
    test('safeSet - wtih source & target error', () => {
        const result = Object.assign({}, resultWithError);
        const update = DecodeResult_1.makeResult([41], [new Error(`Second error`)]);
        expect(DecodeResult_1.safeSet(result, update, (x, y) => {
            y.push(x);
            return y;
        })).toEqual({
            value: [41, 42],
            errors: [new Error(`Second error`), resultWithError.errors[0]] // eslint-disable-line @typescript-eslint/no-non-null-assertion
        });
        expect(resultWithError.errors).toHaveLength(1);
    });
    test('check - decode result, good value', () => {
        let id = 84;
        const result = Object.assign({}, goodResult);
        id = DecodeResult_1.check(id, 'decode wibbly wobble', 'id', -1, result, DecodeResult_1.defaultDecode);
        expect(id).toBe(84);
        expect(result.errors).toBeUndefined();
    });
    test('check - decode result, null value', () => {
        var _a;
        let id = null;
        const result = Object.assign({}, goodResult);
        id = DecodeResult_1.check(id, 'decode wibbly wobble', 'id', -1, result, DecodeResult_1.defaultDecode);
        expect(id).toBe(-1);
        expect(result.errors).toHaveLength(1);
        expect((_a = result.errors) === null || _a === void 0 ? void 0 : _a.toString()).toMatch(/For required property 'id', value is missing/);
    });
    test('check - error array, good value', () => {
        let id = 84;
        const result = new Array();
        id = DecodeResult_1.check(id, 'decode wibbly wobble', 'id', -1, result, DecodeResult_1.defaultDecode);
        expect(id).toBe(84);
        expect(result).toHaveLength(0);
    });
    test('check - error array, null value', () => {
        let id = undefined;
        const result = new Array();
        id = DecodeResult_1.check(id, 'decode wibbly wobble', 'id', -1, result, DecodeResult_1.defaultDecode);
        expect(id).toBe(-1);
        expect(result).toHaveLength(1);
        expect(result.toString()).toMatch(/For required property 'id', value is missing/);
    });
    test('appendErrors - extract, no change', () => {
        const source = Object.assign({}, goodResult);
        const base = Object.assign({}, resultWithError);
        expect(DecodeResult_1.appendErrors(source, base)).toBe(42);
        expect(source).toEqual(goodResult);
        expect(base).toEqual(resultWithError);
    });
    test('appendErrors - extract, new error on empty', () => {
        const source = Object.assign({}, resultWithError);
        const base = Object.assign({}, goodResult);
        expect(DecodeResult_1.appendErrors(source, base)).toBe(42);
        expect(source).toEqual(resultWithError);
        expect(base).toEqual(resultWithError);
    });
    test('appendErrors - extract, new error on existing', () => {
        const source = Object.assign({}, resultWithError);
        const base = Object.assign({}, resultWithError);
        expect(DecodeResult_1.appendErrors(source, base)).toBe(42);
        expect(source).toEqual(resultWithError);
        expect(base.errors).toHaveLength(2);
        expect(base.errors[0]).toEqual(base.errors[1]); // eslint-disable-line @typescript-eslint/no-non-null-assertion
    });
    test('unexpected - decode result', () => {
        const updateMe = Object.assign({}, goodResult);
        expect(DecodeResult_1.unexpected(updateMe, 'decode wibbly wobble', 'a message to you', 99, DecodeResult_1.defaultDecode)).toEqual(DecodeResult_1.makeResult(99, [new Error('decode wibbly wobble: a message to you')]));
    });
    test('unexpected - error array', () => {
        const updateMe = new Array();
        expect(DecodeResult_1.unexpected(updateMe, 'decode wibbly wobble', 'a message to you', 99, DecodeResult_1.defaultDecode)).toEqual(DecodeResult_1.makeResult(99, [new Error('decode wibbly wobble: a message to you')]));
    });
    test('all equal in the end', () => {
        expect(goodResult).toEqual(types_1.literal({ value: 42 }));
        expect(resultEmptyErrors).toEqual(types_1.literal({
            value: 42,
            errors: []
        }));
        expect(resultWithError).toEqual(types_1.literal({
            value: 42,
            errors: [new Error('decode wibbly wobble: tag was junk')]
        }));
    });
});
describe('encodings/ver/DecodeResult - expect to throw', () => {
    const goodResult = types_1.literal({
        value: 42
    });
    const triggerThrow = types_1.literal({
        skipApplicationTags: false,
        skipContextTags: false,
        substituteForRequired: false,
        skipUnexpected: false
    });
    test('unknownContext - decode result, number tag', () => {
        const updateMe = Object.assign({}, goodResult);
        expect(() => DecodeResult_1.unknownContext(updateMe, 'decode wibbly wobble', 42, triggerThrow)).toThrow();
        expect(updateMe.errors).toBeUndefined();
    });
    test('unknownContext - decode result, null tag', () => {
        const updateMe = Object.assign({}, goodResult);
        expect(() => DecodeResult_1.unknownContext(updateMe, 'decode wibbly wobble', null, triggerThrow)).toThrow();
        expect(updateMe.errors).toBeUndefined();
    });
    test('unknownContext - error array, number tag', () => {
        const updateMe = new Array();
        expect(() => DecodeResult_1.unknownContext(updateMe, 'decode wibbly wobble', 42, triggerThrow)).toThrow();
        expect(updateMe).toHaveLength(0);
    });
    test('unknownContext - error array, null tag', () => {
        const updateMe = new Array();
        expect(() => DecodeResult_1.unknownContext(updateMe, 'decode wibbly wobble', null, triggerThrow)).toThrow();
        expect(updateMe).toHaveLength(0);
    });
    test('unknownApplication - decode result, number tag', () => {
        const updateMe = Object.assign({}, goodResult);
        expect(() => DecodeResult_1.unknownApplication(updateMe, 'decode wibbly wobble', 42, triggerThrow)).toThrow();
        expect(updateMe.errors).toBeUndefined();
    });
    test('unknownApplication - decode result, null tag', () => {
        const updateMe = Object.assign({}, goodResult);
        expect(() => DecodeResult_1.unknownApplication(updateMe, 'decode wibbly wobble', null, triggerThrow)).toThrow();
        expect(updateMe.errors).toBeUndefined();
    });
    test('unknownApplication - error array, number tag', () => {
        const updateMe = new Array();
        expect(() => DecodeResult_1.unknownApplication(updateMe, 'decode wibbly wobble', 42, triggerThrow)).toThrow();
        expect(updateMe).toHaveLength(0);
    });
    test('unknownApplication - error array, null tag', () => {
        const updateMe = new Array();
        expect(() => DecodeResult_1.unknownApplication(updateMe, 'decode wibbly wobble', null, triggerThrow)).toThrow();
        expect(updateMe).toHaveLength(0);
    });
    test('check - decode result, good value', () => {
        let id = 84;
        const result = Object.assign({}, goodResult);
        id = DecodeResult_1.check(id, 'decode wibbly wobble', 'id', -1, result, triggerThrow);
        expect(id).toBe(84);
        expect(result.errors).toBeUndefined();
    });
    test('check - decode result, null value', () => {
        let id = null;
        const result = Object.assign({}, goodResult);
        expect(() => {
            id = DecodeResult_1.check(id, 'decode wibbly wobble', 'id', -1, result, triggerThrow);
        }).toThrow();
        expect(id).toBe(null);
        expect(result.errors).toBeUndefined();
    });
    test('check - error array, good value', () => {
        let id = 84;
        const result = new Array();
        id = DecodeResult_1.check(id, 'decode wibbly wobble', 'id', -1, result, triggerThrow);
        expect(id).toBe(84);
        expect(result).toHaveLength(0);
    });
    test('check - error array, null value', () => {
        let id = undefined;
        const result = new Array();
        expect(() => {
            id = DecodeResult_1.check(id, 'decode wibbly wobble', 'id', -1, result, triggerThrow);
        }).toThrow();
        expect(id).toBe(undefined);
        expect(result).toHaveLength(0);
    });
    test('unexpected - decode result', () => {
        const updateMe = Object.assign({}, goodResult);
        expect(() => DecodeResult_1.unexpected(updateMe, 'decode wibbly wobble', 'a message to you', 99, triggerThrow)).toThrow();
    });
    test('unexpected - error array', () => {
        const updateMe = new Array();
        expect(() => DecodeResult_1.unexpected(updateMe, 'decode wibbly wobble', 'a message to you', 99, triggerThrow)).toThrow();
    });
});
