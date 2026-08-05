import type { IGetAdminDashboardUseCase } from "#application/ports/use-cases/admin/IGetAdminDashboardUseCase.js";
import { BOOKING_PERIOD } from "#domain/common/enums/appointment.enum.js";
import type { IGetAdminDashboardDTO } from "./IGetAdminDashboardDTO.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { IWalletTransactionRepository } from "#application/ports/repositories/IWalletTransactionRepository.js";
import type { IWalletRepository } from "#application/ports/repositories/IWalletRepository.js";
export declare class GetAdminDashboardUseCase implements IGetAdminDashboardUseCase {
    private readonly _logger;
    private readonly _appointmentRepo;
    private readonly _doctorRepo;
    private readonly _patientRepo;
    private readonly _transactionRepo;
    private readonly _walletRepo;
    constructor(_logger: ILogger, _appointmentRepo: IAppointmentRepository, _doctorRepo: IDoctorRepository, _patientRepo: IPatientRepository, _transactionRepo: IWalletTransactionRepository, _walletRepo: IWalletRepository);
    execute(period: BOOKING_PERIOD): Promise<IGetAdminDashboardDTO>;
}
//# sourceMappingURL=GetAdminDashboardUseCase.d.ts.map