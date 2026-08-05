import type { CONSULTATION_TYPE } from "#domain/common/enums/doctorShift.enum.js";
import type { GENDER } from "#domain/common/enums/gender.enum.js";
export type IGetPatientResponseDTO = {
    patient: {
        id: string;
        email: string;
        fullName: string;
        gender: GENDER | null;
        dob: string | null;
        bloodGroup: string | null;
        phone: string | null;
        isVerified: boolean;
        isBlocked: boolean;
        createdAt: string;
        updatedAt: string;
    };
    appointments: {
        id: string;
        doctorName: string;
        dateTime: string;
        consultationType: CONSULTATION_TYPE;
        status: string;
        paymentStatus: string;
        createdAt: string;
    }[];
    totalAppointments: number;
};
//# sourceMappingURL=IGetPatientDTO.d.ts.map