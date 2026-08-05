import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IRemovePatientConditionUseCase } from "#application/ports/use-cases/patient/profile/IRemovePatientConditionUseCase.js";
export declare class RemovePatientConditionUseCase implements IRemovePatientConditionUseCase {
    private readonly _logger;
    private readonly _patientRepo;
    constructor(_logger: ILogger, _patientRepo: IPatientRepository);
    execute(patientId: string, conditionId: string): Promise<void>;
}
//# sourceMappingURL=RemovePatientConditionUseCase.d.ts.map