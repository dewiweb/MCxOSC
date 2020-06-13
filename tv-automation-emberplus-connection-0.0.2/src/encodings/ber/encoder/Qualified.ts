import * as Ber from '../../../Ber'
import { EmberElement, ElementType } from '../../../model/EmberElement'
import { encodeTree } from './Tree'
import { QualifiedElement } from '../../../types/types'
import {
	QualifiedFunctionBERID,
	QualifiedMatrixBERID,
	QualifiedNodeBERID,
	QualifiedParameterBERID,
	QualifiedTemplateBERID
} from '../constants'

// note, this no longer encodes a full element, only the start
export function encodeQualifedElement(
	el: QualifiedElement<EmberElement>,
	writer: Ber.Writer
): void {
	switch (el.contents.type) {
		case ElementType.Function:
			writer.startSequence(QualifiedFunctionBERID)
			break
		case ElementType.Matrix:
			writer.startSequence(QualifiedMatrixBERID)
			break
		case ElementType.Node:
			writer.startSequence(QualifiedNodeBERID)
			break
		case ElementType.Parameter:
			writer.startSequence(QualifiedParameterBERID)
			break
		case ElementType.Template:
			writer.startSequence(QualifiedTemplateBERID)
			break
	}

	writer.startSequence(Ber.CONTEXT(0))
	writer.writeRelativeOID(el.path, Ber.BERDataTypes.RELATIVE_OID)
	writer.endSequence()

	encodeTree(el, writer)
}
