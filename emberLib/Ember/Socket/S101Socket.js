"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const S101_1 = require("../../S101");
const __1 = require("../..");
const Client_1 = require("../Client");
class S101Socket extends events_1.EventEmitter {
    constructor(socket) {
        super();
        this.keepaliveInterval = 10;
        this.pendingRequests = [];
        this.codec = new S101_1.S101Codec();
        // Overide EventEmitter.on() for stronger typings:
        this.on = super.on;
        this.emit = super.emit;
        this.socket = socket;
        this.keepaliveIntervalTimer = undefined;
        this.activeRequest = undefined;
        this.status = this.isConnected() ? Client_1.ConnectionStatus.Connected : Client_1.ConnectionStatus.Disconnected;
        this.codec.on('keepaliveReq', () => {
            this.sendKeepaliveResponse();
        });
        this.codec.on('emberPacket', (packet) => {
            this.emit('emberPacket', packet);
            try {
                const root = __1.berDecode(packet);
                if (root != null) {
                    this.emit('emberTree', root);
                }
            }
            catch (e) {
                this.emit('error', e);
            }
        });
        this._initSocket();
    }
    _initSocket() {
        if (this.socket != null) {
            this.socket.on('data', (data) => {
                this.codec.dataIn(data);
            });
            this.socket.on('close', () => {
                var _a;
                this.emit('disconnected');
                this.status = Client_1.ConnectionStatus.Connected;
                (_a = this.socket) === null || _a === void 0 ? void 0 : _a.removeAllListeners();
                this.socket = undefined;
            });
            this.socket.on('error', (e) => {
                this.emit('error', e);
            });
        }
    }
    /**
     * @returns {string} - ie: "10.1.1.1:9000"
     */
    remoteAddress() {
        if (this.socket === undefined) {
            return 'not connected';
        }
        return `${this.socket.remoteAddress}:${this.socket.remotePort}`;
    }
    /**
     * @param {number} timeout=2
     */
    disconnect(timeout = 2) {
        if (!this.isConnected() || this.socket === undefined) {
            return Promise.resolve();
        }
        return new Promise((resolve) => {
            if (this.keepaliveIntervalTimer != null) {
                clearInterval(this.keepaliveIntervalTimer);
                this.keepaliveIntervalTimer = undefined;
            }
            let done = false;
            const cb = () => {
                if (done) {
                    return;
                }
                done = true;
                if (timer !== undefined) {
                    clearTimeout(timer);
                    timer = undefined;
                }
                resolve();
            };
            let timer;
            if (timeout != null && !isNaN(timeout) && timeout > 0) {
                timer = setTimeout(cb, 100 * timeout);
            }
            this.socket.end(cb);
            this.status = Client_1.ConnectionStatus.Disconnected;
        });
    }
    /**
     *
     */
    handleClose() {
        this.socket = undefined;
        if (this.keepaliveIntervalTimer)
            clearInterval(this.keepaliveIntervalTimer);
        this.status = Client_1.ConnectionStatus.Disconnected;
        this.emit('disconnected');
    }
    isConnected() {
        return this.socket !== undefined && !!this.socket;
    }
    async sendBER(data) {
        if (this.isConnected()) {
            try {
                const frames = this.codec.encodeBER(data);
                for (let i = 0; i < frames.length; i++) {
                    this.socket.write(frames[i]);
                }
                return true;
            }
            catch (e) {
                this.handleClose();
                return false;
            }
        }
        else {
            return false;
        }
    }
    /**
     *
     */
    sendKeepaliveRequest() {
        if (this.isConnected()) {
            try {
                this.socket.write(this.codec.keepAliveRequest());
            }
            catch (e) {
                this.handleClose();
            }
        }
    }
    /**
     *
     */
    sendKeepaliveResponse() {
        if (this.isConnected()) {
            try {
                this.socket.write(this.codec.keepAliveResponse());
            }
            catch (e) {
                this.handleClose();
            }
        }
    }
    // sendBERNode(node: Root) {
    // 	if (!node) return
    // 	const ber = berEncode(node)
    // 	this.sendBER(ber)
    // }
    startKeepAlive() {
        this.keepaliveIntervalTimer = setInterval(() => {
            try {
                this.sendKeepaliveRequest();
            }
            catch (e) {
                this.emit('error', e);
            }
        }, 1000 * this.keepaliveInterval);
    }
}
exports.default = S101Socket;
