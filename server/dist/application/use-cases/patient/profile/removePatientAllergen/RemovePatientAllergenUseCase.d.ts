import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IRemovePatientAllergenUseCase } from "#application/ports/use-cases/patient/profile/IRemovePatientAllergenUseCase.js";
export declare class RemovePatientAllergenUseCase implements IRemovePatientAllergenUseCase {
    private readonly _logger;
    private readonly _patientRepo;
    constructor(_logger: ILogger, _patientRepo: IPatientRepository);
    execute(patientId: string, allergenId: string): Promise<void>;
}
//# sourceMappingURL=RemovePatientAllergenUseCase.d.ts.map