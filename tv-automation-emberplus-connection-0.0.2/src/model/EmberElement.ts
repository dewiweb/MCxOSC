export { ElementType, EmberElement, isEmberElement }

/** Type specifyer for ember elements. */
enum ElementType {
	Parameter = 'PARAMETER',
	Node = 'NODE',
	Command = 'COMMAND',
	Matrix = 'MATRIX',
	Function = 'FUNCTION',
	Template = 'TEMPLATE'
}

/** Generic type for all ember elements. */
interface EmberElement {
	type: ElementType
}

function isEmberElement(obj: any): obj is EmberElement {
	if (obj === undefined || obj === null) {
		return false
	}

	const { type } = obj

	if (!type || !Object.values(ElementType as any).includes(type)) {
		return false
	}

	return true
}
