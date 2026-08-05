import type { Patient } from "#domain/entities/Patient.js";
import type { IGetPatientResponseDTO } from "./IGetPatientDTO.js";
import type { DoctorAppointmentListItem } from "#application/ports/repositories/IAppointmentRepository.js";
export declare class GetPatientMapper {
    static toDto(patient: Patient, appointments: DoctorAppointmentListItem[], totalCount: number): IGetPatientResponseDTO;
}
//# sourceMappingURL=GetPatientMapper.d.ts.map