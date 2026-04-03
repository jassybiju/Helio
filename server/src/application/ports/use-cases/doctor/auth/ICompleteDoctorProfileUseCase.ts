import type {
  ICompleteDoctorProfileRequestDTO,
  ICompleteDoctorProfileResponseDTO,
} from "@application/dto/doctor/auth/ICompleteDoctorProfileDTO.ts";

export interface ICompleteDoctorProfileUseCase {
  execute(
    userId: string,
    input: ICompleteDoctorProfileRequestDTO
  ): Promise<ICompleteDoctorProfileResponseDTO>;
}
