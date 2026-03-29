import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import type { USER_ROLES } from "@shared/types/UserRoles.ts";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies?.accessToken;
  console.log(req.cookies);
  if (!accessToken) {
    throw new AppError("Unauthorized", HTTPStatus.UNAUTHORIZED);
  }

  try {
    const payload = jwt.verify(accessToken, process.env.JWT_SECRET_KEY!) as {
      id: string;
      role: USER_ROLES;
    };
    console.log(payload);
    req.user = payload;
    next();
  } catch {
    throw new AppError("Invalid Token", HTTPStatus.UNAUTHORIZED);
  }
};
