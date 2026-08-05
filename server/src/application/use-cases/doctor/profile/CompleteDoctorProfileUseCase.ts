import type {
  ICompleteDoctorProfileRequestDTO,
  ICompleteDoctorProfileResponseDTO,
} from "#application/dto/doctor/auth/ICompleteDoctorProfileDTO.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IFileUpload } from "#application/ports/services/IFileUpload.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { ICompleteDoctorProfileUseCase } from "#application/ports/use-cases/doctor/auth/ICompleteDoctorProfileUseCase.js";
import type { GENDER } from "#domain/common/enums/gender.enum.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";

export class CompleteDoctorProfileUseCase implements ICompleteDoctorProfileUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _fileUpload: IFileUpload
  ) {}
  async execute(
    userId: string,
    input: ICompleteDoctorProfileRequestDTO
  ): Promise<ICompleteDoctorProfileResponseDTO> {
    this._logger.info("Complete Doctor Profile Attempt");

    const { gender, specialization, career_start_year, document } = input;

    const doctor = await this._doctorRepo.findById(userId);

    if (!doctor) {
      throw new AppError("Doctor not found", HTTPStatus.NOT_FOUND);
    }

    if (doctor.isProfileComplete()) {
      throw new AppError("Profile is already complete", HTTPStatus.BAD_REQUEST);
    }

    const documentKey = await this._fileUpload.upload(document, true);

    doctor.completeProfile({
      gender: gender as GENDER,
      specialization,
      careerStartYear: career_start_year,
      documentKey,
    });

    await this._doctorRepo.update(doctor);

    this._logger.info("Doctor profile completed", { userId });

    return {
      isProfileComplete: doctor.isProfileComplete(),
    };
  }
}
