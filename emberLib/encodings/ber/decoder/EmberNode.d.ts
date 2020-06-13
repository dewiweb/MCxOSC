import * as Ber from '../../../Ber';
import { EmberNode } from '../../../model/EmberNode';
import { DecodeOptions, DecodeResult } from './DecodeResult';
export { decodeNode };
declare function decodeNode(reader: Ber.Reader, options?: DecodeOptions): DecodeResult<EmberNode>;
