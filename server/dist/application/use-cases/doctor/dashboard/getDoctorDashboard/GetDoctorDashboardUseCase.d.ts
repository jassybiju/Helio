import type { IGetDoctorDashboardUseCase } from "#application/ports/use-cases/doctor/dashboard/IGetDoctorDashboardUseCase.js";
import type { IGetDoctorDashboardDTO } from "./IGetDoctorDashboardDTO.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import { BOOKING_PERIOD } from "#domain/common/enums/appointment.enum.js";
import type { IWalletRepository } from "#application/ports/repositories/IWalletRepository.js";
import type { IWalletTransactionRepository } from "#application/ports/repositories/IWalletTransactionRepository.js";
export declare class GetDoctorDashboardUseCase implements IGetDoctorDashboardUseCase {
    private readonly _logger;
    private readonly _doctorRepo;
    private readonly _appointmentRepo;
    private readonly _patientRepo;
    private readonly _walletRepo;
    private readonly _transactionRepo;
    constructor(_logger: ILogger, _doctorRepo: IDoctorRepository, _appointmentRepo: IAppointmentRepository, _patientRepo: IPatientRepository, _walletRepo: IWalletRepository, _transactionRepo: IWalletTransactionRepository);
    execute(doctorId: string, period: BOOKING_PERIOD): Promise<IGetDoctorDashboardDTO>;
}
//# sourceMappingURL=GetDoctorDashboardUseCase.d.ts.map