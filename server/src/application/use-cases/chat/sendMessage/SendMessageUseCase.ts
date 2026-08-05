import type { IChatMessageRepository } from "#application/ports/repositories/IChatMessageRepository.js";
import type { IChatSessionRepository } from "#application/ports/repositories/IChatSessionRepository.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { IIDGenerator } from "#application/ports/services/IIDGenerator.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IRealTimeNotifier } from "#application/ports/services/IRealTimeNotifier.js";
import type { IUnitOfWork } from "#application/ports/services/IUnitOfWork.js";
import type { ISendMessageUseCase } from "#application/ports/use-cases/chat/ISendMessageUseCase.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { ChatMessage } from "#domain/entities/ChatMessage.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { ConflictError } from "#shared/errors/ConflictError.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";

export class SendMessageUseCase implements ISendMessageUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _patientRepo: IPatientRepository,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _chatSessionRepo: IChatSessionRepository,
    private readonly _chatMessageRepo: IChatMessageRepository,
    private readonly _idGenerator: IIDGenerator,
    private readonly _realTimeNotifier: IRealTimeNotifier,
    private readonly _uow: IUnitOfWork
  ) {}

  async execute(
    senderId: string,
    chatSessionId: string,
    senderType: USER_ROLES,
    content: string
  ): Promise<{
    id: string;
    message: string;
    sendBy: USER_ROLES;
    sendAt: Date;
  }> {
    this._logger.info("User Send Message Attempt", {
      senderId,
      chatSessionId,
      content,
      senderType,
    });

    return this._uow.execute(async (session, afterCommit) => {
      const doctorRepo = this._doctorRepo.withSession(session);
      const patientRepo = this._patientRepo.withSession(session);
      const chatMessageRepo = this._chatMessageRepo.withSession(session);
      const chatSessionRepo = this._chatSessionRepo.withSession(session);

      let sender;
      if (senderType === USER_ROLES.DOCTOR) {
        sender = await doctorRepo.findById(senderId);
      } else if (senderType === USER_ROLES.PATIENT) {
        sender = await patientRepo.findById(senderId);
      }

      if (!sender) {
        throw new NotFoundError(MESSAGE.USER_NOT_FOUND);
      }

      const chatSession = await chatSessionRepo.findById(chatSessionId);

      if (!chatSession) {
        throw new NotFoundError(MESSAGE.CHAT_SESSION_NOT_FOUND);
      }

      if (chatSession.isExpired()) {
        throw new ConflictError("CHAT SESSION EXXPIRED");
      }

      const isParticipant =
        (senderType === USER_ROLES.DOCTOR &&
          chatSession.doctorId == sender.id) ||
        (senderType === USER_ROLES.PATIENT &&
          chatSession.patientId === sender.id);

      if (!isParticipant) {
        throw new ConflictError(MESSAGE.CHAT_SESSION_NOT_ACCESS);
      }

      const chatMessageId = this._idGenerator.generate(
        process.env.MESSAGE_PREFIX!
      );
      const chatMessage = ChatMessage.create(
        chatMessageId,
        chatSession.id,
        sender.id,
        senderType,
        content
      );

      await chatMessageRepo.create(chatMessage);
      afterCommit(async () => {
        const payload = {
          message: chatMessage.message,
          id: chatMessage.id,
          sendBy: chatMessage.senderRole,
          sendAt: chatMessage.createdAt,
          chatSessionId: chatSession.id,
        };

        this._realTimeNotifier.emitToRoom(
          `chat-room:${chatSession.id}`,
          "chat:send",
          {
            message: chatMessage.message,
            id: chatMessage.id,
            sendBy: chatMessage.senderRole,
            sendAt: chatMessage.createdAt,
            chatSessionId: chatSession.id,
          }
        );

        const sendeeType =
          senderType === USER_ROLES.DOCTOR
            ? USER_ROLES.PATIENT
            : USER_ROLES.DOCTOR;
        const sendeeId =
          senderType === USER_ROLES.DOCTOR
            ? chatSession.patientId
            : chatSession.doctorId;
        this._realTimeNotifier.emitToRoom(
          `user:${sendeeType}:${sendeeId}`,
          "chat:list-update",
          payload
        );
      });

      return {
        id: chatMessage.id,
        message: chatMessage.message,
        sendBy: chatMessage.senderRole,
        sendAt: chatMessage.createdAt,
      };
    });
  }
}
