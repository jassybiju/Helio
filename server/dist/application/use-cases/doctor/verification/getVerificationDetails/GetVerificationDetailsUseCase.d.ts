import type { IGetVerificationDetailsResponseDTO } from "#application/use-cases/doctor/verification/getVerificationDetails/IGetVerificationDetailsDTO.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IFileUpload } from "#application/ports/services/IFileUpload.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IGetVerificationDetailsUseCase } from "#application/ports/use-cases/doctor/verification/IGetVerificationDetailsUseCase.js";
export declare class GetVerificationDetailsUseCase implements IGetVerificationDetailsUseCase {
    private readonly _logger;
    private readonly _doctorRepo;
    private readonly _fileUpload;
    constructor(_logger: ILogger, _doctorRepo: IDoctorRepository, _fileUpload: IFileUpload);
    execute(userId: string): Promise<IGetVerificationDetailsResponseDTO>;
}
//# sourceMappingURL=GetVerificationDetailsUseCase.d.ts.map