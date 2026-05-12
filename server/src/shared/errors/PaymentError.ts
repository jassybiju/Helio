import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import { AppError } from "./AppError.ts";

export class PaymentError extends AppError {
  constructor(message: string) {
    super(message, HTTPStatus.BAD_REQUEST);
  }
}
