import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { IWalletRepository } from "#application/ports/repositories/IWalletRepository.js";
import type { IWalletTransactionRepository } from "#application/ports/repositories/IWalletTransactionRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IUnitOfWork } from "#application/ports/services/IUnitOfWork.js";
import type { IRespondPatientCancelAndRefundAppointment } from "#application/ports/use-cases/patient/appointments/cancellation/IRespondPatientCancelAndRefundAppointment.js";
import type { IIDGenerator } from "#application/ports/services/IIDGenerator.js";
export declare class RespondPatientCancelAndRefundAppointmentUseCase implements IRespondPatientCancelAndRefundAppointment {
    private readonly _logger;
    private readonly _patientRepo;
    private readonly _appointmentRepo;
    private readonly _walletRepo;
    private readonly _transactionRepo;
    private readonly _idGenerator;
    private readonly _uow;
    constructor(_logger: ILogger, _patientRepo: IPatientRepository, _appointmentRepo: IAppointmentRepository, _walletRepo: IWalletRepository, _transactionRepo: IWalletTransactionRepository, _idGenerator: IIDGenerator, _uow: IUnitOfWork);
    execute(patientId: string, appointmentId: string): Promise<void>;
}
//# sourceMappingURL=RespondPatientCancelAndRefundUseCase.d.ts.map