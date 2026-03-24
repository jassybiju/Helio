import { redisClient } from "@config/redis.config.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";

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
  protected async set<T>(
    key: string,
    value: T,
    ttlSeconds: number
  ): Promise<void> {
    if (ttlSeconds <= 0) {
      throw new AppError(
        "Invalid Refresh token TTL",
        HTTPStatus.INTERNAL_ERROR
      );
    }
    await redisClient.setEx(key, ttlSeconds, JSON.stringify(value));
  }

  protected async get<T>(key: string): Promise<T | string | null> {
    const value = await redisClient.get(key);
    if (!value) {
      return null;
    }
    try {
      return JSON.parse(value) as T;
    } catch {
      return value;
    }
  }

  protected async delete(key: string): Promise<void> {
    await redisClient.del(key);
  }
}
