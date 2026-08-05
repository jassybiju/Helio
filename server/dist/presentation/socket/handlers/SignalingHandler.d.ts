import type { Server } from "socket.io";
import type { Socket } from "socket.io";
export declare class SignalingHandler {
    private readonly _io;
    constructor(_io: Server);
    register(socket: Socket): void;
    private _room;
    private _canJoinAppointment;
}
//# sourceMappingURL=SignalingHandler.d.ts.map