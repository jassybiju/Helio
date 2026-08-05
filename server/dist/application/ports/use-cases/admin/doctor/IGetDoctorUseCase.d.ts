import type { DOCTOR_VERIFICATION_STATUS } from "#domain/common/enums/doctor.enum.js";
import type { Doctor } from "#domain/entities/Doctor.js";
export type GetDoctorUseCaseResult = {
    doctor: Doctor;
    documentUrl: string | null;
    verificationHistory: {
        status: DOCTOR_VERIFICATION_STATUS;
        reason: string | null;
        documentUrl: string | null;
        actedAt: string;
    }[];
    totalAppointments: number;
    appointmentStatusDistribution: {
        confirmed: number;
        ongoing: number;
        completed: number;
        cancelled: number;
        noShow: number;
        expired: number;
    };
};
export interface IGetDoctorUseCase {
    execute(doctorId: string): Promise<GetDoctorUseCaseResult>;
}
//# sourceMappingURL=IGetDoctorUseCase.d.ts.map