import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { IPasswordService } from "@application/ports/services/IPasswordService.ts";
import type { Doctor } from "@domain/entities/Doctor.ts";
import { Email } from "@domain/value-objects/Email.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";

export class DoctorValidator {
  constructor(
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _passwordService: IPasswordService
  ) {}

  async ensureEmailAvailable(email: string) {
    const doctor = await this._doctorRepo.findByEmail(new Email(email));

    if (doctor && doctor.isVerified) {
      throw new AppError(MESSAGE.EMAIL_ALREADY_EXISTS, HTTPStatus.BAD_REQUEST);
    }

    return doctor;
  }

  async validateDoctorPassword(doctor: Doctor, password: string) {
    if (!doctor.passwordHash) {
      throw new AppError("Invalid Email or Password", HTTPStatus.BAD_REQUEST);
    }
    if (!(await this._passwordService.compare(password, doctor.passwordHash))) {
      throw new AppError("Invalid Email or Password", HTTPStatus.BAD_REQUEST);
    }
  }
}
