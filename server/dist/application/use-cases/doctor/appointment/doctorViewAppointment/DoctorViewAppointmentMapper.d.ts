import type { Appointment } from "#domain/entities/Appointment.js";
import type { Patient } from "#domain/entities/Patient.js";
import type { IDoctorViewAppointmentDTO } from "./IDoctorViewAppointmentDTO.js";
import type { Consultation } from "#domain/entities/Consultation.js";
export declare class DoctorViewAppointmentMapper {
    static toDto(appointment: Appointment, patient: Patient, consultation: Consultation | null): IDoctorViewAppointmentDTO;
}
//# sourceMappingURL=DoctorViewAppointmentMapper.d.ts.map