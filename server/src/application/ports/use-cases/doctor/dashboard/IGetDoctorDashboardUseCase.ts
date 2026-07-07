import type { IGetDoctorDashboardDTO } from "@application/use-cases/doctor/dashboard/getDoctorDashboard/IGetDoctorDashboardDTO.ts";

export interface IGetDoctorDashboardUseCase {
  execute(doctorId: string): Promise<IGetDoctorDashboardDTO>;
}
