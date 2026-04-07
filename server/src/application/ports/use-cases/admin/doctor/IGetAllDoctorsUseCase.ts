import type {
  IGetAllDoctorsRequestDTO,
  IGetAllDoctorsResponseDTO,
} from "@application/use-cases/admin/doctor/getAllDoctors/IGetAllDoctorsDTO.ts";

export interface IGetAllDoctorsUseCase {
  execute(input: IGetAllDoctorsRequestDTO): Promise<IGetAllDoctorsResponseDTO>;
}
