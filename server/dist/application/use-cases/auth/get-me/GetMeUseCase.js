import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
/**
 * Get the details of the user from userId and role from middlewares
 */
export class GetMeUseCase {
    _logger;
    _handlers;
    constructor(_logger, _handlers) {
        this._logger = _logger;
        this._handlers = _handlers;
    }
    async execute(input) {
        const { id, role } = input;
        this._logger.info("Get me attempt", { id });
        // fetch user based on role
        const handler = this._handlers.find((h) => h.supports(role));
        if (!handler) {
            throw new AppError("Invalid Role", HTTPStatus.BAD_REQUEST);
        }
        return await handler.execute(id);
    }
}
//# sourceMappingURL=GetMeUseCase.js.map