import * as Ber from '../../../Ber'
import { StreamEntry } from '../../../model/StreamEntry'
import { StreamEntryBERID } from '../constants'

export function encodeStreamEntry(entry: StreamEntry, ber: Ber.Writer): void {
	ber.startSequence(StreamEntryBERID)
	if (entry.identifier !== null) {
		ber.startSequence(Ber.CONTEXT(0))
		ber.writeInt(entry.identifier)
		ber.endSequence()
	}
	if (entry.value !== null) {
		ber.startSequence(Ber.CONTEXT(1))
		ber.writeValue(entry.value)
		ber.endSequence()
	}
	ber.endSequence()
}
