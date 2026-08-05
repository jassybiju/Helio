import type { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import type { NextFunction, Request, Response } from "express";

export const authorizeMiddleware = (role: USER_ROLES | USER_ROLES[]) => {
  const allowedRoles = Array.isArray(role) ? role : [role];
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError(MESSAGE.NOT_AUTHENTICATED, HTTPStatus.UNAUTHORIZED);
    }
    if (!allowedRoles.includes(req.user.role)) {
      throw new AppError(MESSAGE.NOT_AUTHORIZED, HTTPStatus.FORBIDDEN);
    }

    next();
  };
};
