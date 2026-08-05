import { MESSAGE } from "#shared/constants/messages.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export const authorizeMiddleware = (role) => {
    const allowedRoles = Array.isArray(role) ? role : [role];
    return (req, res, next) => {
        if (!req.user) {
            throw new AppError(MESSAGE.NOT_AUTHENTICATED, HTTPStatus.UNAUTHORIZED);
        }
        if (!allowedRoles.includes(req.user.role)) {
            throw new AppError(MESSAGE.NOT_AUTHORIZED, HTTPStatus.FORBIDDEN);
        }
        next();
    };
};
//# sourceMappingURL=authorize.middleware.js.map