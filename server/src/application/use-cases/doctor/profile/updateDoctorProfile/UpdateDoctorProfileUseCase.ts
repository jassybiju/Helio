import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type {
  IUpdateDoctorInput,
  IUpdateDoctorProfileUseCase,
} from "@application/ports/use-cases/doctor/profile/IUpdateDoctorProfileUseCase.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";

export class UpdateDoctorProfileUseCase implements IUpdateDoctorProfileUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _doctorRepo: IDoctorRepository
  ) {}
  async execute(input: IUpdateDoctorInput): Promise<void> {
    this._logger.info("Doctor Profile Update attempt", input);

    const doctor = await this._doctorRepo.findById(input.doctorId);

    if (!doctor) {
      throw new AppError(MESSAGE.DOCTOR_NOT_FOUND, HTTPStatus.NOT_FOUND);
    }

    doctor.updateProfile({
      fullName: input.fullName,
      specialization: input.specialization,
      bio: input.bio,
    });

    await this._doctorRepo.save(doctor);
  }
}
