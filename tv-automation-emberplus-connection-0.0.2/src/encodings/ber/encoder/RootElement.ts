import { RootElement } from '../../../types/types'
import { Writer } from '../../../Ber'
import { encodeNumberedElement } from './Tree'
import { encodeQualifedElement } from './Qualified'

export function encodeRootElement(el: RootElement, writer: Writer): void {
	if ('path' in el) {
		encodeQualifedElement(el, writer)
	} else {
		encodeNumberedElement(el, writer)
	}
}
