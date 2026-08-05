import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IPasswordService } from "#application/ports/services/IPasswordService.js";
import type { IChangeDoctorPasswordUseCase } from "#application/ports/use-cases/doctor/profile/IChangeDoctorPasswordUseCase.js";
import type { DoctorValidator } from "#application/validators/DoctorValidator.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";

export class ChangeDoctorPasswordUseCase implements IChangeDoctorPasswordUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _passwordService: IPasswordService,
    private readonly _doctorValidator: DoctorValidator
  ) {}
  async execute(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    this._logger.info("Change Password Doctor attempt", {
      userId,
      oldPassword,
      newPassword,
    });

    const doctor = await this._doctorRepo.findById(userId);
    if (!doctor) {
      throw new AppError(MESSAGE.DOCTOR_NOT_FOUND, HTTPStatus.NOT_FOUND);
    }

    await this._doctorValidator.validateDoctorPassword(doctor, oldPassword);

    doctor.updatePassword(await this._passwordService.hash(newPassword));

    this._doctorRepo.update(doctor);
  }
}
