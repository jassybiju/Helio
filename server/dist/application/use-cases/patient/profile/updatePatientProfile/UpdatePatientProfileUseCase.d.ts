import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IUpdatePatientInput, IUpdatePatientProfileUseCase } from "#application/ports/use-cases/patient/profile/IUpdatePatientProfileUseCase.js";
export declare class UpdatePatientProfileUseCase implements IUpdatePatientProfileUseCase {
    private readonly _logger;
    private readonly _patientRepo;
    constructor(_logger: ILogger, _patientRepo: IPatientRepository);
    execute(input: IUpdatePatientInput): Promise<void>;
}
//# sourceMappingURL=UpdatePatientProfileUseCase.d.ts.map