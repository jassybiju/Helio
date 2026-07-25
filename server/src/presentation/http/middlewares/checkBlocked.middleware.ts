import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { IPatientRepository } from "@application/ports/repositories/IPatientRepository.ts";
import { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import { removeToken } from "@shared/utils/apiReponse.utils.ts";
import { logger } from "@shared/utils/logger.utils.ts";
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
