import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { IWalletRepository } from "#application/ports/repositories/IWalletRepository.js";
import type { IWalletTransactionRepository } from "#application/ports/repositories/IWalletTransactionRepository.js";
import type { IIDGenerator } from "#application/ports/services/IIDGenerator.js";
import type { IPaymentService } from "#application/ports/services/IPaymentService.js";
import type { IUnitOfWork } from "#application/ports/services/IUnitOfWork.js";
import type { Appointment } from "#domain/entities/Appointment.js";
export declare class WalletPaymentService implements IPaymentService {
    private readonly _walletRepo;
    private readonly _appointmentRepo;
    private readonly _transactionRepo;
    private readonly _idGenerator;
    private readonly _uow;
    constructor(_walletRepo: IWalletRepository, _appointmentRepo: IAppointmentRepository, _transactionRepo: IWalletTransactionRepository, _idGenerator: IIDGenerator, _uow: IUnitOfWork);
    pay(data: {
        appointment: Appointment;
        patientId: string;
        amount: number;
    }): Promise<{
        success: true;
    } | {
        orderId: string;
    }>;
}
//# sourceMappingURL=WalletPaymentService.d.ts.map