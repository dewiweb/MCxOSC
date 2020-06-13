export { UnimplementedEmberTypeError, InvalidEmberNode, InvalidRequestFormat, InvalidEmberResponse, InvalidRequest, InvalidSourcesFormat, UnknownElement, MissingElementContents, MissingElementNumber, InvalidCommand, EmberTimeoutError, EmberAccessError, ASN1Error, S101SocketError, InvalidBERFormat, InvalidResultFormat, InvalidMatrixSignal, InvalidRequesrFormat, InvalidStringPair, PathDiscoveryFailure };
declare class UnimplementedEmberTypeError extends Error {
    constructor(tag: number);
}
declare class S101SocketError extends Error {
    constructor(message: string | undefined);
}
declare class ASN1Error extends Error {
    constructor(message: string | undefined);
}
declare class EmberAccessError extends Error {
    constructor(message: string | undefined);
}
declare class EmberTimeoutError extends Error {
    constructor(message: string | undefined);
}
declare class InvalidCommand extends Error {
    constructor(number: number);
}
declare class MissingElementNumber extends Error {
    constructor();
}
declare class MissingElementContents extends Error {
    constructor(path: string);
}
declare class UnknownElement extends Error {
    constructor(path: string);
}
declare class InvalidRequest extends Error {
    constructor();
}
declare class InvalidRequestFormat extends Error {
    constructor(path: string);
}
declare class InvalidEmberNode extends Error {
    constructor(path?: string, info?: string);
}
declare class InvalidEmberResponse extends Error {
    constructor(req: string);
}
declare class PathDiscoveryFailure extends Error {
    constructor(path: string);
    setPath(path: string): void;
    static getMessage(path: string): string;
}
declare class InvalidSourcesFormat extends Error {
    constructor();
}
declare class InvalidBERFormat extends Error {
    /**
     *
     * @param {string} info
     */
    constructor(info?: string);
}
declare class InvalidResultFormat extends Error {
    constructor(info?: string);
}
declare class InvalidMatrixSignal extends Error {
    constructor(value: number, info: string);
}
declare class InvalidStringPair extends Error {
    constructor();
}
declare class InvalidRequesrFormat extends Error {
    constructor(path: string);
}
