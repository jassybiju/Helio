import type { IGetPatientProfileDTO } from "#application/use-cases/patient/profile/getPatientProfile/IGetPatientProfileDTO.js";

export interface IGetPatientProfileUseCase {
  execute(patientId: string): Promise<IGetPatientProfileDTO>;
}
