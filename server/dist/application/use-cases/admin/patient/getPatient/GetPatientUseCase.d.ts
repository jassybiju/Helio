import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IGetPatientUseCase } from "#application/ports/use-cases/admin/patient/IGetPatientUseCase.js";
import type { IGetPatientResponseDTO } from "./IGetPatientDTO.js";
import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
export declare class GetPatientUseCase implements IGetPatientUseCase {
    private readonly _logger;
    private readonly _patientRepo;
    private readonly _appointmentRepo;
    constructor(_logger: ILogger, _patientRepo: IPatientRepository, _appointmentRepo: IAppointmentRepository);
    execute(patientId: string): Promise<IGetPatientResponseDTO>;
}
//# sourceMappingURL=GetPatientUseCase.d.ts.map