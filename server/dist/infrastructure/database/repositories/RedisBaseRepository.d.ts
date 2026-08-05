/**
 * Base class for Redis Repositories
 * Handles generic Redis Operations
 */
export declare class RedisBaseRepository {
    /**
     * Set a value in redis with TTL in seconds
     * @param key Redis Key
     * @param value Value to store in reids
     * @param ttlSeconds Time to Leave in seconds
     */
    protected set<T>(key: string, value: T, ttlSeconds: number): Promise<void>;
    protected get<T>(key: string): Promise<T | string | null>;
    protected delete(key: string): Promise<void>;
}
//# sourceMappingURL=RedisBaseRepository.d.ts.map