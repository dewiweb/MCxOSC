/// <reference types="node" />
import { Root, RootType } from '../../types/types';
import { DecodeResult, DecodeOptions } from './decoder/DecodeResult';
export { berEncode, berDecode };
declare function berEncode(el: Root, rootType: RootType): Buffer;
declare function berDecode(b: Buffer, options?: DecodeOptions): DecodeResult<Root>;
