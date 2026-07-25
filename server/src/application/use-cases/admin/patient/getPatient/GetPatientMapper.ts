import type { Patient } from "@domain/entities/Patient.ts";
import type { IGetPatientResponseDTO } from "./IGetPatientDTO.ts";
import type { Appointment } from "@domain/entities/Appointment.ts";
import type { DoctorAppointmentListItem } from "@application/ports/repositories/IAppointmentRepository.ts";

export class GetPatientMapper {
  static toDto(
    patient: Patient,
    appointments: DoctorAppointmentListItem[],
    totalCount : number
  ): IGetPatientResponseDTO {
    return {
      patient: {
        id: patient.id,
        fullName: patient.fullName,
        email: patient.email,
        gender: patient.gender,
        dob: patient.dob?.toLocaleDateString() ?? null,
        bloodGroup: String(patient.bloodGroup),
        phone: patient.phone,
        isVerified: patient.isVerified,
        isBlocked: patient.isBlocked,
        createdAt: patient.createdAt.toLocaleString(),
        updatedAt: patient.updatedAt.toLocaleString(),
      },
      appointments: appointments.map((app) => ({
        id: app.appointment.id,
        doctorName: app.doctorName,
        dateTime: app.appointment.startTime.toISOString(),
        consultationType: app.appointment.consultationType,
        status: app.appointment.status,
        paymentStatus: app.appointment.paymentStatus,
        createdAt: app.appointment.createdAt.toISOString(),
      })),
      totalAppointments : totalCount
    };
  }
}
