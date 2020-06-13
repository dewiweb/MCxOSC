"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmberElement_1 = require("../EmberElement");
describe('model/EmberElement', () => {
    describe('isEmberElement()', () => {
        describe('non-object inputs', () => {
            test('should fail for null input', () => {
                const actual = EmberElement_1.isEmberElement(null);
                expect(actual).toBe(false);
            });
            test('should fail for no input', () => {
                // typescript blocks a call with no args, but explicit undefined is just as good
                const actual = EmberElement_1.isEmberElement(undefined);
                expect(actual).toBe(false);
            });
            test('should fail for string input', () => {
                const actual = EmberElement_1.isEmberElement('not good enough');
                expect(actual).toBe(false);
            });
        });
        describe('Parameter type', () => {
            test('should be true when number property has a number value', () => {
                const actual = EmberElement_1.isEmberElement({ type: EmberElement_1.ElementType.Parameter });
                expect(actual).toBe(true);
            });
            test('should be true when input has no number property', () => {
                const actual = EmberElement_1.isEmberElement({ type: EmberElement_1.ElementType.Parameter });
                expect(actual).toBe(true);
            });
        });
        describe('Node type', () => {
            test('should be true when number property has a number value', () => {
                const actual = EmberElement_1.isEmberElement({ type: EmberElement_1.ElementType.Node, number: 0 });
                expect(actual).toBe(true);
            });
            test('should be true when input has no number property', () => {
                const actual = EmberElement_1.isEmberElement({ type: EmberElement_1.ElementType.Parameter });
                expect(actual).toBe(true);
            });
        });
        describe('Missing/invalid parameter type property', () => {
            test('should fail with invalid type property', () => {
                const actual = EmberElement_1.isEmberElement({ type: -47, number: 42 });
                expect(actual).toBe(false);
            });
            test('should fail with valid number value', () => {
                const actual = EmberElement_1.isEmberElement({ number: 0 });
                expect(actual).toBe(false);
            });
            test('should fail with missing number value', () => {
                const actual = EmberElement_1.isEmberElement({ thisIs: 'irrelevant' });
                expect(actual).toBe(false);
            });
            test('should fail with invalid number value', () => {
                const actual = EmberElement_1.isEmberElement({ number: 'whatever' });
                expect(actual).toBe(false);
            });
        });
    });
});
