import type { IGetAppointmentDTO } from "@application/use-cases/patient/appointments/getAppointment/IGetAppointmentDTO.ts";

export interface IGetAppointmentUseCase {
  execute(
    patientId: string,
    appointmentid: string
  ): Promise<IGetAppointmentDTO>;
}
