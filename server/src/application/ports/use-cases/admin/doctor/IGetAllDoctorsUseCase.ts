import type {
  IGetAllDoctorsRequestDTO,
  IGetAllDoctorssResponseDTO,
} from "@application/use-cases/admin/doctor/getAllDoctors/IGetAllDoctorsDTO.ts";

export interface IGetAllDoctorsUseCase {
  execute(input: IGetAllDoctorsRequestDTO): Promise<IGetAllDoctorssResponseDTO>;
}
