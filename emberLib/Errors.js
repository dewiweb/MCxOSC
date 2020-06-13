"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathDiscoveryFailure = exports.InvalidStringPair = exports.InvalidRequesrFormat = exports.InvalidMatrixSignal = exports.InvalidResultFormat = exports.InvalidBERFormat = exports.S101SocketError = exports.ASN1Error = exports.EmberAccessError = exports.EmberTimeoutError = exports.InvalidCommand = exports.MissingElementNumber = exports.MissingElementContents = exports.UnknownElement = exports.InvalidSourcesFormat = exports.InvalidRequest = exports.InvalidEmberResponse = exports.InvalidRequestFormat = exports.InvalidEmberNode = exports.UnimplementedEmberTypeError = void 0;
class UnimplementedEmberTypeError extends Error {
    constructor(tag) {
        super();
        this.name = this.constructor.name;
        const identifier = (tag & 0xc0) >> 6;
        const value = (tag & 0x1f).toString();
        let tagStr = tag.toString();
        if (identifier == 0) {
            tagStr = '[UNIVERSAL ' + value + ']';
        }
        else if (identifier == 1) {
            tagStr = '[APPLICATION ' + value + ']';
        }
        else if (identifier == 2) {
            tagStr = '[CONTEXT ' + value + ']';
        }
        else {
            tagStr = '[PRIVATE ' + value + ']';
        }
        this.message = 'Unimplemented EmBER type ' + tagStr;
    }
}
exports.UnimplementedEmberTypeError = UnimplementedEmberTypeError;
class S101SocketError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.S101SocketError = S101SocketError;
class ASN1Error extends Error {
    constructor(message) {
        super(message);
    }
}
exports.ASN1Error = ASN1Error;
class EmberAccessError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.EmberAccessError = EmberAccessError;
class EmberTimeoutError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.EmberTimeoutError = EmberTimeoutError;
class InvalidCommand extends Error {
    constructor(number) {
        super(`Invalid command ${number}`);
    }
}
exports.InvalidCommand = InvalidCommand;
class MissingElementNumber extends Error {
    constructor() {
        super('Missing element number');
    }
}
exports.MissingElementNumber = MissingElementNumber;
class MissingElementContents extends Error {
    constructor(path) {
        super(`Missing element contents at ${path}`);
    }
}
exports.MissingElementContents = MissingElementContents;
class UnknownElement extends Error {
    constructor(path) {
        super(`No element at path ${path}`);
    }
}
exports.UnknownElement = UnknownElement;
class InvalidRequest extends Error {
    constructor() {
        super('Invalid Request');
    }
}
exports.InvalidRequest = InvalidRequest;
class InvalidRequestFormat extends Error {
    constructor(path) {
        super(`Invalid Request Format with path ${path}`);
    }
}
exports.InvalidRequestFormat = InvalidRequestFormat;
class InvalidEmberNode extends Error {
    constructor(path = 'unknown', info = '') {
        super(`Invalid Ember Node at ${path}: ${info}`);
    }
}
exports.InvalidEmberNode = InvalidEmberNode;
class InvalidEmberResponse extends Error {
    constructor(req) {
        super(`Invalid Ember Response to ${req}`);
    }
}
exports.InvalidEmberResponse = InvalidEmberResponse;
class PathDiscoveryFailure extends Error {
    constructor(path) {
        super(PathDiscoveryFailure.getMessage(path));
    }
    setPath(path) {
        this.message = PathDiscoveryFailure.getMessage(path);
    }
    static getMessage(path) {
        return `Failed path discovery at ${path}`;
    }
}
exports.PathDiscoveryFailure = PathDiscoveryFailure;
class InvalidSourcesFormat extends Error {
    constructor() {
        super('Sources should be an array');
    }
}
exports.InvalidSourcesFormat = InvalidSourcesFormat;
class InvalidBERFormat extends Error {
    /**
     *
     * @param {string} info
     */
    constructor(info = '') {
        super(`Invalid BER format: ${info}`);
    }
}
exports.InvalidBERFormat = InvalidBERFormat;
class InvalidResultFormat extends Error {
    constructor(info = '') {
        super(`Invalid Result format: ${info}`);
    }
}
exports.InvalidResultFormat = InvalidResultFormat;
class InvalidMatrixSignal extends Error {
    constructor(value, info) {
        super(`Invalid Matrix Signal ${value}: ${info}`);
    }
}
exports.InvalidMatrixSignal = InvalidMatrixSignal;
class InvalidStringPair extends Error {
    constructor() {
        super('Invalid StringPair Value');
    }
}
exports.InvalidStringPair = InvalidStringPair;
class InvalidRequesrFormat extends Error {
    constructor(path) {
        super(`Can't process request for node ${path}`);
    }
}
exports.InvalidRequesrFormat = InvalidRequesrFormat;
