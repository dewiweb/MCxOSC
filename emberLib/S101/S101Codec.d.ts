/// <reference types="node" />
import { EventEmitter } from 'events';
import { SmartBuffer } from 'smart-buffer';
export default class S101Codec extends EventEmitter {
    inbuf: SmartBuffer;
    emberbuf: SmartBuffer;
    escaped: boolean;
    dataIn(buf: Buffer): void;
    handleFrame(frame: SmartBuffer): void;
    handleEmberFrame(frame: SmartBuffer): void;
    handleEmberPacket(packet: SmartBuffer): void;
    encodeBER(data: Buffer): Buffer[];
    keepAliveRequest(): Buffer;
    keepAliveResponse(): Buffer;
    validateFrame(buf: Buffer): boolean;
    private _makeBERFrame;
    on: ((event: 'emberPacket', listener: (packet: Buffer) => void) => this) & ((event: 'keepaliveReq', listener: () => void) => this) & ((event: 'keepaliveResp', listener: () => void) => this);
    emit: ((event: 'emberPacket', packet: Buffer) => boolean) & ((event: 'keepaliveReq') => boolean) & ((event: 'keepaliveResp') => boolean);
    private _finalizeBuffer;
    private _calculateCRC;
    private _calculateCRCCE;
}
