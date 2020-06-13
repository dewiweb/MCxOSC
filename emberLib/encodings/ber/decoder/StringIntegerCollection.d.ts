import * as Ber from '../../../Ber';
import { StringIntegerCollection } from '../../../types/types';
import { DecodeOptions, DecodeResult } from './DecodeResult';
export { decodeStringIntegerCollection };
declare function decodeStringIntegerCollection(reader: Ber.Reader, options?: DecodeOptions): DecodeResult<StringIntegerCollection>;
