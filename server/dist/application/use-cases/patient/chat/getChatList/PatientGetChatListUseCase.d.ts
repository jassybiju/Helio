import type { IDoctorGetChatListUseCase } from "#application/ports/use-cases/doctor/chat/IDoctorGetChatListUseCase.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { IChatSessionRepository } from "#application/ports/repositories/IChatSessionRepository.js";
import type { IChatMessageRepository } from "#application/ports/repositories/IChatMessageRepository.js";
import type { IDoctorGetChatListDTO } from "#application/use-cases/doctor/chat/getChatList/IDoctorGetChatListDTO.js";
export declare class DoctorGetChatListUseCase implements IDoctorGetChatListUseCase {
    private readonly _logger;
    private readonly _doctorRepo;
    private readonly _patientRepo;
    private readonly _chatSessionRepo;
    private readonly _chatMessageRepo;
    constructor(_logger: ILogger, _doctorRepo: IDoctorRepository, _patientRepo: IPatientRepository, _chatSessionRepo: IChatSessionRepository, _chatMessageRepo: IChatMessageRepository);
    execute(doctorId: string): Promise<IDoctorGetChatListDTO>;
}
//# sourceMappingURL=PatientGetChatListUseCase.d.ts.map