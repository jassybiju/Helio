import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { AppError } from "./AppError.js";
export class PaymentError extends AppError {
    constructor(message) {
        super(message, HTTPStatus.BAD_REQUEST);
    }
}
//# sourceMappingURL=PaymentError.js.map