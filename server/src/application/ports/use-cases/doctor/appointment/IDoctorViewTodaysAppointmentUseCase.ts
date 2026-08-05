import type { IDoctorViewTodaysAppointmentDTO } from "#application/use-cases/doctor/appointment/doctorViewTodaysAppointment/IDoctorViewTodaysAppointmentDTO.js";

export interface IDoctorViewTodaysAppointmentUseCase {
  execute(doctorId: string): Promise<IDoctorViewTodaysAppointmentDTO>;
}
