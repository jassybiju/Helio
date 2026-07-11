import type { IGetPatientProfileDTO } from "@application/use-cases/patient/profile/getPatientProfile/IGetPatientProfileDTO.ts";

export interface IGetPatientProfileUseCase {
  execute(patientId: string): Promise<IGetPatientProfileDTO>;
}
