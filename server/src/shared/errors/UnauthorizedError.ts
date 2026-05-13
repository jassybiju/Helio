import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import { AppError } from "./AppError.ts";

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, HTTPStatus.UNAUTHORIZED);
  }
}
