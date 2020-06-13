import * as Ber from '../../../Ber';
import { Label } from '../../../model/Label';
import { DecodeOptions, DecodeResult } from './DecodeResult';
export { decodeLabel };
declare function decodeLabel(reader: Ber.Reader, options?: DecodeOptions): DecodeResult<Label>;
