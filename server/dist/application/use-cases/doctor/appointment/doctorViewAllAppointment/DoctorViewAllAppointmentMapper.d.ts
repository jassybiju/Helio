import type { IDoctorViewAllAppointmentDTO } from "./IDoctorViewAllAppointmentDTO.js";
import type { DoctorAppointmentListItem } from "#application/ports/repositories/IAppointmentRepository.js";
export declare class DoctorViewAllAppointmentMapper {
    static toDto(appointment: DoctorAppointmentListItem[]): IDoctorViewAllAppointmentDTO[];
}
//# sourceMappingURL=DoctorViewAllAppointmentMapper.d.ts.map