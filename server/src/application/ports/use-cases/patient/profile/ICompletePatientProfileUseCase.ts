import type {
  ICompletePatientProfileRequestDTO,
  ICompletePatientProfileResponseDTO,
} from "#application/use-cases/patient/profile/completeProfile/ICompletePatientProfileDTO.js";

export interface ICompletePatientProfileUseCase {
  execute(
    userId: string,
    input: ICompletePatientProfileRequestDTO
  ): Promise<ICompletePatientProfileResponseDTO>;
}
