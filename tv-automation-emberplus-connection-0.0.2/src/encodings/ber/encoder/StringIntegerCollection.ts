import * as Ber from '../../../Ber'
import { StringIntegerCollection } from '../../../types/types'
import { StringIntegerCollectionBERID, StringIntegerPairBERID } from '../constants'

export function encodeStringIntegerCollection(
	collection: StringIntegerCollection,
	writer: Ber.Writer
): void {
	writer.startSequence(StringIntegerCollectionBERID)
	for (const [key, value] of collection) {
		writer.startSequence(Ber.CONTEXT(0))

		writer.startSequence(StringIntegerPairBERID)
		writer.startSequence(Ber.CONTEXT(0))
		writer.writeString(key, Ber.BERDataTypes.STRING)
		writer.endSequence()
		writer.startSequence(Ber.CONTEXT(1))
		writer.writeInt(value)
		writer.endSequence()
		writer.endSequence()

		writer.endSequence()
	}
	writer.endSequence()
}
