import type { IPatientRepository } from "@application/ports/repositories/IPatientRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IGetPatientProfile } from "@application/ports/use-cases/patient/profile/IGetPatientProfile.tsx";
import type { Patient } from "@domain/entities/Patient.ts";

export class GetPatientProfile implements IGetPatientProfile {
  constructor(
    private readonly _logger : ILogger,
    private readonly _patientRepo : IPatientRepository,

  ){}
  async execute(patientId: string): Promise<Patient> {
    this._logger.info("Get Patient Profile Attempt", {patientId})

    const patient = await this._patientRepo.findById(patientId)
  }
}