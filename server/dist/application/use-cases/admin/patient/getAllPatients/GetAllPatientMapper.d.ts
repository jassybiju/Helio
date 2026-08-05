import type { Patient } from "#domain/entities/Patient.js";
import type { IGetAllPatientsResponseDTO } from "./IGetAllPatientsDTO.js";
export declare class GetAllPatientsMapper {
    static toDto(patients: Patient[], page: number, limit: number, totalCount: number, getFileURL: (url: string) => string): IGetAllPatientsResponseDTO;
}
//# sourceMappingURL=GetAllPatientMapper.d.ts.map