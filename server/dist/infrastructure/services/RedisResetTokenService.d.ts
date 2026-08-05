import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IResetTokenService } from "#application/ports/services/IResetTokenService.js";
import type { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { RedisBaseRepository } from "#infrastructure/database/repositories/RedisBaseRepository.js";
export declare class RedisResetTokenService extends RedisBaseRepository implements IResetTokenService {
    private readonly _logger;
    constructor(_logger: ILogger);
    private _key;
    generate(userId: string, role: USER_ROLES, ttlSeconds: number): Promise<string>;
    verify(token: string): Promise<{
        userId: string;
        role: USER_ROLES;
    } | null>;
    invalidate(token: string): Promise<void>;
}
//# sourceMappingURL=RedisResetTokenService.d.ts.map