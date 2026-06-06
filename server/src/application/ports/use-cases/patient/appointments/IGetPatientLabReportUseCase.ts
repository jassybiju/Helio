import type { IGetPatientLabReportsDTO } from "@application/use-cases/patient/appointments/lab/getLabReport/IGetPatientLabReportDTO.ts";

export interface IGetPatientLabReportUseCase {
  execute(
    patientId: string,
    query: { page: number; limit: number }
  ): Promise<IGetPatientLabReportsDTO>;
}
