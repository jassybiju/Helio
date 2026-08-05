import type { DoctorViewAllInput, IDoctorViewAllAppointmentUseCase } from "#application/ports/use-cases/doctor/appointment/IDoctorViewAllAppointmentUseCase.js";
import type { PaginationResponse } from "#shared/types/pagination.types.js";
import type { IDoctorViewAllAppointmentDTO } from "./IDoctorViewAllAppointmentDTO.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
export declare class DoctorViewAllAppointmentUseCase implements IDoctorViewAllAppointmentUseCase {
    private readonly _logger;
    private readonly _doctorRepo;
    private readonly _appointmentRepo;
    constructor(_logger: ILogger, _doctorRepo: IDoctorRepository, _appointmentRepo: IAppointmentRepository);
    execute(doctorId: string, input: DoctorViewAllInput): Promise<PaginationResponse<IDoctorViewAllAppointmentDTO[]>>;
}
//# sourceMappingURL=DoctorViewAllAppointmentUseCase.d.ts.map