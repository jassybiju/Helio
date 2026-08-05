import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IUpdateDoctorFeeUseCase } from "#application/ports/use-cases/doctor/profile/IUpdateDoctorFeeUseCase.js";
export declare class UpdateDoctorFeeUseCase implements IUpdateDoctorFeeUseCase {
    private readonly _logger;
    private readonly _doctorRepo;
    constructor(_logger: ILogger, _doctorRepo: IDoctorRepository);
    execute(doctorId: string, onlineFee: number, clinicFee: number): Promise<void>;
}
//# sourceMappingURL=UpdateDoctorFeeUseCase.d.ts.map