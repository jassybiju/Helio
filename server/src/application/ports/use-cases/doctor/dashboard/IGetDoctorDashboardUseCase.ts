import type { IGetDoctorDashboardDTO } from "@application/use-cases/doctor/dashboard/getDoctorDashboard/IGetDoctorDashboardDTO.ts";
import type { BOOKING_PERIOD } from "@domain/common/enums/appointment.enum.ts";

export interface IGetDoctorDashboardUseCase {
  execute(
    doctorId: string,
    period: BOOKING_PERIOD
  ): Promise<IGetDoctorDashboardDTO>;
}
