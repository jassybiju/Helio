import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { IReviewRepository } from "#application/ports/repositories/IReviewRepository.js";
import type { IIDGenerator } from "#application/ports/services/IIDGenerator.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IAddReview } from "#application/ports/use-cases/patient/review/IAddReview.js";
export declare class PatientAddReviewUseCase implements IAddReview {
    private readonly _logger;
    private readonly _patientRepo;
    private readonly _doctorRepo;
    private readonly _reviewRepo;
    private readonly _appointmentRepo;
    private readonly _idGenerator;
    constructor(_logger: ILogger, _patientRepo: IPatientRepository, _doctorRepo: IDoctorRepository, _reviewRepo: IReviewRepository, _appointmentRepo: IAppointmentRepository, _idGenerator: IIDGenerator);
    execute(patientId: string, doctorId: string, data: {
        comment: string;
        rating: number;
    }): Promise<void>;
}
//# sourceMappingURL=PatientAddReviewUseCase.d.ts.map