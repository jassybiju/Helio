import type { DOCTOR_VERIFICATION_STATUS } from "#domain/common/enums/doctor.enum.js";
import type { GENDER } from "#domain/common/enums/gender.enum.js";
export type IGetDoctorResponseDTO = {
    doctor: {
        id: string;
        email: string;
        fullName: string;
        gender: GENDER | null;
        specialization: string | null;
        careerStartYear: number | null;
        bio: string | null;
        verificationStatus: DOCTOR_VERIFICATION_STATUS;
        rejectionReason: string | null;
        documentUrl: string | null;
        additionalInfo: string | null;
        verificationHistory: {
            status: DOCTOR_VERIFICATION_STATUS;
            reason: string | null;
            documentUrl: string | null;
            actedAt: string;
        }[];
        onlineFee: number | null;
        clinicFee: number | null;
        isVerified: boolean;
        isBlocked: boolean;
        createdAt: string;
        updatedAt: string;
    };
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
//# sourceMappingURL=IGetDoctorDTO.d.ts.map