"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parameter_1 = require("../Parameter");
const EmberElement_1 = require("../EmberElement");
describe('model/Parameter', () => {
    describe('isParameter()', () => {
        const validParameter = {
            type: EmberElement_1.ElementType.Parameter,
            parameterType: Parameter_1.ParameterType.Integer,
            templateReference: '1'
            // number: 1
            // templateReference: {
            // 	resolve: () => ({ value: { number: 1, type: ElementType.Template } })
            // }
        };
        describe('mandatory properties', () => {
            test('should pass when all mandatory properties are present and their values valid', () => {
                const actual = Parameter_1.isParameter(validParameter);
                expect(actual).toBe(true);
            });
            test('should fail when missing type property', () => {
                const invalid = Object.assign({}, validParameter);
                delete invalid.type;
                const actual = Parameter_1.isParameter(invalid);
                expect(actual).toBe(false);
            });
            test('should fail when type property is not Parameter', () => {
                const invalid = Object.assign({}, validParameter, {
                    type: EmberElement_1.ElementType.Node
                });
                const actual = Parameter_1.isParameter(invalid);
                expect(actual).toBe(false);
            });
            test('should fail when missing parameterType property', () => {
                const invalid = Object.assign({}, validParameter);
                delete invalid.parameterType;
                const actual = Parameter_1.isParameter(invalid);
                expect(actual).toBe(false);
            });
            test('should fail when missing templateReference property', () => {
                const invalid = Object.assign({}, validParameter);
                delete invalid.templateReference;
                const actual = Parameter_1.isParameter(invalid);
                expect(actual).toBe(false);
            });
        });
    });
});
