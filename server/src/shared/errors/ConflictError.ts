import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { AppError } from "./AppError.js";

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, HTTPStatus.CONFLICT);
  }
}
