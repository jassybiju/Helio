import type { Patient } from "@domain/entities/Patient.ts";

export interface IGetPatientUseCase {
  execute(PatientId: string): Promise<Patient>;
}
