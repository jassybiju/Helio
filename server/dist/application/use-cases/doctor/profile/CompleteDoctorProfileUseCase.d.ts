import type { ICompleteDoctorProfileRequestDTO, ICompleteDoctorProfileResponseDTO } from "#application/dto/doctor/auth/ICompleteDoctorProfileDTO.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IFileUpload } from "#application/ports/services/IFileUpload.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { ICompleteDoctorProfileUseCase } from "#application/ports/use-cases/doctor/auth/ICompleteDoctorProfileUseCase.js";
export declare class CompleteDoctorProfileUseCase implements ICompleteDoctorProfileUseCase {
    private readonly _logger;
    private readonly _doctorRepo;
    private readonly _fileUpload;
    constructor(_logger: ILogger, _doctorRepo: IDoctorRepository, _fileUpload: IFileUpload);
    execute(userId: string, input: ICompleteDoctorProfileRequestDTO): Promise<ICompleteDoctorProfileResponseDTO>;
}
//# sourceMappingURL=CompleteDoctorProfileUseCase.d.ts.map