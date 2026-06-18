import { Server } from "socket.io";
import type { Server as HttpServer } from "http";
import { socketAuthMiddleware } from "../../presentation/socket/middlewares/socket.middleware.ts";
import { SignalingHandler } from "../../presentation/socket/handlers/SignalingHandler.ts";
export class SocketServer {
  private _io!: Server;

  constructor(private readonly _httpServer: HttpServer) {}

  public initialize(): void {
    this._io = new Server(this._httpServer, {
      cors: {
        origin: [
          "http://localhost:3000",
          "http://helixo.com:3000",
          "http://doctor.helixo.com:3000",
        ],
        credentials: true,
      },
    });
    console.log("INTIALIZEDdd");
    this._io.use(socketAuthMiddleware);

    const signalingHandler = new SignalingHandler(this._io!);

    this._io.on("connection", (socket) => {
      console.log("Connected", socket.id);

      // registering handlers
      signalingHandler.register(socket);

      socket.on("disconnect", () => {
        console.log("Disconnected", socket.id);
      });
    });
  }

  public getIO(): Server {
    return this._io;
  }
}
