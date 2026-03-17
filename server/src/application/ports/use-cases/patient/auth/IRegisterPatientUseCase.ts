import type {
  IRegisterPatientRequestDTO,
  IRegisterPatientResponseDTO,
} from "@application/dto/patient/auth/IRegisterPatientDTO.ts";

export interface IRegisterPatientUseCase {
  execute(
    input: IRegisterPatientRequestDTO
  ): Promise<IRegisterPatientResponseDTO>;
}
