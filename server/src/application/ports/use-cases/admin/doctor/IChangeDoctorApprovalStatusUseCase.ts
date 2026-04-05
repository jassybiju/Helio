import type { IChangeDoctorApprovalStatusRequestDTO, IChangeDoctorApprovalStatusResponseDTO } from "@application/use-cases/admin/doctor/changeDoctorApprovalStatus/IChangeDoctorApprovalStatusDTO.ts";
import type { DOCTOR_VERIFICATION_STATUS } from "@domain/common/enums/doctor.enum.ts";

export interface IChangeDoctorApprovalStatusUseCase {
  execute(input : IChangeDoctorApprovalStatusRequestDTO, userId : string) : Promise<IChangeDoctorApprovalStatusResponseDTO>;
}
