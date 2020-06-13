import * as Ber from '../../../Ber';
import { Command } from '../../../model/Command';
import { DecodeOptions, DecodeResult } from './DecodeResult';
export { decodeCommand };
declare function decodeCommand(reader: Ber.Reader, options?: DecodeOptions): DecodeResult<Command>;
