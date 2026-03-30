import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { IPatientRepository } from "@application/ports/repositories/IPatientRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IPasswordService } from "@application/ports/services/IPasswordService.ts";
import type { IResetTokenService } from "@application/ports/services/IResetTokenService.ts";
import type { IResetPasswordUseCase } from "@application/ports/use-cases/auth/IResetPasswordUseCase.ts";
import { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";
import type { Doctor } from "@domain/entities/Doctor.ts";
import type { Patient } from "@domain/entities/Patient.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";

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
    console.log(userId, role, USER_ROLES.DOCTOR, typeof data);

    let user;
    if (role === USER_ROLES.PATIENT) {
      user = await this._patientRepo.findById(userId);
    }
    if (role === USER_ROLES.DOCTOR) {
      console.log("h");
      user = await this._doctorRepo.findById(userId);
      console.log(user);
    }
    console.log(user, role, userId, data);
    if (!user) throw new AppError("User not found", HTTPStatus.NOT_FOUND);

    user.updatePassword(await this._passwordService.hash(newPassword));

    if (role === USER_ROLES.PATIENT) {
      await this._patientRepo.save(user as Patient);
    }
    if (role === USER_ROLES.DOCTOR) {
      await this._doctorRepo.save(user as Doctor);
    }
  }
}
