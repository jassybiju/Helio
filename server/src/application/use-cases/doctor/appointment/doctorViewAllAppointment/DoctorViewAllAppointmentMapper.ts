import type { IDoctorViewAllAppointmentDTO } from "./IDoctorViewAllAppointmentDTO.ts";
import type { DoctorAppointmentListItem } from "@application/ports/repositories/IAppointmentRepository.ts";

export class DoctorViewAllAppointmentMapper {
  static toDto(
    appointment: DoctorAppointmentListItem[]
  ): IDoctorViewAllAppointmentDTO[] {
    return appointment.map((appoint) => {
      const app = appoint.appointment;
      return {
        id: app.id,
        patientName: appoint.patientName,
        time: app.startTime,
        type: app.consultationType,
        paymentStatus: app.paymentStatus,
        status: app.status,
        queueNumber: app.queueNumber,
      };
    });
  }
}
