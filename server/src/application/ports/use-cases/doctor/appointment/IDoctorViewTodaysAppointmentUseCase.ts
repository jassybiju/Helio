import type { IDoctorViewTodaysAppointmentDTO } from "@application/use-cases/doctor/appointment/doctorViewTodaysAppointment/IDoctorViewTodaysAppointmentDTO.ts";

export interface IDoctorViewTodaysAppointmentUseCase {
  execute(doctorId: string): Promise<IDoctorViewTodaysAppointmentDTO>;
}
