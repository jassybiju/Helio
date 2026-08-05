import type { IChangeDoctorApprovalStatusUseCase } from "#application/ports/use-cases/admin/doctor/IChangeDoctorApprovalStatusUseCase.js";
import type { IChangeDoctorApprovalStatusRequestDTO, IChangeDoctorApprovalStatusResponseDTO } from "./IChangeDoctorApprovalStatusDTO.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
export declare class ChangeDoctorApprovalStatusUseCase implements IChangeDoctorApprovalStatusUseCase {
    private readonly _logger;
    private readonly _doctorRepo;
    constructor(_logger: ILogger, _doctorRepo: IDoctorRepository);
    execute(input: IChangeDoctorApprovalStatusRequestDTO, doctorId: string): Promise<IChangeDoctorApprovalStatusResponseDTO>;
}
//# sourceMappingURL=ChangeDoctorApprovalStatusUseCase.d.ts.map