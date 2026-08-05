import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { AppError } from "./AppError.js";
export class ConflictError extends AppError {
    constructor(message) {
        super(message, HTTPStatus.CONFLICT);
    }
}
//# sourceMappingURL=ConflictError.js.map