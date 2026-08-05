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
export declare class SendMessageUseCase implements ISendMessageUseCase {
    private readonly _logger;
    private readonly _patientRepo;
    private readonly _doctorRepo;
    private readonly _chatSessionRepo;
    private readonly _chatMessageRepo;
    private readonly _idGenerator;
    private readonly _realTimeNotifier;
    private readonly _uow;
    constructor(_logger: ILogger, _patientRepo: IPatientRepository, _doctorRepo: IDoctorRepository, _chatSessionRepo: IChatSessionRepository, _chatMessageRepo: IChatMessageRepository, _idGenerator: IIDGenerator, _realTimeNotifier: IRealTimeNotifier, _uow: IUnitOfWork);
    execute(senderId: string, chatSessionId: string, senderType: USER_ROLES, content: string): Promise<{
        id: string;
        message: string;
        sendBy: USER_ROLES;
        sendAt: Date;
    }>;
}
//# sourceMappingURL=SendMessageUseCase.d.ts.map