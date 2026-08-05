import type { IDoctorGetChatUseCase } from "#application/ports/use-cases/doctor/chat/IDoctorGetChatUseCase.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { IChatSessionRepository } from "#application/ports/repositories/IChatSessionRepository.js";
import type { IChatMessageRepository } from "#application/ports/repositories/IChatMessageRepository.js";
import type { IDoctorGetChatDTO } from "#application/use-cases/doctor/chat/getChat/IDoctorGetChatDTO.js";
export declare class DoctorGetChatUseCase implements IDoctorGetChatUseCase {
    private readonly _logger;
    private readonly _doctorRepo;
    private readonly _patientRepo;
    private readonly _chatSessionRepo;
    private readonly _chatMessageRepo;
    constructor(_logger: ILogger, _doctorRepo: IDoctorRepository, _patientRepo: IPatientRepository, _chatSessionRepo: IChatSessionRepository, _chatMessageRepo: IChatMessageRepository);
    execute(doctorId: string, chatSessionId: string): Promise<IDoctorGetChatDTO>;
}
//# sourceMappingURL=PatientGetChatUseCase.d.ts.map