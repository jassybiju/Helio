import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IPasswordService } from "#application/ports/services/IPasswordService.js";
import type { IResetTokenService } from "#application/ports/services/IResetTokenService.js";
import type { IResetPasswordUseCase } from "#application/ports/use-cases/auth/IResetPasswordUseCase.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import type { Doctor } from "#domain/entities/Doctor.js";
import type { Patient } from "#domain/entities/Patient.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";

export class ResetPasswordUseCase implements IResetPasswordUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _resetTokenService: IResetTokenService,
    private readonly _patientRepo: IPatientRepository,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _passwordService: IPasswordService
  ) {}
  async execute({
    token,
    newPassword,
  }: {
    token: string;
    newPassword: string;
  }): Promise<void> {
    this._logger.info("Reset Password attemp", { token, newPassword });

    const data = await this._resetTokenService.verify(token);
    if (!data) {
      throw new AppError("Invalid or Expired Token", HTTPStatus.BAD_REQUEST);
    }

    const { userId, role } = data;

    let user;
    if (role === USER_ROLES.PATIENT) {
      user = await this._patientRepo.findById(userId);
    }
    if (role === USER_ROLES.DOCTOR) {
      user = await this._doctorRepo.findById(userId);
    }
    if (!user) throw new AppError("User not found", HTTPStatus.NOT_FOUND);

    user.updatePassword(await this._passwordService.hash(newPassword));

    if (role === USER_ROLES.PATIENT) {
      await this._patientRepo.update(user as Patient);
    }
    if (role === USER_ROLES.DOCTOR) {
      await this._doctorRepo.update(user as Doctor);
    }

    await this._resetTokenService.invalidate(token);
  }
}
