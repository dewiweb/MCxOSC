import { ElementType, EmberBaseElement } from './EmberElement';
import { Invocation } from './Invocation';
export { CommandType, FieldFlags, Command, Subscribe, Unsubscribe, GetDirectory, Invoke, SubscribeImpl, UnsubscribeImpl, GetDirectoryImpl, InvokeImpl };
declare enum CommandType {
    Subscribe = 30,
    Unsubscribe = 31,
    GetDirectory = 32,
    Invoke = 33
}
/** Parameters that a consumer is interested in. */
declare enum FieldFlags {
    Sparse = "SPARSE",
    All = "ALL",
    Default = "DEFAULT",
    Identifier = "IDENTIFIER",
    Description = "DESCRIPTION",
    Tree = "TREE",
    Value = "VALUE",
    Connections = "CONNECTIONS"
}
/**
 *  A command - from a consumer to a provider - may be appended to a node,
 *  parameter or a matrix as child element.
 */
interface Command extends EmberBaseElement {
    type: ElementType.Command;
    number: CommandType;
}
/**
 *  Subscribe to a stream of updates for a parameter that has a stream identifier.
 *  Parameters with a stream identifier only transmit changes to subscribers.
 */
interface Subscribe extends Command {
    number: CommandType.Subscribe;
}
/**
 *  Unsubscribe from a stream of updates for a parameter.
 */
interface Unsubscribe extends Command {
    number: CommandType.Unsubscribe;
}
/**
 *  Requests all child nodes and parameters of the node containing the command,
 *  including all attributes of the reported entities.
 */
interface GetDirectory extends Command {
    number: CommandType.GetDirectory;
    /** Properties a cosumer is interested in. */
    dirFieldMask?: FieldFlags;
}
/**
 *  Invoke a function.
 */
interface Invoke extends Command {
    number: CommandType.Invoke;
    /** Identifier and arguments to use to invoke a function. */
    invocation?: Invocation;
}
export declare function isInvoke(command: Command | null): command is Invoke;
export declare function isGetDirectory(command: Command | null): command is GetDirectory;
declare abstract class CommandImpl implements Command {
    abstract number: number;
    type: ElementType.Command;
}
declare class SubscribeImpl extends CommandImpl implements Subscribe {
    readonly number: CommandType.Subscribe;
    constructor();
}
declare class UnsubscribeImpl extends CommandImpl implements Unsubscribe {
    readonly number: CommandType.Unsubscribe;
    constructor();
}
declare class GetDirectoryImpl extends CommandImpl implements GetDirectory {
    dirFieldMask?: FieldFlags | undefined;
    readonly number: CommandType.GetDirectory;
    constructor(dirFieldMask?: FieldFlags | undefined);
}
declare class InvokeImpl extends CommandImpl implements Invoke {
    invocation?: Invocation | undefined;
    readonly number: CommandType.Invoke;
    constructor(invocation?: Invocation | undefined);
}
