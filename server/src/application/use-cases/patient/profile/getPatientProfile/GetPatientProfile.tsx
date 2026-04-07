import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IGetPatientProfile } from "@application/ports/use-cases/patient/profile/IGetPatientProfile.tsx";
import type { Patient } from "@domain/entities/Patient.ts";

export class GetPatientProfile implements IGetPatientProfile {
  constructor(
    private readonly _logger : ILogger,

  ){}
  async execute(patientId: string): Promise<Patient> {
    
  }
}