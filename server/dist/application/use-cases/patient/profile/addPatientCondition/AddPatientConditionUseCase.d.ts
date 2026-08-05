import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { IIDGenerator } from "#application/ports/services/IIDGenerator.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IAddPatientConditionUseCase } from "#application/ports/use-cases/patient/profile/IAddPatientConditionUseCase.js";
export declare class AddPatientConditionUseCase implements IAddPatientConditionUseCase {
    private readonly _logger;
    private readonly _patientRepo;
    private readonly _idGenerator;
    constructor(_logger: ILogger, _patientRepo: IPatientRepository, _idGenerator: IIDGenerator);
    execute(patientId: string, condition: string): Promise<void>;
}
//# sourceMappingURL=AddPatientConditionUseCase.d.ts.map