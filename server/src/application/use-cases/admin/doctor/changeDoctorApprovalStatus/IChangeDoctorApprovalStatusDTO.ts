import type { DOCTOR_VERIFICATION_STATUS } from "@domain/common/enums/doctor.enum.ts";

export type IChangeDoctorApprovalStatusRequestDTO = {
  verification_status: DOCTOR_VERIFICATION_STATUS;
  rejection_reason: string | null;
};


export type IChangeDoctorApprovalStatusResponseDTO = {
  verification_status : DOCTOR_VERIFICATION_STATUS,
  rejection_reason : string | null,
  doctorId : string
}