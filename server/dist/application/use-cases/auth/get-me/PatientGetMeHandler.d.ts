import type { IGetMeResponseDTO } from "#application/dto/auth/IGetMeDTO.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { IGetMeHandler } from "#application/ports/use-cases/auth/IGetMeHandler.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import type { IFileUpload } from "#application/ports/services/IFileUpload.js";
export declare class PatientGetMeHandler implements IGetMeHandler {
    private readonly _patientRepo;
    private readonly _fileUpload;
    constructor(_patientRepo: IPatientRepository, _fileUpload: IFileUpload);
    supports(role: USER_ROLES): boolean;
    execute(id: string): Promise<IGetMeResponseDTO>;
}
//# sourceMappingURL=PatientGetMeHandler.d.ts.map