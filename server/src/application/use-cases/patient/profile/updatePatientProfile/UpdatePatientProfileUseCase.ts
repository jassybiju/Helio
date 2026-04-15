import type { IPatientRepository } from "@application/ports/repositories/IPatientRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type {
  IUpdatePatientInput,
  IUpdatePatientProfileUseCase,
} from "@application/ports/use-cases/patient/profile/IUpdatePatientProfileUseCase.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";

export class UpdatePatientProfileUseCase implements IUpdatePatientProfileUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _patientRepo: IPatientRepository
  ) {}
  async execute(input: IUpdatePatientInput): Promise<void> {
    this._logger.info("Patient Profile Update attempt", input);

    const patient = await this._patientRepo.findById(input.patientId);

    if (!patient) {
      throw new AppError(MESSAGE.PATIENT_NOT_FOUND, HTTPStatus.NOT_FOUND);
    }

    patient.updateProfile({
      firstName: input.firstName,
      lastName: input.lastName,
      bloodGroup: input.bloodGroup,
      gender: input.gender,
      phone: input.phone,
      dob: input.dob,
    });

    await this._patientRepo.save(patient)
  }
}
