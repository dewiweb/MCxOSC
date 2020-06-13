import { NumberedTreeNode, TreeElement } from '../../../types/types';
import * as Ber from '../../../Ber';
import { EmberElement } from '../../../model/EmberElement';
export declare function encodeNumberedElement(el: NumberedTreeNode<EmberElement>, writer: Ber.Writer): void;
export declare function encodeTree(el: TreeElement<EmberElement>, writer: Ber.Writer): void;
