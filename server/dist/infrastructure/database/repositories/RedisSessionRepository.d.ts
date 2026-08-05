import type { ISessionRepository, SessionData } from "#application/ports/repositories/ISessionRepository.js";
import { RedisBaseRepository } from "./RedisBaseRepository.js";
import type { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
export declare class RedisSessionRepository extends RedisBaseRepository implements ISessionRepository {
    private readonly _logger;
    constructor(_logger: ILogger);
    private _getTokenKey;
    private _getUserSessionKey;
    /**
     * Saves the hashed refresh token in redis with key getTokenKey(hashedToken) also rotate refresh token by keeping an instance of user_session(userId) -> hashedToken
     * @param userId User Id of the user
     * @param role Role of the user
     * @param email Email of the user
     * @param hashedToken Hashed refresh token
     */
    storeRefreshToken(userId: string, role: USER_ROLES, email: string, hashedToken: string): Promise<void>;
    getRefreshToken(hashedToken: string): Promise<SessionData | null>;
    deleteRefreshToken(hashedToken: string): Promise<void>;
}
//# sourceMappingURL=RedisSessionRepository.d.ts.map