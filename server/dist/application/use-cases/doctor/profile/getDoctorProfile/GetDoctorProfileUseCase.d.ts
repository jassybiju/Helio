import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IGetDoctorProfileUseCase } from "#application/ports/use-cases/doctor/profile/IGetDoctorProfileUseCase.js";
import type { IFileUpload } from "#application/ports/services/IFileUpload.js";
export declare class GetDoctorProfileUseCase implements IGetDoctorProfileUseCase {
    private readonly _logger;
    private readonly _doctorRepo;
    private readonly _fileUpload;
    constructor(_logger: ILogger, _doctorRepo: IDoctorRepository, _fileUpload: IFileUpload);
    execute(doctorId: string): Promise<{
        id: string;
        fullName: string;
        email: string;
        specialization: string | null;
        bio: string | null;
        yearsOfExperience: number | null;
        onlineFee: number | null;
        clinicFee: number | null;
        profilePic: string | null;
    }>;
}
//# sourceMappingURL=GetDoctorProfileUseCase.d.ts.map