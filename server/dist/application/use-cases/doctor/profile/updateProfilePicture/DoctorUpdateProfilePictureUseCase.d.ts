import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IFileUpload } from "#application/ports/services/IFileUpload.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IDoctorUpdateProfilePictureUseCase } from "#application/ports/use-cases/doctor/profile/IUpdateProfilePictureUseCase.js";
export declare class DoctorUpdateProfilePictureUseCase implements IDoctorUpdateProfilePictureUseCase {
    private readonly _logger;
    private readonly _doctorRepo;
    private readonly _fileUpload;
    constructor(_logger: ILogger, _doctorRepo: IDoctorRepository, _fileUpload: IFileUpload);
    execute(doctorId: string, document: {
        buffer: Buffer;
        mimetype: string;
        originalname: string;
    }): Promise<void>;
}
//# sourceMappingURL=DoctorUpdateProfilePictureUseCase.d.ts.map