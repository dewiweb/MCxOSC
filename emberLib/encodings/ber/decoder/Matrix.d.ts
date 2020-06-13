import * as Ber from '../../../Ber';
import { Matrix } from '../../../model/Matrix';
import { TreeElement } from '../../../model/Tree';
import { DecodeOptions, DecodeResult } from './DecodeResult';
export { decodeMatrix };
declare function decodeMatrix(reader: Ber.Reader, isQualified?: boolean, options?: DecodeOptions): DecodeResult<TreeElement<Matrix>>;
