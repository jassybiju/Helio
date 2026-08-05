import type { Patient } from "#domain/entities/Patient.js";
import type { IGetPatientProfileDTO } from "./IGetPatientProfileDTO.js";
export declare class GetPatientProfileMapper {
    static toDto(patient: Patient, profilePic: string | null): IGetPatientProfileDTO;
}
//# sourceMappingURL=GetPatientProfileMapper.d.ts.map