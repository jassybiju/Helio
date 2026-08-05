import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { ICompletePatientProfileUseCase } from "#application/ports/use-cases/patient/profile/ICompletePatientProfileUseCase.js";
import type { ICompletePatientProfileRequestDTO, ICompletePatientProfileResponseDTO } from "./ICompletePatientProfileDTO.js";
export declare class CompletePatientProfileUseCase implements ICompletePatientProfileUseCase {
    private readonly _logger;
    private readonly _patientRepo;
    constructor(_logger: ILogger, _patientRepo: IPatientRepository);
    execute(userId: string, input: ICompletePatientProfileRequestDTO): Promise<ICompletePatientProfileResponseDTO>;
}
//# sourceMappingURL=CompletePatientProfileUseCase.d.ts.map