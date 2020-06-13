import * as Ber from '../../../Ber';
import { InvocationResult } from '../../../model/InvocationResult';
import { DecodeOptions, DecodeResult } from './DecodeResult';
export declare function decodeInvocationResult(reader: Ber.Reader, options?: DecodeOptions): DecodeResult<InvocationResult>;
