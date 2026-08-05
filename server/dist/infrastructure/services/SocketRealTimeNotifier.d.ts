import type { IRealTimeNotifier } from "#application/ports/services/IRealTimeNotifier.js";
export declare class SocketRealTimeNotifier implements IRealTimeNotifier {
    constructor();
    emitToRoom(room: string, event: string, payload: unknown): Promise<void>;
}
//# sourceMappingURL=SocketRealTimeNotifier.d.ts.map