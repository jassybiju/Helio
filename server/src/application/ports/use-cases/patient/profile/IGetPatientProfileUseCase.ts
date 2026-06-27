import type { IGetPatientProfileDTO } from "@application/use-cases/patient/profile/getPatientProfile/IGetPatientProfileDTO.ts";
import type { Patient } from "@domain/entities/Patient.ts";

export interface IGetPatientProfileUseCase {
  execute(patientId: string): Promise<IGetPatientProfileDTO>;
}
