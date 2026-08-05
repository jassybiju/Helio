import type { IGetDoctorDashboardDTO } from "#application/use-cases/doctor/dashboard/getDoctorDashboard/IGetDoctorDashboardDTO.js";
import type { BOOKING_PERIOD } from "#domain/common/enums/appointment.enum.js";

export interface IGetDoctorDashboardUseCase {
  execute(
    doctorId: string,
    period: BOOKING_PERIOD
  ): Promise<IGetDoctorDashboardDTO>;
}
