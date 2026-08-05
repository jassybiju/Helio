import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { AppError } from "./AppError.js";
export class ValidationError extends AppError {
    constructor(message) {
        super(message, HTTPStatus.BAD_REQUEST);
    }
}
//# sourceMappingURL=ValidationError.js.map