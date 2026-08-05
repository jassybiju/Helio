import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { IIDGenerator } from "#application/ports/services/IIDGenerator.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IAddPatientAllergenUseCase } from "#application/ports/use-cases/patient/profile/IAddPatientAllergenUseCase.js";
import type { ALLERGEN_SEVERITY } from "#domain/common/enums/allergen_severity.js";
export declare class AddPatientAllergenUseCase implements IAddPatientAllergenUseCase {
    private readonly _logger;
    private readonly _patientRepo;
    private readonly _idGenerator;
    constructor(_logger: ILogger, _patientRepo: IPatientRepository, _idGenerator: IIDGenerator);
    execute(patientId: string, allergen: string, severity: ALLERGEN_SEVERITY): Promise<void>;
}
//# sourceMappingURL=AddPatientAllergenUseCase.d.ts.map