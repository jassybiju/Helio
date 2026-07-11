import type { IGetAdminDashboardDTO } from "@application/use-cases/admin/dashboard/getDashboard/IGetAdminDashboardDTO.ts";
import type { BOOKING_PERIOD } from "@domain/common/enums/appointment.enum.ts";

export interface IGetAdminDashboardUseCase {
  execute(period: BOOKING_PERIOD): Promise<IGetAdminDashboardDTO>;
}
