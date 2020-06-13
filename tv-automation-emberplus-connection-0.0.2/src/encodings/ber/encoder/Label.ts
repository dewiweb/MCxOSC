import * as Ber from '../../../Ber'
import { Label } from '../../../model/Label'
import { InvalidEmberNode } from '../../../Errors'
import { LabelBERID } from '../constants'

export function encodeLabel(label: Label, writer: Ber.Writer): void {
	writer.startSequence(LabelBERID)
	if (label.basePath == null) {
		throw new InvalidEmberNode('', 'Missing label base path')
	}
	writer.startSequence(Ber.CONTEXT(0))
	writer.writeRelativeOID(label.basePath, Ber.BERDataTypes.RELATIVE_OID)
	writer.endSequence()
	if (label.description == null) {
		throw new InvalidEmberNode('', 'Missing label description')
	}
	writer.startSequence(Ber.CONTEXT(1))
	writer.writeString(label.description, Ber.BERDataTypes.STRING)
	writer.endSequence()
	writer.endSequence()
}
