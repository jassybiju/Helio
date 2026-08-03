import type { IDoctorViewHistoryDTO } from "@application/use-cases/doctor/consultation/viewHistory/IDoctorViewHistoryDTO.ts";

export interface IViewHistoryUseCase {
  execute(
    doctorId: string,
    appointmentId: string,
    page?: number,
    limit?: number
  ): Promise<IDoctorViewHistoryDTO>;
}
