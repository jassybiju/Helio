import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IToggleBlockPatientUseCase } from "#application/ports/use-cases/admin/patient/IToggleBlockPatientUseCase.js";
export declare class ToggleBlockPatientUseCase implements IToggleBlockPatientUseCase {
    private readonly _logger;
    private readonly _patientRepo;
    constructor(_logger: ILogger, _patientRepo: IPatientRepository);
    execute(userId: string): Promise<void>;
}
//# sourceMappingURL=ToggleBlockPatientUseCase.d.ts.map