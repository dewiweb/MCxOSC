import S101Socket from './S101Socket';
export default class S101Client extends S101Socket {
    address: string;
    port: number;
    autoConnect: boolean;
    private _autoReconnect;
    private _autoReconnectDelay;
    private _connectionAttemptTimer;
    private _reconnectAttempt;
    private _reconnectAttempts;
    private _shouldBeConnected;
    private _lastConnectionAttempt;
    /**
     *
     * @param {string} address
     * @param {number} port=9000
     */
    constructor(address: string, port?: number, autoConnect?: boolean);
    connect(timeout?: number): Promise<Error | void>;
    disconnect(timeout?: number): Promise<void>;
    handleClose(): void;
    _autoReconnectionAttempt(): void;
    private _clearConnectionAttemptTimer;
    private _onConnect;
    private _onError;
    private _onClose;
}
