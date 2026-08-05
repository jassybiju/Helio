import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { AppError } from "./AppError.js";
export class UnauthorizedError extends AppError {
    constructor(message) {
        super(message, HTTPStatus.UNAUTHORIZED);
    }
}
//# sourceMappingURL=UnauthorizedError.js.map