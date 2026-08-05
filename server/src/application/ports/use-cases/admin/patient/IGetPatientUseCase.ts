import type { IGetPatientResponseDTO } from "#application/use-cases/admin/patient/getPatient/IGetPatientDTO.js";
import type { Patient } from "#domain/entities/Patient.js";

export interface IGetPatientUseCase {
  execute(PatientId: string): Promise<IGetPatientResponseDTO>;
}
