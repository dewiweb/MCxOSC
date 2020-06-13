import { ParameterType } from './Parameter';
export { FunctionArgument, FunctionArgumentImpl };
/**
 *  Description of an argument of a function.
 */
interface FunctionArgument {
    /** Type. */
    type: ParameterType;
    /** Name. May be omitted if function takes only one argument. */
    name?: string;
}
declare class FunctionArgumentImpl implements FunctionArgument {
    type: ParameterType;
    name?: string | undefined;
    constructor(type: ParameterType, name?: string | undefined);
}
