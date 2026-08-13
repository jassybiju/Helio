import type { APIResponse } from "#shared/types/APIResponse.js";
import type { HTTPStatus } from "#shared/types/HTTPStatus.js";
import type { Response } from "express";

export function successResponse<T>(data: T, message: string): APIResponse<T> {
  return {
    success: true,
    data,
    message,
  };
}

export function errorResponse(
  message: string,
  error?: unknown
): APIResponse<null> {
  return {
    success: false,
    message,
    error: error ? error : null,
  };
}
export function apiResponse<T>(
  res: Response,
  status: HTTPStatus,
  json: APIResponse<T>
) {
  return res.status(status).json(json);
}

export function sendToken(
  res: Response,
  accessToken: string,
  refreshToken: string
) {
  const ACCESS_TOKEN_EXPIRY_MS =
    Number(process.env.JWT_ACCESS_VALID_SECS) * 1000;
  const REFRESH_TOKEN_EXPIRY_MS =
    Number(process.env.JWT_REFRESH_VALID_SECS) * 1000;
  res.cookie("refreshToken", refreshToken, {
    maxAge: REFRESH_TOKEN_EXPIRY_MS,
    httpOnly: true,
    domain: process.env.COOKIE_DOMAIN || undefined,
    secure: process.env.NODE_ENV === "production",
  });
  res.cookie("accessToken", accessToken, {
    maxAge: ACCESS_TOKEN_EXPIRY_MS,
    httpOnly: true,
    sameSite: "lax",
    domain: process.env.COOKIE_DOMAIN || undefined,

    secure: process.env.NODE_ENV === "production",
  });
}

export function removeToken(res: Response) {
  res.cookie("refreshToken", null, {
    maxAge: 0,
    httpOnly: true,
    domain: process.env.COOKIE_DOMAIN || undefined,
    secure: process.env.NODE_ENV === "production",
  });
  res.cookie("accessToken", null, {
    maxAge: 0,
    httpOnly: true,
    sameSite: "lax",
    domain: process.env.COOKIE_DOMAIN || undefined,

    secure: process.env.NODE_ENV === "production",
  });
}
