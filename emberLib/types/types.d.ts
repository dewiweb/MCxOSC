/// <reference types="node" />
import { EmberElement } from '../model/EmberElement';
import { EmberFunction } from '../model/EmberFunction';
import { Parameter, ParameterType } from '../model/Parameter';
import { Template } from '../model/Template';
import { Matrix } from '../model/Matrix';
import { EmberNode } from '../model/EmberNode';
import { StreamEntry } from '../model/StreamEntry';
import { InvocationResult } from '../model/InvocationResult';
import { TreeElement, NumberedTreeNode, QualifiedElement } from '../model/Tree';
export { TreeElement, NumberedTreeNode, QualifiedElement, EmberTreeNode, EmberValue, EmberTypedValue, Root, RootElement, MinMax, StringIntegerCollection, RootType, RelativeOID, literal, Collection };
declare type EmberTreeNode<T extends EmberElement> = NumberedTreeNode<T>;
declare type RootElement = NumberedTreeNode<EmberElement> | QualifiedElement<Parameter> | QualifiedElement<EmberNode> | QualifiedElement<Matrix> | QualifiedElement<EmberFunction> | QualifiedElement<Template>;
declare type Root = Collection<RootElement> | Collection<StreamEntry> | InvocationResult;
declare enum RootType {
    Elements = 0,
    Streams = 1,
    InvocationResult = 2
}
declare type EmberValue = number | string | boolean | Buffer | null;
interface EmberTypedValue {
    type: ParameterType;
    value: EmberValue;
}
declare type MinMax = number | null;
declare type StringIntegerCollection = Map<string, number>;
declare type RelativeOID = string;
declare function literal<T>(arg: T): T;
declare type Collection<T> = {
    [index: number]: T;
};
