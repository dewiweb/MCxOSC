import * as Ber from '../../../Ber';
import { Template } from '../../../model/Template';
import { TreeElement } from '../../../types/types';
import { DecodeOptions, DecodeResult } from './DecodeResult';
export declare function decodeTemplate(reader: Ber.Reader, isQualified?: boolean, options?: DecodeOptions): DecodeResult<TreeElement<Template>>;
