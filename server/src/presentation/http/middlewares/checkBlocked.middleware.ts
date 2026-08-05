import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { removeToken } from "#shared/utils/apiReponse.utils.js";
import { logger } from "#shared/utils/logger.utils.js";
import type { NextFunction, Request, Response } from "express";

export class CheckBlockMiddleware {
  constructor(
    private readonly _patientRepo: IPatientRepository,
    private readonly _doctorRepo: IDoctorRepository
  ) {}
  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, role } = req?.user ?? {};
      let user;
      if (role === USER_ROLES.ADMIN) {
        return next();
      }
      if (role === USER_ROLES.PATIENT) {
        user = await this._patientRepo.findById(id!);
      }
      if (role === USER_ROLES.DOCTOR) {
        user = await this._doctorRepo.findById(id!);
      }

      if (!user) {
        removeToken(res);
        throw new AppError("User Nor FOund", HTTPStatus.NOT_FOUND);
      }

      if (user.isBlocked) {
        removeToken(res);

        throw new AppError(MESSAGE.USER_BLOCKED, HTTPStatus.FORBIDDEN);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
