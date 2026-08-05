import { RedisBaseRepository } from "#infrastructure/database/repositories/RedisBaseRepository.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import crypto from "crypto";
export class RedisResetTokenService extends RedisBaseRepository {
    _logger;
    constructor(_logger) {
        super();
        this._logger = _logger;
    }
    _key(token) {
        return `reset:${token}`;
    }
    async generate(userId, role, ttlSeconds) {
        try {
            const token = crypto.randomBytes(32).toString("hex");
            await super.set(this._key(token), JSON.stringify({ userId, role }), ttlSeconds);
            return token;
        }
        catch (error) {
            this._logger.error("Error saving reset token", error);
            throw new AppError("Error saving reset token", HTTPStatus.INTERNAL_ERROR);
        }
    }
    async verify(token) {
        try {
            const data = await super.get(this._key(token));
            return JSON.parse(data);
        }
        catch (error) {
            this._logger.error("Error verifying reset token", error);
            throw new AppError("Error verifying reset token", HTTPStatus.INTERNAL_ERROR);
        }
    }
    async invalidate(token) {
        try {
            await super.delete(this._key(token));
        }
        catch (error) {
            this._logger.error("Error invalidating reset token", error);
            throw new AppError("Error invalidating reset token", HTTPStatus.INTERNAL_ERROR);
        }
    }
}
//# sourceMappingURL=RedisResetTokenService.js.map