import { redisClient } from "#config/redis.config.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
/**
 * Base class for Redis Repositories
 * Handles generic Redis Operations
 */
export class RedisBaseRepository {
    /**
     * Set a value in redis with TTL in seconds
     * @param key Redis Key
     * @param value Value to store in reids
     * @param ttlSeconds Time to Leave in seconds
     */
    async set(key, value, ttlSeconds) {
        if (ttlSeconds <= 0) {
            throw new AppError("Invalid Refresh token TTL", HTTPStatus.INTERNAL_ERROR);
        }
        await redisClient.setEx(key, ttlSeconds, JSON.stringify(value));
    }
    async get(key) {
        const value = await redisClient.get(key);
        if (!value) {
            return null;
        }
        try {
            return JSON.parse(value);
        }
        catch {
            return value;
        }
    }
    async delete(key) {
        await redisClient.del(key);
    }
}
//# sourceMappingURL=RedisBaseRepository.js.map