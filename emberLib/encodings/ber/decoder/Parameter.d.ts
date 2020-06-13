import * as Ber from '../../../Ber';
import { Parameter, ParameterType } from '../../../model/Parameter';
import { DecodeOptions, DecodeResult } from './DecodeResult';
export { decodeParameter, readParameterType };
declare function decodeParameter(reader: Ber.Reader, options?: DecodeOptions): DecodeResult<Parameter>;
declare function readParameterType(value: number, options: DecodeOptions): DecodeResult<ParameterType>;
