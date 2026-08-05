import type { IChatMessageRepository } from "#application/ports/repositories/IChatMessageRepository.js";
import type { IChatSessionRepository } from "#application/ports/repositories/IChatSessionRepository.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { IIDGenerator } from "#application/ports/services/IIDGenerator.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IRealTimeNotifier } from "#application/ports/services/IRealTimeNotifier.js";
import type { IUnitOfWork } from "#application/ports/services/IUnitOfWork.js";
import type { IPatientSendMessageUseCase } from "#application/ports/use-cases/patient/chat/IPatientSendMessageUseCase.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
export declare class PaitentSendMessageUseCase implements IPatientSendMessageUseCase {
    private readonly _logger;
    private readonly _patientRepo;
    private readonly _chatSessionRepo;
    private readonly _chatMessageRepo;
    private readonly _idGenerator;
    private readonly _realTimeNotifier;
    private readonly _uow;
    constructor(_logger: ILogger, _patientRepo: IPatientRepository, _chatSessionRepo: IChatSessionRepository, _chatMessageRepo: IChatMessageRepository, _idGenerator: IIDGenerator, _realTimeNotifier: IRealTimeNotifier, _uow: IUnitOfWork);
    /**
     * sends Message to the doctor
     * @param doctorId
     * @param chatSessionId
     * @param content
     * @returns
     */
    execute(doctorId: string, chatSessionId: string, content: string): Promise<{
        id: string;
        message: string;
        sendBy: USER_ROLES;
        sendAt: Date;
    }>;
}
//# sourceMappingURL=PatientSendMessageUseCase.d.ts.map