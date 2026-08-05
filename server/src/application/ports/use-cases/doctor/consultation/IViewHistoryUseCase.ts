import type { IDoctorViewHistoryDTO } from "#application/use-cases/doctor/consultation/viewHistory/IDoctorViewHistoryDTO.js";

export interface IViewHistoryUseCase {
  execute(
    doctorId: string,
    appointmentId: string,
    page?: number,
    limit?: number
  ): Promise<IDoctorViewHistoryDTO>;
}
