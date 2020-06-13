"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionImpl = exports.ConnectionOperation = exports.ConnectionDisposition = void 0;
/** How to interpret the set of sources in a connection. */
var ConnectionOperation;
(function (ConnectionOperation) {
    /** List of sources is absolute. Default. Set on tally for all responses from a provider. */
    ConnectionOperation["Absolute"] = "ABSOLUTE";
    /** Consumer request that the sources should be connected to the target. */
    ConnectionOperation["Connect"] = "CONNECT";
    /** Consumer requests that the sources should be disconnected from the target. */
    ConnectionOperation["Disconnect"] = "DISCONNECT";
})(ConnectionOperation || (ConnectionOperation = {}));
exports.ConnectionOperation = ConnectionOperation;
/** Execution state of a connection operation. */
var ConnectionDisposition;
(function (ConnectionDisposition) {
    /** Sources is the absolute set of current connections. */
    ConnectionDisposition["Tally"] = "TALLY";
    /** Connection has changed. Sources property contains absolute set of current connections. */
    ConnectionDisposition["Modified"] = "MODIFIED";
    /** Connect operation queued and connection is not yet current. */
    ConnectionDisposition["Pending"] = "PENDING";
    /** Connect operation not executed as the target is locked.
     *  Sources property contains absolute set of current connections. */
    ConnectionDisposition["Locked"] = "LOCKED";
})(ConnectionDisposition || (ConnectionDisposition = {}));
exports.ConnectionDisposition = ConnectionDisposition;
class ConnectionImpl {
    constructor(target, sources, operation, disposition) {
        this.target = target;
        this.sources = sources;
        this.operation = operation;
        this.disposition = disposition;
    }
}
exports.ConnectionImpl = ConnectionImpl;
