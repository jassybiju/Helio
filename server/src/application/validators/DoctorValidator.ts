import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IPasswordService } from "#application/ports/services/IPasswordService.js";
import type { Doctor } from "#domain/entities/Doctor.js";
import { Email } from "#domain/value-objects/Email.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";

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
