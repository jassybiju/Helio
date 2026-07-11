import type { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import type { NextFunction, Request, Response } from "express";

export const authorizeMiddleware = (role: USER_ROLES | USER_ROLES[]) => {
  const allowedRoles = Array.isArray(role) ? role : [role];
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError(MESSAGE.NOT_AUTHENTICATED, HTTPStatus.UNAUTHORIZED);
    }
    console.log(allowedRoles, req.user.role);
    if (!allowedRoles.includes(req.user.role)) {
      throw new AppError(MESSAGE.NOT_AUTHORIZED, HTTPStatus.FORBIDDEN);
    }

    next();
  };
};
