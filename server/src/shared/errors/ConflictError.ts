import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import { AppError } from "./AppError.ts";

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, HTTPStatus.CONFLICT);
  }
}
