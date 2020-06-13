import * as Ber from '../../../Ber';
import { StreamDescription } from '../../../model/StreamDescription';
import { DecodeOptions, DecodeResult } from './DecodeResult';
export declare function decodeStreamDescription(reader: Ber.Reader, options?: DecodeOptions): DecodeResult<StreamDescription>;
