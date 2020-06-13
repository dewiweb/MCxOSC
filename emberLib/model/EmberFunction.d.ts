import { EmberElement, ElementType } from './EmberElement';
import { FunctionArgument } from './FunctionArgument';
import { RelativeOID } from '../types/types';
export { EmberFunction, EmberFunctionImpl };
/**
 *  Function call.  A means to make a remote procedure call throug the Ember
 *  interface. Function are invoked using the [Invoke] command.
 */
interface EmberFunction extends EmberElement {
    type: ElementType.Function;
    /** Name. */
    identifier?: string;
    /** Display name. */
    description?: string;
    /** Function arguments by name and type. */
    args?: Array<FunctionArgument>;
    /** Function results by name and type. */
    result?: Array<FunctionArgument>;
    /** Definition of the elements default structure. */
    templateReference?: RelativeOID;
}
declare class EmberFunctionImpl implements EmberFunction {
    identifier?: string | undefined;
    description?: string | undefined;
    args?: FunctionArgument[] | undefined;
    result?: FunctionArgument[] | undefined;
    templateReference?: string | undefined;
    readonly type: ElementType.Function;
    constructor(identifier?: string | undefined, description?: string | undefined, args?: FunctionArgument[] | undefined, result?: FunctionArgument[] | undefined, templateReference?: string | undefined);
}
