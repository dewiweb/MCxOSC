"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmberClient = exports.ConnectionStatus = void 0;
const types_1 = require("../../types/types");
const Command_1 = require("../../model/Command");
const Command_2 = require("../../model/Command");
const EmberElement_1 = require("../../model/EmberElement");
const Connection_1 = require("../../model/Connection");
const Connection_2 = require("../../model/Connection");
const events_1 = require("events");
const Socket_1 = require("../Socket");
const util_1 = require("../Lib/util");
const __1 = require("../..");
const Tree_1 = require("../../model/Tree");
var ConnectionStatus;
(function (ConnectionStatus) {
    ConnectionStatus[ConnectionStatus["Error"] = 0] = "Error";
    ConnectionStatus[ConnectionStatus["Disconnected"] = 1] = "Disconnected";
    ConnectionStatus[ConnectionStatus["Connecting"] = 2] = "Connecting";
    ConnectionStatus[ConnectionStatus["Connected"] = 3] = "Connected";
})(ConnectionStatus = exports.ConnectionStatus || (exports.ConnectionStatus = {}));
class EmberClient extends events_1.EventEmitter {
    constructor(host, port = 9000, timeout = 3000, enableResends = false, resendTimeout = 1000) {
        super();
        this.tree = [];
        this._requests = new Map();
        this._lastInvocation = 0;
        this._subscriptions = [];
        this._timeout = 3000;
        this._resendTimeout = 1000;
        this._resends = false;
        this.host = host;
        this.port = port;
        this._timeout = timeout;
        this._resendTimeout = resendTimeout;
        this._resends = enableResends;
        // resend timer runs at greatest common divisor of timeouts and resends
        const findGcd = (a, b) => {
            // assuming a and b are greater than 0
            while (b) {
                const t = b;
                b = a % b;
                a = t;
            }
            return a;
        };
        this._timer = setInterval(() => this._resendTimer(), findGcd(this._timeout, this._resendTimeout));
        this._client = new Socket_1.S101Client(this.host, this.port);
        this._client.on('emberTree', (tree) => this._handleIncoming(tree));
        this._client.on('error', (e) => this.emit('error', e));
        this._client.on('connected', () => this.emit('connected'));
        this._client.on('disconnected', () => {
            this._requests.forEach((req) => {
                req.reject(new Error('Socket was disconnected'));
                this._requests.delete(req.reqId);
            });
            this.emit('disconnected');
        });
    }
    /**
     * Opens an s101 socket to the provider.
     * @param host The host of the emberplus provider
     * @param port Port of the provider
     */
    connect(host, port) {
        if (host)
            this.host = host;
        if (port)
            this.port = port;
        if (!this.host)
            return Promise.reject('No host specified');
        this._client.address = this.host;
        this._client.port = this.port;
        return this._client.connect();
    }
    /**
     * Closes the s101 socket to the provider
     */
    disconnect() {
        return this._client.disconnect();
    }
    /**
     * Discards any outgoing connections, removes all requests and clears any timing loops
     *
     * This is destructive, using this class after discarding will cause errors.
     */
    discard() {
        this.disconnect();
        delete this._client;
        this._requests.forEach((req) => {
            req.reject(new Error('Socket was disconnected'));
            this._requests.delete(req.reqId);
        });
        clearInterval(this._timer);
    }
    get connected() {
        return this._client.status === ConnectionStatus.Connected;
    }
    /** Ember+ commands: */
    getDirectory(node, dirFieldMask, cb) {
        if (!node) {
            throw new Error('No node specified');
        }
        const command = new Command_1.GetDirectoryImpl(dirFieldMask);
        if (!('number' in node || 'path' in node)) {
            if (cb)
                this._subscriptions.push({
                    path: undefined,
                    cb
                });
            return this._sendRequest(new Tree_1.NumberedTreeNodeImpl(0, command));
        }
        if (cb)
            this._subscriptions.push({
                path: util_1.getPath(node),
                cb
            });
        return this._sendCommand(node, command);
    }
    subscribe(node, cb) {
        if (!node) {
            throw new Error('No node specified');
        }
        const command = new Command_1.SubscribeImpl();
        if (Array.isArray(node)) {
            if (cb)
                this._subscriptions.push({
                    path: undefined,
                    cb
                });
            return this._sendRequest(new Tree_1.NumberedTreeNodeImpl(0, command));
        }
        if (cb)
            this._subscriptions.push({
                path: util_1.getPath(node),
                cb
            });
        return this._sendCommand(node, command, false);
    }
    unsubscribe(node) {
        if (!node) {
            throw new Error('No node specified');
        }
        const command = new Command_1.UnsubscribeImpl();
        const path = Array.isArray(node) ? '' : util_1.getPath(node);
        for (const i in this._subscriptions) {
            if (this._subscriptions[i].path === path) {
                this._subscriptions.splice(Number(i), 1);
            }
        }
        if (Array.isArray(node)) {
            return this._sendRequest(new Tree_1.NumberedTreeNodeImpl(0, command));
        }
        return this._sendCommand(node, command, false);
    }
    invoke(node, ...args) {
        if (!node) {
            throw new Error('No node specified');
        }
        // TODO - validate arguments
        const command = {
            type: EmberElement_1.ElementType.Command,
            number: Command_2.CommandType.Invoke,
            invocation: {
                id: ++this._lastInvocation,
                args
            }
        };
        return this._sendCommand(node, command);
    }
    /** Sending ember+ values */
    setValue(node, value, awaitResponse = true) {
        if (!node) {
            throw new Error('No node specified');
        }
        const qualifiedParam = util_1.assertQualifiedEmberNode(node);
        // TODO - validate value
        // TODO - should other properties be scrapped?
        qualifiedParam.contents.value = value;
        return this._sendRequest(qualifiedParam, awaitResponse);
    }
    matrixConnect(matrix, target, sources) {
        return this._matrixMutation(matrix, target, sources, Connection_2.ConnectionOperation.Connect);
    }
    matrixDisconnect(matrix, target, sources) {
        return this._matrixMutation(matrix, target, sources, Connection_2.ConnectionOperation.Disconnect);
    }
    matrixSetConnection(matrix, target, sources) {
        return this._matrixMutation(matrix, target, sources, Connection_2.ConnectionOperation.Absolute);
    }
    /** Getting the tree: */
    async expand(node) {
        if (!node) {
            throw new Error('No node specified');
        }
        if (!('number' in node)) {
            await (await this.getDirectory(node)).response;
            for (const root of Object.values(this.tree))
                await this.expand(root);
            return;
        }
        const emberNodes = [node];
        const canBeExpanded = (node) => {
            if (node.contents.type === EmberElement_1.ElementType.Node) {
                return node.contents.isOnline !== false;
            }
            else {
                return (node.contents.type !== EmberElement_1.ElementType.Parameter &&
                    node.contents.type !== EmberElement_1.ElementType.Function);
            }
        };
        let curEmberNode;
        while ((curEmberNode = emberNodes.shift())) {
            if (curEmberNode.children) {
                emberNodes.push(...Object.values(curEmberNode.children).filter(canBeExpanded));
            }
            else {
                const req = await this.getDirectory(curEmberNode);
                if (!req.response)
                    continue;
                const res = (await req.response);
                if (res.children) {
                    Object.values(res.children).forEach((c) => canBeExpanded(c) && emberNodes.push(c));
                }
            }
        }
    }
    async getElementByPath(path, cb) {
        const getNext = (elements, i) => Object.values(elements || {}).find((r) => r.number === Number(i) ||
            r.contents.identifier === i ||
            r.contents.description === i);
        const getNextChild = (node, i) => node.children && getNext(node.children, i);
        const numberedPath = [];
        const pathArr = path.split('.');
        const i = pathArr.shift();
        let tree = getNext(this.tree, i);
        if (tree === null || tree === void 0 ? void 0 : tree.number)
            numberedPath.push(tree === null || tree === void 0 ? void 0 : tree.number);
        while (pathArr.length) {
            const i = pathArr.shift();
            if (!i)
                break;
            if (!tree)
                break;
            let next = getNextChild(tree, i);
            if (!next) {
                const req = await this.getDirectory(tree);
                tree = (await req.response);
                next = getNextChild(tree, i);
            }
            tree = next;
            if (!tree)
                throw new Error(`Could not find node ${i} on given path ${numberedPath.join()}`);
            if (tree === null || tree === void 0 ? void 0 : tree.number)
                numberedPath.push(tree === null || tree === void 0 ? void 0 : tree.number);
        }
        if (cb && numberedPath) {
            this._subscriptions.push({
                path: numberedPath.join('.'),
                cb
            });
        }
        return tree;
    }
    _matrixMutation(matrix, target, sources, operation) {
        if (!matrix) {
            throw new Error('No matrix specified');
        }
        const qualifiedMatrix = util_1.assertQualifiedEmberNode(matrix);
        const connection = {
            operation,
            target,
            sources
        };
        qualifiedMatrix.contents.connections = [connection];
        return this._sendRequest(qualifiedMatrix);
    }
    _sendCommand(EmberNode, command, hasResponse) {
        // assert a qualified EmberNode
        const qualifiedEmberNode = util_1.assertQualifiedEmberNode(EmberNode);
        // insert command
        const commandEmberNode = util_1.insertCommand(qualifiedEmberNode, command);
        // send request
        return this._sendRequest(commandEmberNode, hasResponse);
    }
    async _sendRequest(node, hasResponse = true) {
        var _a;
        const reqId = Math.random().toString(24).substr(-4);
        const requestPromise = {
            reqId,
            sentOk: false
        };
        const message = __1.berEncode([node], types_1.RootType.Elements);
        if (hasResponse) {
            const p = new Promise((resolve, reject) => {
                const request = {
                    reqId,
                    node,
                    resolve,
                    reject,
                    message,
                    firstSent: Date.now(),
                    lastSent: Date.now()
                };
                this._requests.set(reqId, request);
                requestPromise.cancel = () => {
                    reject(new Error('Request cancelled'));
                    this._requests.delete(reqId);
                };
            });
            requestPromise.response = p;
        }
        const sentOk = await this._client.sendBER(message); // TODO - if sending multiple values to same path, should we do synchronous requests?
        if (!sentOk && requestPromise.cancel) {
            (_a = this._requests.get(reqId)) === null || _a === void 0 ? void 0 : _a.reject(new Error('Request was not sent correctly'));
            this._requests.delete(reqId);
        }
        return {
            ...requestPromise,
            sentOk
        };
    }
    _handleIncoming(incoming) {
        var _a;
        const node = incoming.value;
        // update tree:
        const changes = this._applyRootToTree(node);
        // check for subscriptiions:
        for (const change of changes) {
            const subscription = this._subscriptions.find((s) => s.path === change.path);
            if (subscription && change.node)
                subscription.cb(change.node);
        }
        // check for any outstanding requests and resolve them
        // iterate over requests, check path, if Invocation check id
        // resolve requests
        for (const change of changes) {
            const reqs = Array.from(this._requests.values()).filter((s) => (!('path' in s.node) && !change.path) || ('path' in s.node && s.node.path === change.path));
            for (const req of reqs) {
                if (req.cb)
                    req.cb(change.node);
                if (req.resolve) {
                    req.resolve(change.node);
                    this._requests.delete(req.reqId);
                }
            }
        }
        // at last, emit the errors for logging purposes
        (_a = incoming.errors) === null || _a === void 0 ? void 0 : _a.forEach((e) => this.emit('warn', e));
    }
    _applyRootToTree(node) {
        let changes = [];
        if ('id' in node) {
            // node is an InvocationResult
            this._requests.forEach((req) => {
                var _a, _b;
                if (req.node.contents.type === EmberElement_1.ElementType.Function) {
                    if (req.node.children && req.node.children[0]) {
                        if ('invocation' in req.node.children[0].contents) {
                            if (((_a = req.node.children[0].contents.invocation) === null || _a === void 0 ? void 0 : _a.id) &&
                                ((_b = req.node.children[0].contents.invocation) === null || _b === void 0 ? void 0 : _b.id) === node.id) {
                                req.resolve(node);
                                this._requests.delete(req.reqId);
                            }
                        }
                    }
                }
            });
        }
        else {
            // EmberNode is not an InvocationResult
            // walk tree
            for (const rootElement of Object.values(node)) {
                if ('identifier' in rootElement) {
                    // rootElement is a StreamEntry
                    continue;
                }
                else if ('path' in rootElement) {
                    // element is qualified
                    const path = rootElement.path.split('.');
                    let tree = this.tree[Number(path.shift())];
                    let inserted = false;
                    if (!tree) {
                        if (path.length) {
                            // Assuming this means that no get directory was done on the root of the tree.
                            changes = [...changes, { path: rootElement.path, node: rootElement }];
                            continue;
                        }
                        else {
                            const number = Number(rootElement.path);
                            // Insert node into root
                            this.tree[number] = new Tree_1.NumberedTreeNodeImpl(number, rootElement.contents, rootElement.children);
                            changes = [...changes, { path: undefined, node: this.tree[number] }];
                            continue;
                        }
                    }
                    for (const number of path) {
                        if (!tree.children)
                            tree.children = [];
                        if (!tree.children[Number(number)]) {
                            tree.children[Number(number)] = {
                                ...rootElement,
                                number: Number(number),
                                parent: tree
                            };
                            changes = [
                                ...changes,
                                {
                                    path: rootElement.path.substr(0, rootElement.path.length - 2),
                                    node: tree
                                }
                            ];
                            inserted = true;
                            break;
                        }
                        tree = tree.children[Number(number)];
                    }
                    if (inserted)
                        continue;
                    changes = [...changes, ...this._updateTree(rootElement, tree)];
                }
                else {
                    if (this.tree[rootElement.number]) {
                        changes = [
                            ...changes,
                            ...this._updateTree(rootElement, this.tree[rootElement.number])
                        ];
                    }
                    else {
                        this.tree[rootElement.number] = rootElement;
                        changes = [...changes, { path: undefined, node: rootElement }];
                    }
                }
            }
        }
        return changes;
    }
    _updateTree(update, tree) {
        let changes = [];
        if (update.contents.type === tree.contents.type) {
            changes.push({ path: util_1.getPath(tree), node: tree });
            switch (tree.contents.type) {
                case EmberElement_1.ElementType.Node:
                    this._updateEmberNode(update.contents, tree.contents);
                    break;
                case EmberElement_1.ElementType.Parameter:
                    this._updateParameter(update.contents, tree.contents);
                    break;
                case EmberElement_1.ElementType.Matrix:
                    this._updateMatrix(update.contents, tree.contents);
                    break;
            }
        }
        if (update.children && tree.children) {
            // Update children
            for (const child of Object.values(update.children)) {
                const i = child.number;
                const oldChild = tree.children[i];
                changes = [...changes, ...this._updateTree(child, oldChild)];
            }
        }
        else if (update.children) {
            changes.push({ path: util_1.getPath(tree), node: tree });
            tree.children = update.children;
        }
        return changes;
    }
    _updateEmberNode(update, EmberNode) {
        util_1.updateProps(EmberNode, update, ['isOnline']);
    }
    _updateParameter(update, parameter) {
        util_1.updateProps(parameter, update, ['value', 'isOnline', 'access']);
    }
    _updateMatrix(update, matrix) {
        util_1.updateProps(matrix, update, [
            'targets',
            'targetCount',
            'sources',
            'sourceCount',
            'connections'
        ]);
        // update connections
        if (update.connections) {
            if (matrix.connections) {
                // matrix already has connections
                for (const connection of Object.values(update.connections)) {
                    if (!connection.disposition ||
                        !(connection.disposition === Connection_1.ConnectionDisposition.Locked ||
                            connection.disposition === Connection_1.ConnectionDisposition.Pending)) {
                        // update is either generic, tally or modification
                        let exists = false;
                        for (const i in matrix.connections) {
                            if (matrix.connections[i].target === connection.target) {
                                // found connection to update
                                exists = true;
                                matrix.connections[i].sources = connection.sources;
                            }
                        }
                        if (!exists) {
                            // connection to target does not exist yet
                            matrix.connections[connection.target] = {
                                target: connection.target,
                                sources: connection.sources
                            };
                        }
                    }
                }
            }
            else {
                // connections have not been set yet
                matrix.connections = update.connections;
            }
        }
    }
    _resendTimer() {
        if (this.connected) {
            this._requests.forEach((req) => {
                const sinceSent = Date.now() - req.lastSent;
                const sinceFirstSent = Date.now() - req.firstSent;
                if (this._resends && sinceSent >= this._resendTimeout) {
                    this._client.sendBER(req.message);
                    req.lastSent = Date.now();
                }
                if (sinceFirstSent >= this._timeout) {
                    req.reject(new Error('Request timed out'));
                    this._requests.delete(req.reqId);
                }
            });
        }
    }
}
exports.EmberClient = EmberClient;
