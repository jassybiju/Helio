import type { Appointment } from "#domain/entities/Appointment.js";
import type { IPatientInvoicePDFView } from "./IPatientInvoicePDFView.js";
import type { Patient } from "#domain/entities/Patient.js";
import type { Doctor } from "#domain/entities/Doctor.js";

export class PatientAppointmentPdfMapper {
  static toView(
    appointment: Appointment,
    patient: Patient,
    doctor: Doctor
  ): IPatientInvoicePDFView {
    return {
      appointmentId: appointment.id,
      appointmentDate: appointment.startTime.toDateString(),
      doctorName: doctor.fullName,
      specialization: doctor.specialization ?? "",
      patientName: patient.fullName,
      amount: String(appointment.totalAmount),
      status: appointment.paymentStatus,
      consultationType: appointment.consultationType,
      generatedAt: new Date().toDateString(),
    };
  }
}
