import type { HTTPStatus } from "../types/HTTPStatus.ts";

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: HTTPStatus
  ) {
    super(message);
  }
}
