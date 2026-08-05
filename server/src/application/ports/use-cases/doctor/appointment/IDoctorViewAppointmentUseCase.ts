import type { IDoctorViewAppointmentDTO } from "#application/use-cases/doctor/appointment/doctorViewAppointment/IDoctorViewAppointmentDTO.js";

export interface IDoctorViewAppointmentUseCase {
  execute(
    doctorId: string,
    appointmentId: string
  ): Promise<IDoctorViewAppointmentDTO>;
}
