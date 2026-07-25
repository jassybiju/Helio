import type { IGetPatientResponseDTO } from "@application/use-cases/admin/patient/getPatient/IGetPatientDTO.ts";
import type { Patient } from "@domain/entities/Patient.ts";

export interface IGetPatientUseCase {
  execute(PatientId: string): Promise<IGetPatientResponseDTO>;
}
