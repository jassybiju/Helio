import { logger } from "#shared/utils/logger.utils.js";
export class ChatHandler {
    _io;
    _chatSessionRepo;
    constructor(_io, _chatSessionRepo) {
        this._io = _io;
        this._chatSessionRepo = _chatSessionRepo;
    }
    register(socket) {
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
                if (chatSession.doctorId !== userId &&
                    chatSession.patientId !== userId) {
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
            }
            catch (error) {
                logger.error("Failed to join chat", error);
                socket.emit("chat:error", {
                    message: "Failed to join chat",
                });
            }
        });
    }
    _room(chatId) {
        return `chat-room:${chatId}`;
    }
}
//# sourceMappingURL=ChatHandler.js.map