import * as Ber from '../../../Ber';
import { Invocation } from '../../../model/Invocation';
import { DecodeOptions, DecodeResult } from './DecodeResult';
export { decodeInvocation };
declare function decodeInvocation(reader: Ber.Reader, options?: DecodeOptions): DecodeResult<Invocation>;
