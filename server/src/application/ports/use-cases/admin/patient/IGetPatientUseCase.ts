import type { IGetPatientResponseDTO } from "#application/use-cases/admin/patient/getPatient/IGetPatientDTO.js";

export interface IGetPatientUseCase {
  execute(PatientId: string): Promise<IGetPatientResponseDTO>;
}
