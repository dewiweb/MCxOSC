/// <reference types="node" />
import { EventEmitter } from 'events';
import { Socket } from 'net';
import { S101Codec } from '../../S101';
import { ConnectionStatus } from '../Client';
export declare type Request = any;
export default class S101Socket extends EventEmitter {
    socket: Socket | undefined;
    keepaliveInterval: number;
    keepaliveIntervalTimer: NodeJS.Timer | undefined;
    pendingRequests: Array<Request>;
    activeRequest: Request | undefined;
    status: ConnectionStatus;
    codec: S101Codec;
    constructor(socket?: Socket);
    on: ((event: 'emberPacket', listener: (packet: Buffer) => void) => this) & ((event: 'emberTree', listener: (root: any) => void) => this) & ((event: 'error', listener: (error: Error) => void) => this) & ((event: 'connecting', listener: () => void) => this) & ((event: 'connected', listener: () => void) => this) & ((event: 'disconnected', listener: () => void) => this);
    emit: ((event: 'emberPacket', packet: Buffer) => boolean) & ((event: 'emberTree', root: any) => boolean) & ((event: 'error', error: Error) => boolean) & ((event: 'connecting') => boolean) & ((event: 'connected') => boolean) & ((event: 'disconnected') => boolean);
    _initSocket(): void;
    /**
     * @returns {string} - ie: "10.1.1.1:9000"
     */
    remoteAddress(): string;
    /**
     * @param {number} timeout=2
     */
    disconnect(timeout?: number): Promise<void>;
    /**
     *
     */
    handleClose(): void;
    isConnected(): boolean;
    sendBER(data: Buffer): Promise<boolean>;
    /**
     *
     */
    sendKeepaliveRequest(): void;
    /**
     *
     */
    sendKeepaliveResponse(): void;
    startKeepAlive(): void;
}
