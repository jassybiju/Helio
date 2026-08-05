import { RedisBaseRepository } from "./RedisBaseRepository.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export class RedisSessionRepository extends RedisBaseRepository {
    _logger;
    constructor(_logger) {
        super();
        this._logger = _logger;
    }
    _getTokenKey(token) {
        return `refresh:${token}`;
    }
    _getUserSessionKey(userId) {
        return `user_session:${userId}`;
    }
    /**
     * Saves the hashed refresh token in redis with key getTokenKey(hashedToken) also rotate refresh token by keeping an instance of user_session(userId) -> hashedToken
     * @param userId User Id of the user
     * @param role Role of the user
     * @param email Email of the user
     * @param hashedToken Hashed refresh token
     */
    async storeRefreshToken(userId, role, email, hashedToken) {
        try {
            // ttl Seconds
            const ttlSeconds = Number(process.env.JWT_REFRESH_VALID_SECS);
            const existingHash = await super.get(this._getUserSessionKey(userId));
            // deletes old session
            if (existingHash) {
                await super.delete(this._getTokenKey(existingHash));
            }
            // saves refresh token and relation between user -> hashedToken
            await Promise.all([
                super.set(this._getTokenKey(hashedToken), JSON.stringify({ userId, role, email }), ttlSeconds),
                super.set(this._getUserSessionKey(userId), hashedToken, ttlSeconds),
            ]);
        }
        catch (error) {
            this._logger.error("Error saving refresh token", error);
            throw new AppError("Error saving refresh token", HTTPStatus.INTERNAL_ERROR);
        }
    }
    async getRefreshToken(hashedToken) {
        try {
            const refreshToken = (await super.get(this._getTokenKey(hashedToken)));
            if (!refreshToken) {
                return null;
            }
            return JSON.parse(refreshToken);
        }
        catch (error) {
            this._logger.error("Error getting refresh token", error);
            throw new AppError("Error getting refresh token", HTTPStatus.BAD_REQUEST);
        }
    }
    async deleteRefreshToken(hashedToken) {
        try {
            const session = await this.getRefreshToken(hashedToken);
            if (session) {
                await Promise.all([
                    super.delete(this._getTokenKey(hashedToken)),
                    super.delete(this._getUserSessionKey(session.userId)),
                ]);
            }
        }
        catch (error) {
            this._logger.error("Error deleting refresh token", error);
            throw new AppError("Error deleting refresh token", HTTPStatus.BAD_REQUEST);
        }
    }
}
//# sourceMappingURL=RedisSessionRepository.js.map