import type { DOCTOR_VERIFICATION_STATUS } from "@domain/common/enums/doctor.enum.ts";
import type { Doctor } from "@domain/entities/Doctor.ts";

export type GetDoctorUseCaseResult = {
  doctor: Doctor;
  documentUrl: string | null;
  verificationHistory: {
    status: DOCTOR_VERIFICATION_STATUS;
    reason: string | null;
    documentUrl: string | null;
    actedAt: string;
  }[];
};

export interface IGetDoctorUseCase {
  execute(doctorId: string): Promise<GetDoctorUseCaseResult>;
}
