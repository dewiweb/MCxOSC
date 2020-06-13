import * as Ber from '../../../Ber';
import { Connection } from '../../../model/Connection';
import { DecodeOptions, DecodeResult } from './DecodeResult';
export { decodeConnection };
declare function decodeConnection(reader: Ber.Reader, options?: DecodeOptions): DecodeResult<Connection>;
