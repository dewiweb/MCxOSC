import * as Ber from '../../../Ber';
import { EmberElement } from '../../../model/EmberElement';
import { NumberedTreeNode, TreeElement } from '../../../model/Tree';
import { RootElement, Collection } from '../../../types/types';
import { DecodeResult, DecodeOptions } from './DecodeResult';
export declare function decodeChildren(reader: Ber.Reader, options?: DecodeOptions): DecodeResult<Collection<NumberedTreeNode<EmberElement>>>;
export declare function decodeGenericElement(reader: Ber.Reader, options?: DecodeOptions): DecodeResult<TreeElement<EmberElement>>;
export declare function decodeRootElements(reader: Ber.Reader, options?: DecodeOptions): DecodeResult<Collection<RootElement>>;
