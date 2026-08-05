import type { IDoctorGetChatUseCase } from "#application/ports/use-cases/doctor/chat/IDoctorGetChatUseCase.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { IChatSessionRepository } from "#application/ports/repositories/IChatSessionRepository.js";
import type { IChatMessageRepository } from "#application/ports/repositories/IChatMessageRepository.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";
import { MESSAGE } from "#shared/constants/messages.js";
import type { IDoctorGetChatDTO } from "#application/use-cases/doctor/chat/getChat/IDoctorGetChatDTO.js";

export class DoctorGetChatUseCase implements IDoctorGetChatUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _patientRepo: IPatientRepository,
    private readonly _chatSessionRepo: IChatSessionRepository,
    private readonly _chatMessageRepo: IChatMessageRepository
  ) {}

  async execute(
    doctorId: string,
    chatSessionId: string
  ): Promise<IDoctorGetChatDTO> {
    this._logger.info("Doctor Get Chat Attempt", { doctorId, chatSessionId });
    const doctor = await this._doctorRepo.findById(doctorId);

    if (!doctor) {
      throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
    }

    const chatSession = await this._chatSessionRepo.findById(chatSessionId);

    if (!chatSession) {
      throw new NotFoundError(MESSAGE.CHAT_SESSION_NOT_FOUND);
    }

    const patient = await this._patientRepo.findById(chatSession.patientId);

    if (!patient) {
      throw new NotFoundError(MESSAGE.PATIENT_NOT_FOUND);
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
      patient: {
        id: patient.id,
        name: patient.fullName,
        profilePic: "",
      },
      sessionId: chatSession.id,
    };
  }
}
