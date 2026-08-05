import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IFileUpload } from "#application/ports/services/IFileUpload.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { GetDoctorUseCaseResult, IGetDoctorUseCase } from "#application/ports/use-cases/admin/doctor/IGetDoctorUseCase.js";
export declare class GetDoctorUseCase implements IGetDoctorUseCase {
    private readonly _logger;
    private readonly _doctorRepo;
    private readonly _fileUpload;
    private readonly _appointmentRepo;
    constructor(_logger: ILogger, _doctorRepo: IDoctorRepository, _fileUpload: IFileUpload, _appointmentRepo: IAppointmentRepository);
    execute(doctorId: string): Promise<GetDoctorUseCaseResult>;
}
//# sourceMappingURL=GetDoctorUseCase.d.ts.map