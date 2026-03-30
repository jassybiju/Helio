import type {
  IGetAllPatientsRequestDTO,
  IGetAllPatientsResponseDTO,
} from "@application/use-cases/admin/patient/getAllPatients/IGetAllPatientsDTO.ts";

export interface IGetAllPatientsUseCase {
  execute(
    input: IGetAllPatientsRequestDTO
  ): Promise<IGetAllPatientsResponseDTO>;
}
