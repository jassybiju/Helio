import { Server } from "socket.io";
import type { Server as HttpServer } from "http";
import { socketAuthMiddleware } from "../../presentation/socket/middlewares/socket.middleware.js";
import { SignalingHandler } from "../../presentation/socket/handlers/SignalingHandler.js";
import { setIO } from "#config/socket.instance.js";
import { ChatHandler } from "../../presentation/socket/handlers/ChatHandler.js";
import { ChatSessionRepository } from "#infrastructure/database/repositories/ChatSessionRepository.js";
import { logger } from "#shared/utils/logger.utils.js";
export class SocketServer {
  private _io!: Server;

  constructor(private readonly _httpServer: HttpServer) {}

  public initialize(): void {
    this._io = new Server(this._httpServer, {
      cors: {
        origin: [
          "http://localhost",
          "http://helixo.com",
          "http://doctor.helixo.com",
          "http://admin.helixo.com",
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
