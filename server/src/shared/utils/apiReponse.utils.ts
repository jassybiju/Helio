import type { APIResponse } from "@shared/types/APIResponse.ts";

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
