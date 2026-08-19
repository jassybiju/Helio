import type { IChatMessageRepository } from "#application/ports/repositories/IChatMessageRepository.js";
import type { IChatSessionRepository } from "#application/ports/repositories/IChatSessionRepository.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IGetChatUseCase } from "#application/ports/use-cases/chat/IGetChatUseCase.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";
import type { IGetChatDTO } from "./IGetChatDTO.js";
import type { IFileUpload } from "#application/ports/services/IFileUpload.js";

export class GetChatUseCase implements IGetChatUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _patientRepo: IPatientRepository,
    private readonly _chatSessionRepo: IChatSessionRepository,
    private readonly _chatMessageRepo: IChatMessageRepository,
    private readonly _fileUpload: IFileUpload
  ) {}
  async execute(
    userId: string,
    chatSessionId: string,
    userRole: USER_ROLES
  ): Promise<IGetChatDTO> {
    this._logger.info("User Get Chat Attempt", { userId, chatSessionId });

    let sender;
    if (userRole === USER_ROLES.DOCTOR) {
      sender = await this._doctorRepo.findById(userId);
    } else if (userRole === USER_ROLES.PATIENT) {
      sender = await this._patientRepo.findById(userId);
    }
    if (!sender) {
      throw new NotFoundError(MESSAGE.USER_NOT_FOUND);
    }

    const chatSession = await this._chatSessionRepo.findById(chatSessionId);

    if (!chatSession) {
      throw new NotFoundError(MESSAGE.CHAT_SESSION_NOT_FOUND);
    }

    let sendee;

    if (userRole === USER_ROLES.PATIENT) {
      sendee = await this._doctorRepo.findById(chatSession.doctorId);
    } else if (userRole === USER_ROLES.DOCTOR) {
      sendee = await this._patientRepo.findById(chatSession.patientId);
    }
    if (!sendee) {
      throw new NotFoundError(MESSAGE.USER_NOT_FOUND);
    }

    const chats = await this._chatMessageRepo.findMessagesWithSessionId(
      chatSession.id
    );

    return {
      chats: chats.map((chat) => ({
        id: chat.id,
        message: chat.message,
        sendBy: chat.senderRole,
        sendAt: chat.createdAt,
      })),
      sendee: {
        id: sendee.id,
        name: sendee.fullName,
        profilePic: sendee.profilePicKey
          ? await this._fileUpload.getFileUrl(sendee.profilePicKey)
          : null,
      },
      isExpired: chatSession.isExpired(),
      sessionId: chatSession.id,
    };
  }
}
