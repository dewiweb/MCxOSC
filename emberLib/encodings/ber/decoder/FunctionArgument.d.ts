import * as Ber from '../../../Ber';
import { FunctionArgument } from '../../../model/FunctionArgument';
import { DecodeOptions, DecodeResult } from './DecodeResult';
export { decodeFunctionArgument };
declare function decodeFunctionArgument(reader: Ber.Reader, options?: DecodeOptions): DecodeResult<FunctionArgument>;
