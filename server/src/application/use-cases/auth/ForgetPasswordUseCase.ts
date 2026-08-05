import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IMessageQueue } from "#application/ports/services/IMessageQueue.js";
import type { IResetTokenService } from "#application/ports/services/IResetTokenService.js";
import type { IForgetPasswordUseCase } from "#application/ports/use-cases/auth/IForgetPasswordUseCase.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { Email } from "#domain/value-objects/Email.js";

export class ForgetPasswordUseCase implements IForgetPasswordUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _patientRepo: IPatientRepository,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _resetTokenService: IResetTokenService,
    private readonly _messageQueue: IMessageQueue
  ) {}
  async execute({
    email,
    role,
  }: {
    email: string;
    role: USER_ROLES;
  }): Promise<void> {
    this._logger.info("Forget Password Attempt", { email, role });

    let user;
    if (role == USER_ROLES.PATIENT) {
      user = await this._patientRepo.findByEmail(new Email(email));
    }
    if (role == USER_ROLES.DOCTOR) {
      user = await this._doctorRepo.findByEmail(new Email(email));
    }

    if (!user) {
      this._logger.info("Password reset requested for non-existing user", {
        email,
        role,
      });
      return;
    }

    if (!user.isVerified) {
      this._logger.info("Password reset requested for unverified user", {
        email,
        role,
      });
      return;
    }

    const ttlSeconds = Number(process.env.RESET_TOKEN_EXPIRY_SECS);
    const token = await this._resetTokenService.generate(
      user.id,
      role,
      ttlSeconds
    );

    await this._messageQueue.addJob(`FORGET_PASSWORD:${user.email}`, {
      to: user.email,
      subject: "Password Reset",
      body: `Click here to reset password : http://${role === USER_ROLES.PATIENT ? "" : "doctor."}helixo.com:3000/reset-password?token=${token}`,
    });
  }
}
