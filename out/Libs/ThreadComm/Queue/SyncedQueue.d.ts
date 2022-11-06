export declare class SyncedQueue {
    id: string;
    sab: SharedArrayBuffer;
    states: Uint32Array;
    constructor(id: string, sab: SharedArrayBuffer);
    addToCount(total?: number): void;
    subtractFromCount(total?: number): void;
}
