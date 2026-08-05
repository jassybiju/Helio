import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { IConsultationRepository } from "#application/ports/repositories/IConsultationRepository.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IAddPrescriptionUseCase } from "#application/ports/use-cases/doctor/consultation/IAddPrescriptionUseCase.js";
import type { FOOD_TIMING } from "#domain/common/enums/consultation.enum.js";
export declare class DoctorAddPrescriptionUseCase implements IAddPrescriptionUseCase {
    private readonly _logger;
    private readonly _doctorRepo;
    private readonly _consultationRepo;
    private readonly _appointmentRepo;
    constructor(_logger: ILogger, _doctorRepo: IDoctorRepository, _consultationRepo: IConsultationRepository, _appointmentRepo: IAppointmentRepository);
    execute(doctorId: string, appointmentId: string, data: {
        name: string;
        foodTiming: FOOD_TIMING;
        timings: {
            morning: boolean;
            afternoon: boolean;
            night: boolean;
        };
        durationInDays: number;
        instruction: string;
    }): Promise<void>;
}
//# sourceMappingURL=DoctorAddPrescriptionUseCase.d.ts.map