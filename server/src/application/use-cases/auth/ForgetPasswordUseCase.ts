import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { IPatientRepository } from "@application/ports/repositories/IPatientRepository.ts";
import type { IEmailService } from "@application/ports/services/IEmailService.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IResetTokenService } from "@application/ports/services/IResetTokenService.ts";
import type { IForgetPasswordUseCase } from "@application/ports/use-cases/auth/IForgetPasswordUseCase.ts";
import { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";
import { Email } from "@domain/value-objects/Email.ts";

export class ForgetPasswordUseCase implements IForgetPasswordUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _patientRepo: IPatientRepository,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _resetTokenService: IResetTokenService,
    private readonly _emailService: IEmailService
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

    await this._emailService.sendEmail({
      to: user.email,
      subject: "Password Reset",
      body: `Click here to reset password : http://${role === USER_ROLES.PATIENT ? "" : "doctor."}helixo.com:3000/reset-password?token=${token}`,
    });
  }
}
