import type { Appointment } from "#domain/entities/Appointment.js";
import type { Consultation } from "#domain/entities/Consultation.js";
import type { Doctor } from "#domain/entities/Doctor.js";
import type { Patient } from "#domain/entities/Patient.js";
import type { IPatientAppointmentPdfView } from "./IPatientAppointmentPdfView.js";
export declare class PatientAppointmentPdfMapper {
    static toView(appointment: Appointment, patient: Patient, doctor: Doctor, consultation?: Consultation | null): IPatientAppointmentPdfView;
    private static formatDate;
    private static formatTime;
    private static formatDateTime;
}
//# sourceMappingURL=PatientAppointmentPdfMapper.d.ts.map