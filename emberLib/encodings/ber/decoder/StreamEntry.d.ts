import * as Ber from '../../../Ber';
import { StreamEntry } from '../../../model/StreamEntry';
import { DecodeResult, DecodeOptions } from './DecodeResult';
export { decodeStreamEntry, decodeStreamEntries };
declare function decodeStreamEntries(reader: Ber.Reader, options?: DecodeOptions): DecodeResult<Array<StreamEntry>>;
declare function decodeStreamEntry(reader: Ber.Reader, options?: DecodeOptions): DecodeResult<StreamEntry>;
