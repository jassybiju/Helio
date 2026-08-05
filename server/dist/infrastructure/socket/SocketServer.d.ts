import { Server } from "socket.io";
import type { Server as HttpServer } from "http";
export declare class SocketServer {
    private readonly _httpServer;
    private _io;
    constructor(_httpServer: HttpServer);
    initialize(): void;
    getIO(): Server;
}
//# sourceMappingURL=SocketServer.d.ts.map