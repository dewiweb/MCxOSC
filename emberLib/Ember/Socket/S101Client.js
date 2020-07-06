"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = __importDefault(require("net"));
const S101Socket_1 = __importDefault(require("./S101Socket"));
const Client_1 = require("../Client");
const DEFAULT_PORT = 9000;
const RECONNECT_ATTEMPTS = 60;
const AUTO_RECONNECT_DELAY = 5000;
class S101Client extends S101Socket_1.default {
    /**
     *
     * @param {string} address
     * @param {number} port=9000
     */
    constructor(address, port = DEFAULT_PORT, autoConnect) {
        super();
        this.autoConnect = false;
        this._autoReconnect = false;
        this._autoReconnectDelay = AUTO_RECONNECT_DELAY;
        this._connectionAttemptTimer = undefined;
        this._reconnectAttempt = 0;
        this._reconnectAttempts = RECONNECT_ATTEMPTS;
        this._lastConnectionAttempt = 0;
        this.address = address;
        this.port = port;
        this.autoConnect = !!autoConnect;
        this._shouldBeConnected = this.autoConnect;
        if (this.autoConnect)
            this.connect();
    }
    connect(timeout = 5) {
        return new Promise((resolve) => {
            if (this.status !== Client_1.ConnectionStatus.Disconnected) {
                // TODO - perhaps we should reconnect when addresses/ports have changed
                resolve();
                return;
            }
            if (!this._lastConnectionAttempt ||
                Date.now() - this._lastConnectionAttempt >= this._autoReconnectDelay) {
                // !_lastReconnectionAttempt means first attempt, OR > _reconnectionDelay since last attempt
                // recreates client if new attempt
                if (this.socket && this.socket.connecting) {
                    this.socket.destroy();
                    this.socket.removeAllListeners();
                    delete this.socket;
                    // @todo: fire event telling it gives up!
                }
                // (re)creates client, either on first run or new attempt
                if (!this.socket) {
                    this.socket = new net_1.default.Socket();
                    this.socket.on('close', (hadError) => this._onClose(hadError));
                    this.socket.on('connect', () => this._onConnect());
                    this.socket.on('data', (data) => {
                        try {
                            this.codec.dataIn(data);
                        }
                        catch (e) {
                            this.emit('error', e);
                        }
                    });
                    this.socket.on('error', (error) => this._onError(error));
                }
                this.emit('connecting');
                this.status = Client_1.ConnectionStatus.Disconnected;
                const connectTimeoutListener = () => {
                    if (this.socket) {
                        this.socket.destroy();
                        this.socket.removeAllListeners();
                        delete this.socket;
                    }
                    const reason = new Error(`Could not connect to ${this.address}:${this.port} after a timeout of ${timeout} seconds`);
                    resolve(reason);
                    if (!this._connectionAttemptTimer)
                        this.connect();
                };
                const timer = setTimeout(() => connectTimeoutListener(), timeout * 1000);
                this.socket.connect(this.port, this.address);
                this.socket.once('connect', () => {
                    clearInterval(timer);
                    resolve();
                });
                this._shouldBeConnected = true;
                this._lastConnectionAttempt = Date.now();
            }
            // sets timer to retry when needed
            if (!this._connectionAttemptTimer) {
                this._connectionAttemptTimer = setInterval(() => this._autoReconnectionAttempt(), this._autoReconnectDelay);
            }
        });
    }
    async disconnect(timeout) {
        this._shouldBeConnected = false;
        return super.disconnect(timeout);
    }
    handleClose() {
        var _a;
        if (this.keepaliveIntervalTimer)
            clearInterval(this.keepaliveIntervalTimer);
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.destroy();
    }
    _autoReconnectionAttempt() {
        if (this._autoReconnect) {
            if (this._reconnectAttempts > 0) {
                // no reconnection if no valid reconnectionAttemps is set
                if (this._reconnectAttempt >= this._reconnectAttempts) {
                    // if current attempt is not less than max attempts
                    // reset reconnection behaviour
                    this._clearConnectionAttemptTimer();
                    this.status = Client_1.ConnectionStatus.Disconnected;
                    return;
                }
                // new attempt if not already connected
                if (this.status !== Client_1.ConnectionStatus.Connected) {
                    this._reconnectAttempt++;
                    this.connect();
                }
            }
        }
    }
    _clearConnectionAttemptTimer() {
        // @todo create event telling reconnection ended with result: true/false
        // only if reconnection interval is true
        this._reconnectAttempt = 0;
        if (this._connectionAttemptTimer)
            clearInterval(this._connectionAttemptTimer);
        delete this._connectionAttemptTimer;
    }
    _onConnect() {
        this._clearConnectionAttemptTimer();
        this.startKeepAlive();
        // this._sentKeepalive = Date.now()
        // this._receivedKeepalive = this._sentKeepalive + 1 // for some reason keepalive doesn't return directly after conn.
        this.status = Client_1.ConnectionStatus.Connected;
        this.emit('connected');
    }
    _onError(error) {
        if (error.message.match(/ECONNREFUSED/)) {
            return; // we handle this internally through reconnections
        }
        this.emit('error', error);
    }
    _onClose(_hadError) {
        if (this.status !== Client_1.ConnectionStatus.Disconnected)
            this.emit('disconnected');
        this.status = Client_1.ConnectionStatus.Disconnected;
        if (this._shouldBeConnected === true) {
            this.emit('connecting');
            this.connect();
        }
    }
}
exports.default = S101Client;
