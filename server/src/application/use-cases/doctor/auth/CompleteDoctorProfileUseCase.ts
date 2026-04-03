import type {
  ICompleteDoctorProfileRequestDTO,
  ICompleteDoctorProfileResponseDTO,
} from "@application/dto/doctor/auth/ICompleteDoctorProfileDTO.ts";
import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { IFileUpload } from "@application/ports/services/IFileUpload.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { ICompleteDoctorProfileUseCase } from "@application/ports/use-cases/doctor/auth/ICompleteDoctorProfileUseCase.ts";
import type { GENDER } from "@domain/common/enums/gender.enum.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";

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

    const documentKey = await this._fileUpload.upload(document);

    doctor.completeProfile({
      gender: gender as GENDER,
      specialization,
      careerStartYear: career_start_year,
      documentKey,
    });

    await this._doctorRepo.save(doctor);

    this._logger.info("Doctor profile completed", { userId });

    return {
      isProfileComplete: doctor.isProfileComplete(),
    };
  }
}
