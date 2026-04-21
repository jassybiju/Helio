import type {
  IChangeDoctorApprovalStatusRequestDTO,
  IChangeDoctorApprovalStatusResponseDTO,
} from "@application/use-cases/admin/doctor/changeDoctorApprovalStatus/IChangeDoctorApprovalStatusDTO.ts";

export interface IChangeDoctorApprovalStatusUseCase {
  execute(
    input: IChangeDoctorApprovalStatusRequestDTO,
    userId: string
  ): Promise<IChangeDoctorApprovalStatusResponseDTO>;
}
