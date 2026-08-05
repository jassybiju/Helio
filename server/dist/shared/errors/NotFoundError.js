import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { AppError } from "./AppError.js";
export class NotFoundError extends AppError {
    constructor(message) {
        super(message, HTTPStatus.NOT_FOUND);
    }
}
//# sourceMappingURL=NotFoundError.js.map