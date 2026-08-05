import type { IGetAdminDashboardDTO } from "#application/use-cases/admin/dashboard/getDashboard/IGetAdminDashboardDTO.js";
import type { BOOKING_PERIOD } from "#domain/common/enums/appointment.enum.js";
export interface IGetAdminDashboardUseCase {
    execute(period: BOOKING_PERIOD): Promise<IGetAdminDashboardDTO>;
}
//# sourceMappingURL=IGetAdminDashboardUseCase.d.ts.map