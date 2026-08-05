import type { IGetMeResponseDTO } from "#application/dto/auth/IGetMeDTO.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IGetMeHandler } from "#application/ports/use-cases/auth/IGetMeHandler.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import type { IFileUpload } from "#application/ports/services/IFileUpload.js";
export declare class DoctorGetMeHandler implements IGetMeHandler {
    private readonly _doctorRepo;
    private readonly _fileUpload;
    constructor(_doctorRepo: IDoctorRepository, _fileUpload: IFileUpload);
    supports(role: USER_ROLES): boolean;
    execute(id: string): Promise<IGetMeResponseDTO>;
}
//# sourceMappingURL=DoctorGetMeHandler.d.ts.map