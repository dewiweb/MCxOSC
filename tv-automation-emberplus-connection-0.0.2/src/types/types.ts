import { EmberElement } from '../model/EmberElement'
import { EmberFunction } from '../model/EmberFunction'
import { Parameter, ParameterType } from '../model/Parameter'
import { Template } from '../model/Template'
import { Matrix } from '../model/Matrix'
import { EmberNode } from '../model/EmberNode'
import { StreamEntry } from '../model/StreamEntry'
import { InvocationResult } from '../model/InvocationResult'
import { TreeElement, NumberedTreeNode, QualifiedElement } from '../model/Tree'

export {
	TreeElement,
	NumberedTreeNode,
	QualifiedElement,
	EmberTreeNode,
	EmberValue,
	EmberTypedValue,
	Root,
	RootElement,
	MinMax,
	StringIntegerCollection,
	RootType,
	RelativeOID,
	literal,
	Collection
}

type EmberTreeNode<T extends EmberElement> = NumberedTreeNode<T>
type RootElement =
	| NumberedTreeNode<EmberElement>
	| QualifiedElement<Parameter>
	| QualifiedElement<EmberNode>
	| QualifiedElement<Matrix>
	| QualifiedElement<EmberFunction>
	| QualifiedElement<Template>
type Root = Collection<RootElement> | Collection<StreamEntry> | InvocationResult

enum RootType {
	Elements,
	Streams,
	InvocationResult
}

// number is either Integer64 or REAL
type EmberValue = number | string | boolean | Buffer | null
interface EmberTypedValue {
	type: ParameterType
	value: EmberValue
}

type MinMax = number | null
type StringIntegerCollection = Map<string, number>
type RelativeOID = string

function literal<T>(arg: T): T {
	return arg
}

type Collection<T> = { [index: number]: T }
