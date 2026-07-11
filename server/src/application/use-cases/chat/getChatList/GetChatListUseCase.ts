import type { IGetChatListUseCase } from "@application/ports/use-cases/chat/IGetChatListUseCase.ts";
import type { IGetChatListDTO } from "./IGetChatListDTO.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { IPatientRepository } from "@application/ports/repositories/IPatientRepository.ts";
import type { IChatSessionRepository } from "@application/ports/repositories/IChatSessionRepository.ts";
import type { IChatMessageRepository } from "@application/ports/repositories/IChatMessageRepository.ts";
import { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";
import { NotFoundError } from "@shared/errors/NotFoundError.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import type { IFileUpload } from "@application/ports/services/IFileUpload.ts";

export class GetChatListUseCase implements IGetChatListUseCase {
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
    userType: USER_ROLES
  ): Promise<IGetChatListDTO> {
    this._logger.info("User Get chat list attempt", { userId });

    let sender;
    if (userType === USER_ROLES.DOCTOR) {
      sender = await this._doctorRepo.findById(userId);
    } else if (userType === USER_ROLES.PATIENT) {
      sender = await this._patientRepo.findById(userId);
    }

    if (!sender) {
      throw new NotFoundError(MESSAGE.USER_NOT_FOUND);
    }

    const chatSessions = await this._chatSessionRepo.findManyByUserIdAndType(
      sender.id,
      userType
    );
    console.log(chatSessions);
    const result: IGetChatListDTO["chats"] = {
      expired: [],
      active: [],
    };
    for (const session of chatSessions) {
      const lastMessage =
        (await this._chatMessageRepo.findLastMessageWithSessionId(session.id))!;

      const sendee =
        userType === USER_ROLES.DOCTOR
          ? await this._patientRepo.findById(session.patientId)
          : await this._doctorRepo.findById(session.doctorId);

      const diffMs = session.expiresAt.getTime() - new Date().getTime();
      const absDiffMs = Math.abs(diffMs);
      const days = Math.floor(absDiffMs / 86400000);
      const remainingMs = absDiffMs % 86400000;
      const remainingMinutes = Math.floor(remainingMs / 60000);

      const expiresIn =
        days > 0
          ? `${days} days`
          : remainingMinutes > 60
            ? `${Math.floor(remainingMinutes / 60)} hours`
            : `${remainingMinutes} mins`;
      console.log("IS EXPIRED", diffMs);
      if (diffMs > 0) {
        result.active.push({
          id: session.id,
          name: sendee?.fullName ?? "Unknown User",
          profilePic: sendee?.profilePicKey
            ? this._fileUpload.getFileUrl(sendee.profilePicKey)
            : null,
          message: lastMessage?.message,
          expiresIn,
        });
      } else {
        result.expired.push({
          id: session.id,
          name: sendee?.fullName ?? "Unknown User",
          profilePic: sendee?.profilePicKey
            ? this._fileUpload.getFileUrl(sendee.profilePicKey)
            : null,
          message: lastMessage?.message,
          expiresIn,
        });
      }
    }

    return { chats: result };
  }
}
