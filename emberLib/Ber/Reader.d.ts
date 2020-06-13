/// <reference types="node" />
import { Reader } from 'asn1';
import { EmberTypedValue } from '../types/types';
export { ExtendedReader as Reader };
declare class ExtendedReader extends Reader {
    constructor(data: Buffer);
    readValue(): EmberTypedValue;
    readReal(tag?: number): number | null;
}
