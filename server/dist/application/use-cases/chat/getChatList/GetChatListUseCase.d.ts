import type { IGetChatListUseCase } from "#application/ports/use-cases/chat/IGetChatListUseCase.js";
import type { IGetChatListDTO } from "./IGetChatListDTO.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { IChatSessionRepository } from "#application/ports/repositories/IChatSessionRepository.js";
import type { IChatMessageRepository } from "#application/ports/repositories/IChatMessageRepository.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import type { IFileUpload } from "#application/ports/services/IFileUpload.js";
export declare class GetChatListUseCase implements IGetChatListUseCase {
    private readonly _logger;
    private readonly _doctorRepo;
    private readonly _patientRepo;
    private readonly _chatSessionRepo;
    private readonly _chatMessageRepo;
    private readonly _fileUpload;
    constructor(_logger: ILogger, _doctorRepo: IDoctorRepository, _patientRepo: IPatientRepository, _chatSessionRepo: IChatSessionRepository, _chatMessageRepo: IChatMessageRepository, _fileUpload: IFileUpload);
    execute(userId: string, userType: USER_ROLES): Promise<IGetChatListDTO>;
}
//# sourceMappingURL=GetChatListUseCase.d.ts.map