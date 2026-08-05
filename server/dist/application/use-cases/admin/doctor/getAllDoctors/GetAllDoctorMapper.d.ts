import type { Doctor } from "#domain/entities/Doctor.js";
import type { IGetAllDoctorsResponseDTO } from "./IGetAllDoctorsDTO.js";
export declare class GetAllDoctorMapper {
    static toDto(doctors: Doctor[], getFileUrl: (key: string) => string): IGetAllDoctorsResponseDTO["doctors"];
}
//# sourceMappingURL=GetAllDoctorMapper.d.ts.map