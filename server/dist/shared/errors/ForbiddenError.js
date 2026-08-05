import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { AppError } from "./AppError.js";
export class ForbiddenError extends AppError {
    constructor(message) {
        super(message, HTTPStatus.FORBIDDEN);
    }
}
//# sourceMappingURL=ForbiddenError.js.map