import type { IPatientRepository } from "@application/ports/repositories/IPatientRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { ICompletePatientProfileUseCase } from "@application/ports/use-cases/patient/profile/ICompletePatientProfileUseCase.ts";
import type {
  ICompletePatientProfileRequestDTO,
  ICompletePatientProfileResponseDTO,
} from "./ICompletePatientProfileDTO.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import type { GENDER } from "@domain/common/enums/gender.enum.ts";

export class CompletePatientProfileUseCase implements ICompletePatientProfileUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _patientRepo: IPatientRepository
  ) {}

  async execute(
    userId: string,
    input: ICompletePatientProfileRequestDTO
  ): Promise<ICompletePatientProfileResponseDTO> {
    this._logger.info("Complete Patient Profile Attempt");

    const { gender, dob, phone } = input;

    const patient = await this._patientRepo.findById(userId);

    if (!patient) {
      throw new AppError("Patient not found", HTTPStatus.NOT_FOUND);
    }

    if (patient.isProfileComplete()) {
      throw new AppError("Profile is already complete", HTTPStatus.BAD_REQUEST);
    }

    patient.completeProfile({
      gender: gender as GENDER,
      dob: new Date(dob),
      phone,
    });

    await this._patientRepo.update(patient);

    return {
      isProfileComplete: patient.isProfileComplete(),
    };
  }
}
