import { Writer } from '../Writer'
import { BERDataTypes } from '..'
import { Reader } from '../Reader'
import { ParameterType } from '../../model/Parameter'

describe('BER', () => {
	describe('Roundtrip', () => {
		test('writeReal - readReal', () => {
			const w = new Writer()
			w.writeReal(8.32, BERDataTypes.REAL)

			const r = new Reader(w.buffer)
			const tag = r.peek()
			expect(tag).toEqual(BERDataTypes.REAL)
			const s = r.readReal()
			expect(s).toEqual(8.32)
		})
		test('writeReal - readValue', () => {
			const w = new Writer()
			w.writeReal(8.32, BERDataTypes.REAL)

			const r = new Reader(w.buffer)
			const tag = r.peek()
			expect(tag).toEqual(BERDataTypes.REAL)
			const s = r.readValue()
			expect(s).toEqual({ value: 8.32, type: ParameterType.Real })
		})
		test('writeValue - readValue', () => {
			const w = new Writer()
			w.writeValue({ value: 8.32, type: ParameterType.Real })

			const r = new Reader(w.buffer)
			const tag = r.peek()
			expect(tag).toEqual(BERDataTypes.REAL)
			const s = r.readValue()
			expect(s).toEqual({ value: 8.32, type: ParameterType.Real })
		})
		test('writeValue - readValue (input int)', () => {
			const w = new Writer()
			w.writeValue({ value: 4, type: ParameterType.Real })

			const r = new Reader(w.buffer)
			const tag = r.peek()
			expect(tag).toEqual(BERDataTypes.REAL)
			const s = r.readValue()
			expect(s).toEqual({ value: 4, type: ParameterType.Real })
		})
	})
})
