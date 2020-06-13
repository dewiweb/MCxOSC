import { EmberElement, ElementType } from '../../../model/EmberElement'
import { Writer } from '../../../Ber'
import { encodeCommand } from './Command'
import { Command } from '../../../model/Command'
import { encodeParameter } from './Parameter'
import { Parameter } from '../../../model/Parameter'
import { encodeNode } from './EmberNode'
import { EmberNode } from '../../../model/EmberNode'
import { encodeMatrix } from './Matrix'
import { Matrix } from '../../../model/Matrix'
import { encodeFunction } from './EmberFunction'
import { EmberFunction } from '../../../model/EmberFunction'
import { encodeTemplate } from './Template'
import { Template } from '../../../model/Template'

export function encodeEmberElement(el: EmberElement, writer: Writer): void {
	switch (el.type) {
		case ElementType.Command:
			encodeCommand(el as Command, writer)
			break
		case ElementType.Parameter:
			encodeParameter(el as Parameter, writer)
			break
		case ElementType.Node:
			encodeNode(el as EmberNode, writer)
			break
		case ElementType.Matrix:
			encodeMatrix(el as Matrix, writer)
			break
		case ElementType.Function:
			encodeFunction(el as EmberFunction, writer)
			break
		case ElementType.Template:
			encodeTemplate(el as Template, writer)
			break
	}
}
