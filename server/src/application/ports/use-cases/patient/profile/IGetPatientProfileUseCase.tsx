import type { Patient } from "@domain/entities/Patient.ts";

export interface IGetPatientProfileUseCase {
  execute(patientId : string) : Promise<Patient>
}