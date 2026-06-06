import type { IDoctorViewAppointmentDTO } from "@application/use-cases/doctor/appointment/doctorViewAppointment/IDoctorViewAppointmentDTO.ts";

export interface IDoctorViewAppointmentUseCase {
  execute(
    doctorId: string,
    appointmentId: string
  ): Promise<IDoctorViewAppointmentDTO>;
}
