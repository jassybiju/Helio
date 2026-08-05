import type {
  IChangeDoctorApprovalStatusRequestDTO,
  IChangeDoctorApprovalStatusResponseDTO,
} from "#application/use-cases/admin/doctor/changeDoctorApprovalStatus/IChangeDoctorApprovalStatusDTO.js";

export interface IChangeDoctorApprovalStatusUseCase {
  execute(
    input: IChangeDoctorApprovalStatusRequestDTO,
    userId: string
  ): Promise<IChangeDoctorApprovalStatusResponseDTO>;
}
