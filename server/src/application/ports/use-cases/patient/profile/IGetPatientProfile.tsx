import type { Patient } from "@domain/entities/Patient.ts";

export interface IGetPatientProfile {
  execute(patientId : string) : Promise<Patient>
}