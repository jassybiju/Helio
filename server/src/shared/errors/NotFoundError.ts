import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import { AppError } from "./AppError.ts";

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, HTTPStatus.NOT_FOUND);
  }
}
