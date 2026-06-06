import type { Appointment } from "@domain/entities/Appointment.ts";
import type { Patient } from "@domain/entities/Patient.ts";
import type { IDoctorViewAppointmentDTO } from "./IDoctorViewAppointmentDTO.ts";
import type { Consultation } from "@domain/entities/Consultation.ts";

export class DoctorViewAppointmentMapper {
  static toDto(
    appointment: Appointment,
    patient: Patient,
    consultation: Consultation | null
  ): IDoctorViewAppointmentDTO {
    return {
      id: appointment.id,
      patientId: appointment.patientId,
      patientName: patient.fullName,
      startTime: appointment.startTime.toISOString(),
      endTime: appointment.endTime.toISOString(),
      consultationType: appointment.consultationType,
      consultationFee: appointment.consultationFee,
      platformFee: appointment.platformFee,
      totalAmount: appointment.totalAmount,
      status: appointment.status,
      paymentStatus: appointment.paymentStatus,
      cancellationReason: appointment.cancellationReason,
      paymentId: appointment.paymentId,
      createdAt: appointment.createdAt.toISOString(),
      consultation: !consultation
        ? null
        : {
            id: consultation.id,
            vitals: {
              bloodPressure: consultation.vitals?.bloodPressure ?? null,
              oxygenLevel: consultation.vitals?.oxygenLevel ?? null,
              heartRate: consultation.vitals?.heartRate ?? null,
              temperature: consultation.vitals?.temperature ?? null,
              weight: consultation.vitals?.weight ?? null,
              height: consultation.vitals?.height ?? null,
            },
            notes: {
              primaryDiagnosis: consultation.primaryDiagnosis,
              clinicalObservation: consultation.clinicalObservation,
              generalAdvice: consultation.generalAdvice,
              quickNote: consultation.quickNote,
            },
            prescriptions: consultation.prescriptions.map((x) => ({
              name: x.name,
              foodTiming: x.foodTiming,
              timings: x.timings,
              durationInDays: x.durationInDays,
              instruction: x.instruction ?? null,
            })),
            startedAt: consultation.startedAt,
            endedAt: consultation.endedAt,
            medicationDuration: consultation.medicationPeriod,
          },
    };
  }
}
