import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { IConsultationRepository } from "#application/ports/repositories/IConsultationRepository.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { ILabReportRepository } from "#application/ports/repositories/ILabReportRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IViewHistoryUseCase } from "#application/ports/use-cases/doctor/consultation/IViewHistoryUseCase.js";
import type { IDoctorViewHistoryDTO } from "./IDoctorViewHistoryDTO.js";
import type { IFileUpload } from "#application/ports/services/IFileUpload.js";
export declare class DoctorViewHistoryUseCase implements IViewHistoryUseCase {
    private readonly _logger;
    private readonly _doctorRepo;
    private readonly _consultationRepo;
    private readonly _appointmentRepo;
    private readonly _labRepo;
    private readonly _fileUpload;
    constructor(_logger: ILogger, _doctorRepo: IDoctorRepository, _consultationRepo: IConsultationRepository, _appointmentRepo: IAppointmentRepository, _labRepo: ILabReportRepository, _fileUpload: IFileUpload);
    execute(doctorId: string, appointmentId: string, page?: number, limit?: number): Promise<IDoctorViewHistoryDTO>;
}
//# sourceMappingURL=DoctorViewHistoryUseCase.d.ts.map