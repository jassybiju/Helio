import type { IGetPatientDashboardDTO } from "#application/use-cases/patient/dashboard/getDashboard/IGetPatientDashboardDTO.js";

export interface IGetPatientDashboardUseCase {
  execute(patientId: string): Promise<IGetPatientDashboardDTO>;
}
