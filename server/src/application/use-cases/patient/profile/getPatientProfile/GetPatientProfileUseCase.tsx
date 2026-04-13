import type { IPatientRepository } from "@application/ports/repositories/IPatientRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IGetPatientProfileUseCase } from "@application/ports/use-cases/patient/profile/IGetPatientProfileUseCase.tsx";
import type { Patient } from "@domain/entities/Patient.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";

export class GetPatientProfileUseCase implements IGetPatientProfileUseCase {
  constructor(
    private readonly _logger : ILogger,
    private readonly _patientRepo : IPatientRepository,

  ){}
  async execute(patientId: string): Promise<Patient> {
    this._logger.info("Get Patient Profile Attempt", {patientId})

    const patient = await this._patientRepo.findById(patientId)

    if(!patient){
      throw new AppError(MESSAGE.PATIENT_NOT_FOUND,HTTPStatus.NOT_FOUND)
    }

    return patient
  }
}