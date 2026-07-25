import { Server } from "socket.io";
import type { Server as HttpServer } from "http";
import { socketAuthMiddleware } from "../../presentation/socket/middlewares/socket.middleware.ts";
import { SignalingHandler } from "../../presentation/socket/handlers/SignalingHandler.ts";
import { setIO } from "@config/socket.instance.ts";
import { ChatHandler } from "../../presentation/socket/handlers/ChatHandler.ts";
import { ChatSessionRepository } from "@infrastructure/database/repositories/ChatSessionRepository.ts";
import { logger } from "@shared/utils/logger.utils.ts";
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
          "http://admin.helixo.com:3000",
        ],
        credentials: true,
      },
    });

    setIO(this._io);
    this._io.use(socketAuthMiddleware);

    const signalingHandler = new SignalingHandler(this._io!);
    const chatHandler = new ChatHandler(
      this._io!,
      new ChatSessionRepository(logger)
    );
    this._io.on("connection", (socket) => {
      socket.join(`user:${socket.data.user.role}:${socket.data.user.id}`);

      logger.info(
        "USER JOINED",
        `user:${socket.data.user.role}:${socket.data.user.id}`
      );
      // registering handlers
      signalingHandler.register(socket);
      chatHandler.register(socket);
      socket.on("disconnect", () => {
        logger.info("Disconnected", socket.id);
      });
    });
  }

  public getIO(): Server {
    return this._io;
  }
}
