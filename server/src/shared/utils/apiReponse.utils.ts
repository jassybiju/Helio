import type { APIResponse } from "@shared/types/APIResponse.ts";
import type { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import type { Response } from "express";

export function successResponse<T>(data: T, message: string): APIResponse<T> {
  return {
    success: true,
    data,
    message,
  };
}

export function errorResponse(message: string): APIResponse<null> {
  return {
    success: false,
    message,
  };
}
export function apiResponse<T>(
  res: Response,
  status: HTTPStatus,
  json: APIResponse<T>
) {
  return res.status(status).json(json);
}
