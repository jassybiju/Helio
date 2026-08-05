import { createClient } from "redis";
console.log(process.env.REDIS_URL, 'HII');
export const redisClient = createClient({
    url: "redis://redis_cache:6379",
});
redisClient.on("error", (error) => {
    console.log("Redis error", error);
});
export const connectRedis = async function () {
    await redisClient.connect();
    console.log("Redis connected");
};
//# sourceMappingURL=redis.config.js.map