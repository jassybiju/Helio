import type { IChatMessageRepository } from "#application/ports/repositories/IChatMessageRepository.js";
import type { IChatSessionRepository } from "#application/ports/repositories/IChatSessionRepository.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IIDGenerator } from "#application/ports/services/IIDGenerator.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IRealTimeNotifier } from "#application/ports/services/IRealTimeNotifier.js";
import type { IUnitOfWork } from "#application/ports/services/IUnitOfWork.js";
import type { IDoctorSendMessageUseCase } from "#application/ports/use-cases/doctor/chat/IDoctorSendMessageUseCase.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { ChatMessage } from "#domain/entities/ChatMessage.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";

export class DoctorSendMessageUseCase implements IDoctorSendMessageUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _chatSessionRepo: IChatSessionRepository,
    private readonly _chatMessageRepo: IChatMessageRepository,
    private readonly _idGenerator: IIDGenerator,
    private readonly _realTimeNotifier: IRealTimeNotifier,
    private readonly _uow: IUnitOfWork
  ) {}

  /**
   * sends Message to the patient
   * @param doctorId
   * @param chatSessionId
   * @param content
   * @returns
   */
  async execute(
    doctorId: string,
    chatSessionId: string,
    content: string
  ): Promise<{
    id: string;
    message: string;
    sendBy: USER_ROLES;
    sendAt: Date;
  }> {
    this._logger.info("Doctor Send Message Attempt", {
      doctorId,
      chatSessionId,
      content,
    });

    return this._uow.execute(async (session, afterCommit) => {
      const doctorRepo = this._doctorRepo.withSession(session);
      const chatMessageRepo = this._chatMessageRepo.withSession(session);
      const chatSessionRepo = this._chatSessionRepo.withSession(session);

      const doctor = await doctorRepo.findById(doctorId);

      if (!doctor) {
        throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
      }

      const chatSession = await chatSessionRepo.findById(chatSessionId);
      if (!chatSession) {
        throw new NotFoundError(MESSAGE.CHAT_SESSION_NOT_FOUND);
      }
      const chatMessageId = this._idGenerator.generate(
        process.env.MESSAGE_PREFIX!
      );
      const chatMessage = ChatMessage.create(
        chatMessageId,
        chatSession.id,
        doctor.id,
        USER_ROLES.DOCTOR,
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
          `chat:${chatSession.id}`,
          "chat:send",
          { message: chatMessage.message }
        );

        this._realTimeNotifier.emitToRoom(
          `user:${USER_ROLES.PATIENT}:${chatSession.patientId}`,
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
