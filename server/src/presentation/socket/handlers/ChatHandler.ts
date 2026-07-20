import type { IChatSessionRepository } from "@application/ports/repositories/IChatSessionRepository.ts";
import { logger } from "@shared/utils/logger.utils.ts";
import type { Server, Socket } from "socket.io";

export class ChatHandler {
  constructor(
    private readonly _io: Server,
    private readonly _chatSessionRepo: IChatSessionRepository
  ) {}

  register(socket: Socket) {
    socket.on("chat:join-room", async (chatId) => {
      try {
        logger.info("User Joining Chat", { chatId });

        const chatSession = await this._chatSessionRepo.findById(chatId);

        if (!chatSession) {
          socket.emit("chat:error", {
            message: "Invalid chat session",
          });
          return;
        }

        const userId = socket.data.user.id;

        if (
          chatSession.doctorId !== userId &&
          chatSession.patientId !== userId
        ) {
          socket.emit("chat:error", {
            message: "Unauthorized",
          });
          return;
        }

        socket.join(this._room(chatId));

        logger.info("User Joined Chat", {
          chatId,
          userId,
        });
      } catch (error) {
        logger.error("Failed to join chat", error);

        socket.emit("chat:error", {
          message: "Failed to join chat",
        });
      }
    });
  }

  private _room(chatId: string) {
    return `chat-room:${chatId}`;
  }
}
