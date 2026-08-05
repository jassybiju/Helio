import type { IDoctorGetChatListUseCase } from "#application/ports/use-cases/doctor/chat/IDoctorGetChatListUseCase.js";
import type { IDoctorGetChatListDTO } from "./IDoctorGetChatListDTO.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { IChatSessionRepository } from "#application/ports/repositories/IChatSessionRepository.js";
import type { IChatMessageRepository } from "#application/ports/repositories/IChatMessageRepository.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";
import { MESSAGE } from "#shared/constants/messages.js";

export class DoctorGetChatListUseCase implements IDoctorGetChatListUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _patientRepo: IPatientRepository,
    private readonly _chatSessionRepo: IChatSessionRepository,
    private readonly _chatMessageRepo: IChatMessageRepository
  ) {}
  async execute(doctorId: string): Promise<IDoctorGetChatListDTO> {
    this._logger.info("Doctor Get chat list attempt", { doctorId });

    const doctor = await this._doctorRepo.findById(doctorId);
    if (!doctor) {
      throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
    }

    const chatSessions = await this._chatSessionRepo.findManyByDoctorId(
      doctor.id
    );
    const result: IDoctorGetChatListDTO["chats"] = {
      expired: [],
      active: [],
    };
    for (const session of chatSessions) {
      const lastMessage =
        (await this._chatMessageRepo.findLastMessageWithSessionId(session.id))!;

      const patient = (await this._patientRepo.findById(session.patientId))!;

      const diffMs = Math.abs(
        session.expiresAt.getTime() - new Date().getTime()
      );

      const days = Math.floor(diffMs / 86400000);
      const remainingMs = diffMs % 86400000;
      const remainingMinutes = Math.floor(remainingMs / 60000);

      const expiresIn =
        days > 0
          ? `${days} days`
          : remainingMinutes > 60
            ? `${Math.floor(remainingMinutes / 60)} hours`
            : `${remainingMinutes} mins`;
      result.active.push({
        id: session.id,
        name: patient?.fullName,
        profilePic: "",
        message: lastMessage?.message,
        expiresIn,
      });
    }

    return { chats: result };
  }
}
