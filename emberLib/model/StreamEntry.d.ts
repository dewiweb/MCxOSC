import { EmberTypedValue } from '../types/types';
export { StreamEntry };
interface StreamEntry {
    identifier: number;
    value: EmberTypedValue;
}
export declare class StreamEntryImpl implements StreamEntry {
    identifier: number;
    value: EmberTypedValue;
    constructor(identifier: number, value: EmberTypedValue);
}
