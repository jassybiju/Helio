import type { IGetAllDoctorsRequestDTO, IGetAllDoctorsResponseDTO } from "#application/use-cases/admin/doctor/getAllDoctors/IGetAllDoctorsDTO.js";
export interface IGetAllDoctorsUseCase {
    execute(input: IGetAllDoctorsRequestDTO): Promise<IGetAllDoctorsResponseDTO>;
}
//# sourceMappingURL=IGetAllDoctorsUseCase.d.ts.map