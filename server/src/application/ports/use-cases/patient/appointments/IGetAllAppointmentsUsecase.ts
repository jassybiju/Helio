import type { IGetAllAppointmentsDTO } from "@application/use-cases/patient/appointments/getAllAppointments/IGetAllAppointmentsDTO.ts";

export interface IGetAllAppointmentsUseCase {
  execute(
    patientId: string,
    query: { page: number; limit: number; status?: string }
  ): Promise<IGetAllAppointmentsDTO>;
}
