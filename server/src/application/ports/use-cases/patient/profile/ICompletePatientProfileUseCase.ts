import type {
  ICompletePatientProfileRequestDTO,
  ICompletePatientProfileResponseDTO,
} from "@application/use-cases/patient/profile/completeProfile/ICompletePatientProfileDTO.ts";

export interface ICompletePatientProfileUseCase {
  execute(
    userId: string,
    input: ICompletePatientProfileRequestDTO
  ): Promise<ICompletePatientProfileResponseDTO>;
}
