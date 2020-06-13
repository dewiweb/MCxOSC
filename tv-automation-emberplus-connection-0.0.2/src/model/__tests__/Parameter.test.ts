import { isParameter, ParameterType, Parameter } from '../Parameter'
import { ElementType } from '../EmberElement'

describe('model/Parameter', () => {
	describe('isParameter()', () => {
		const validParameter: Parameter = {
			type: ElementType.Parameter,
			parameterType: ParameterType.Integer,
			templateReference: '1'
			// number: 1
			// templateReference: {
			// 	resolve: () => ({ value: { number: 1, type: ElementType.Template } })
			// }
		}

		describe('mandatory properties', () => {
			test('should pass when all mandatory properties are present and their values valid', () => {
				const actual = isParameter(validParameter)

				expect(actual).toBe(true)
			})

			test('should fail when missing type property', () => {
				const invalid = Object.assign({}, validParameter)
				delete invalid.type

				const actual = isParameter(invalid)

				expect(actual).toBe(false)
			})

			test('should fail when type property is not Parameter', () => {
				const invalid: any = Object.assign({}, validParameter, {
					type: ElementType.Node
				})

				const actual = isParameter(invalid)

				expect(actual).toBe(false)
			})

			test('should fail when missing parameterType property', () => {
				const invalid = Object.assign({}, validParameter)
				delete invalid.parameterType

				const actual = isParameter(invalid)

				expect(actual).toBe(false)
			})

			test('should fail when missing templateReference property', () => {
				const invalid = Object.assign({}, validParameter)
				delete invalid.templateReference

				const actual = isParameter(invalid)

				expect(actual).toBe(false)
			})
		})
	})
})
