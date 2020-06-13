"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isGetDirectory = exports.isInvoke = exports.InvokeImpl = exports.GetDirectoryImpl = exports.UnsubscribeImpl = exports.SubscribeImpl = exports.FieldFlags = exports.CommandType = void 0;
const EmberElement_1 = require("./EmberElement");
var CommandType;
(function (CommandType) {
    CommandType[CommandType["Subscribe"] = 30] = "Subscribe";
    CommandType[CommandType["Unsubscribe"] = 31] = "Unsubscribe";
    CommandType[CommandType["GetDirectory"] = 32] = "GetDirectory";
    CommandType[CommandType["Invoke"] = 33] = "Invoke";
})(CommandType || (CommandType = {}));
exports.CommandType = CommandType;
/** Parameters that a consumer is interested in. */
var FieldFlags;
(function (FieldFlags) {
    FieldFlags["Sparse"] = "SPARSE";
    FieldFlags["All"] = "ALL";
    FieldFlags["Default"] = "DEFAULT";
    FieldFlags["Identifier"] = "IDENTIFIER";
    FieldFlags["Description"] = "DESCRIPTION";
    FieldFlags["Tree"] = "TREE";
    FieldFlags["Value"] = "VALUE";
    FieldFlags["Connections"] = "CONNECTIONS";
})(FieldFlags || (FieldFlags = {}));
exports.FieldFlags = FieldFlags;
function isInvoke(command) {
    return command !== null && command.number === CommandType.Invoke;
}
exports.isInvoke = isInvoke;
function isGetDirectory(command) {
    return command !== null && command.number === CommandType.GetDirectory;
}
exports.isGetDirectory = isGetDirectory;
class CommandImpl {
    constructor() {
        this.type = EmberElement_1.ElementType.Command;
        // constructor() {}
    }
}
class SubscribeImpl extends CommandImpl {
    constructor() {
        super();
        this.number = CommandType.Subscribe;
    }
}
exports.SubscribeImpl = SubscribeImpl;
class UnsubscribeImpl extends CommandImpl {
    constructor() {
        super();
        this.number = CommandType.Unsubscribe;
    }
}
exports.UnsubscribeImpl = UnsubscribeImpl;
class GetDirectoryImpl extends CommandImpl {
    constructor(dirFieldMask) {
        super();
        this.dirFieldMask = dirFieldMask;
        this.number = CommandType.GetDirectory;
    }
}
exports.GetDirectoryImpl = GetDirectoryImpl;
class InvokeImpl extends CommandImpl {
    constructor(invocation) {
        super();
        this.invocation = invocation;
        this.number = CommandType.Invoke;
    }
}
exports.InvokeImpl = InvokeImpl;
