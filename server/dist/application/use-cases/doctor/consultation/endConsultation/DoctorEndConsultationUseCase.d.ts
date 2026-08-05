import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { IChatSessionRepository } from "#application/ports/repositories/IChatSessionRepository.js";
import type { IConsultationRepository } from "#application/ports/repositories/IConsultationRepository.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IWalletRepository } from "#application/ports/repositories/IWalletRepository.js";
import type { IWalletTransactionRepository } from "#application/ports/repositories/IWalletTransactionRepository.js";
import type { IIDGenerator } from "#application/ports/services/IIDGenerator.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IUnitOfWork } from "#application/ports/services/IUnitOfWork.js";
import type { IDoctorEndConsultationUseCase } from "#application/ports/use-cases/doctor/consultation/IDoctorEndConsultationUseCase.js";
export declare class DoctorEndConsultationUseCase implements IDoctorEndConsultationUseCase {
    private readonly _logger;
    private readonly _doctorRepo;
    private readonly _appointmentRepo;
    private readonly _consultationRepo;
    private readonly _chatSessionRepo;
    private readonly _idGenerator;
    private readonly _uow;
    private readonly _transactionRepo;
    private readonly _walletRepo;
    constructor(_logger: ILogger, _doctorRepo: IDoctorRepository, _appointmentRepo: IAppointmentRepository, _consultationRepo: IConsultationRepository, _chatSessionRepo: IChatSessionRepository, _idGenerator: IIDGenerator, _uow: IUnitOfWork, _transactionRepo: IWalletTransactionRepository, _walletRepo: IWalletRepository);
    execute(doctorId: string, appointmentId: string): Promise<void>;
}
//# sourceMappingURL=DoctorEndConsultationUseCase.d.ts.map