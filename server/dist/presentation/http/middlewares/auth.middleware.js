import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import jwt from "jsonwebtoken";
export const authMiddleware = (req, res, next) => {
    const accessToken = req.cookies?.accessToken;
    if (!accessToken) {
        throw new AppError("Unauthorized", HTTPStatus.UNAUTHORIZED);
    }
    try {
        const payload = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
        req.user = payload;
        next();
    }
    catch {
        throw new AppError("Invalid Token", HTTPStatus.UNAUTHORIZED);
    }
};
//# sourceMappingURL=auth.middleware.js.map