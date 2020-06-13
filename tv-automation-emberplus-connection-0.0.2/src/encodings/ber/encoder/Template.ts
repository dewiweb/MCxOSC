import * as Ber from '../../../Ber'
import { Template } from '../../../model/Template'
import { encodeNumberedElement } from './Tree'

export function encodeTemplate(template: Template, writer: Ber.Writer): void {
	if (template.element != null) {
		writer.startSequence(Ber.CONTEXT(1))
		encodeNumberedElement(template.element, writer)
		writer.endSequence()
	}

	if (template.description != null) {
		writer.startSequence(Ber.CONTEXT(2))
		writer.writeString(template.description, Ber.BERDataTypes.STRING)
		writer.endSequence()
	}
}
