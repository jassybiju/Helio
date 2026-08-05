import type { IGetSlotUseCase } from "#application/ports/use-cases/patient/appointments/IGetSlotUseCase.js";
import type { IGetSlotDTO } from "./IGetSlotDTO.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IDoctorShiftRepository } from "#application/ports/repositories/IDoctorShiftRepository.js";
import type { IDoctorBlockShiftRepository } from "#application/ports/repositories/IDoctorBlockShiftRepository.js";
import type { ISlotGenerator } from "#application/ports/services/ISlotGenerator.js";
import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { IReviewRepository } from "#application/ports/repositories/IReviewRepository.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { IFileUpload } from "#application/ports/services/IFileUpload.js";
export declare class GetSlotUseCase implements IGetSlotUseCase {
    private readonly _logger;
    private readonly _doctorRepo;
    private readonly _doctorShiftRepo;
    private readonly _blockSlotRepo;
    private readonly _slotService;
    private readonly _appointmentRepo;
    private readonly _reviewRepo;
    private readonly _patientRepo;
    private readonly _fileUpload;
    constructor(_logger: ILogger, _doctorRepo: IDoctorRepository, _doctorShiftRepo: IDoctorShiftRepository, _blockSlotRepo: IDoctorBlockShiftRepository, _slotService: ISlotGenerator, _appointmentRepo: IAppointmentRepository, _reviewRepo: IReviewRepository, _patientRepo: IPatientRepository, _fileUpload: IFileUpload);
    execute(doctorId: string, patientId: string, reviewInput: {
        page?: number | undefined;
        limit?: number | undefined;
    }): Promise<{
        slots: IGetSlotDTO;
        doctor: {
            fullName: string;
            speciality: string | null;
            onlineFee: number | null;
            clinicFee: number | null;
            yearsOfExperience: number | null;
            doctorId: string;
            profilePic: string | null;
        };
        reviews: {
            id: string;
            patientName: string;
            comments: string;
            ratings: number;
            createdAt: Date;
            profilePic: string | null;
        }[];
        totalReviews: number[];
    }>;
    private isSlotBlocked;
    private getSlotStatus;
}
//# sourceMappingURL=GetSlotUseCase.d.ts.map