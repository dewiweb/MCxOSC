import { EmberTypedValue } from '../types/types';
export { InvocationResult, InvocationResultImpl };
/**
 *  Result of a function invocation, sent from provider to consumer.
 */
interface InvocationResult {
    /** Matches the invocation identifier */
    id: number;
    /** True if no errors were encountered when executing the function. */
    success?: boolean;
    /** Return value of the function call, matching the expected result tyoes. */
    result?: Array<EmberTypedValue>;
}
declare class InvocationResultImpl implements InvocationResult {
    id: number;
    success?: boolean | undefined;
    result?: EmberTypedValue[] | undefined;
    constructor(id: number, success?: boolean | undefined, result?: EmberTypedValue[] | undefined);
}
