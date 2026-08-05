import type { IChatSessionRepository } from "#application/ports/repositories/IChatSessionRepository.js";
import type { Server, Socket } from "socket.io";
export declare class ChatHandler {
    private readonly _io;
    private readonly _chatSessionRepo;
    constructor(_io: Server, _chatSessionRepo: IChatSessionRepository);
    register(socket: Socket): void;
    private _room;
}
//# sourceMappingURL=ChatHandler.d.ts.map