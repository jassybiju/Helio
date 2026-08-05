import type { Appointment } from "#domain/entities/Appointment.js";
import type { IPatientInvoicePDFView } from "./IPatientInvoicePDFView.js";
import type { Patient } from "#domain/entities/Patient.js";
import type { Doctor } from "#domain/entities/Doctor.js";
export declare class PatientAppointmentPdfMapper {
    static toView(appointment: Appointment, patient: Patient, doctor: Doctor): IPatientInvoicePDFView;
}
//# sourceMappingURL=PatientInvoicePDFMapper.d.ts.map