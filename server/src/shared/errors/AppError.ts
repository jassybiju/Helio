import type { HTTPStatus } from "../types/HTTPStatus.js";

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: HTTPStatus
  ) {
    super(message);

    this.name = this.constructor.name;
  }
}
