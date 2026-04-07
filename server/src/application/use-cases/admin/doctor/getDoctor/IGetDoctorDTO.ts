import type { DOCTOR_VERIFICATION_STATUS } from "@domain/common/enums/doctor.enum.ts";
import type { GENDER } from "@domain/common/enums/gender.enum.ts";

export type IGetDoctorResponseDTO = {
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
