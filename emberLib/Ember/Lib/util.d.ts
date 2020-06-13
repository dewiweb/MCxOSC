import { NumberedTreeNode, RootElement } from '../../types/types';
import { EmberElement } from '../../model/EmberElement';
import { Command } from '../../model/Command';
export declare function assertQualifiedEmberNode(node: RootElement): Exclude<RootElement, NumberedTreeNode<EmberElement>>;
export declare function getPath(node: RootElement): string;
export declare function toQualifiedEmberNode(EmberNode: NumberedTreeNode<EmberElement>): Exclude<RootElement, NumberedTreeNode<EmberElement>>;
export declare function insertCommand(node: Exclude<RootElement, NumberedTreeNode<EmberElement>>, command: Command): Exclude<RootElement, NumberedTreeNode<EmberElement>>;
export declare function updateProps<T>(oldProps: T, newProps: T, props?: Array<keyof T>): void;
