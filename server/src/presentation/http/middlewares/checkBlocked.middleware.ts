import { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";
import { MongoDoctorRepository } from "@infrastructure/database/repositories/MongoDoctorRepository.ts";
import { MongoPatientRepository } from "@infrastructure/database/repositories/MongoPatientRepository.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import { removeToken } from "@shared/utils/apiReponse.utils.ts";
import { logger } from "@shared/utils/logger.utils.ts";
import type { NextFunction, Request, Response } from "express";

export const checkBlockMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, role } = req?.user ?? {};
  console.log(role);
  let user;
  if (role == USER_ROLES.PATIENT) {
    user = await new MongoPatientRepository(logger).findById(id!);
  }
  if (role === USER_ROLES.DOCTOR) {
    user = await new MongoDoctorRepository(logger).findById(id!);
  }
  if (role === USER_ROLES.ADMIN) {
    console.log("HITTTTT");
    return next();
  }

  if (!user) {
    removeToken(res);
    throw new AppError("User Nor FOund", HTTPStatus.NOT_FOUND);
  }

  if (user.isBlocked) {
    removeToken(res);

    throw new AppError("User Blocked. Contact supper", HTTPStatus.FORBIDDEN);
  }

  next();
};
