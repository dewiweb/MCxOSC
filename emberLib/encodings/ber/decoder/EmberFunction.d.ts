import * as Ber from '../../../Ber';
import { EmberFunction } from '../../../model/EmberFunction';
import { DecodeOptions, DecodeResult } from './DecodeResult';
export { decodeFunctionContent };
declare function decodeFunctionContent(reader: Ber.Reader, options?: DecodeOptions): DecodeResult<EmberFunction>;
