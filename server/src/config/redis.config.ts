import { createClient } from "redis";

console.log(process.env.REDIS_URL,'HII')
export const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://redis:6379",
});

redisClient.on("error", (error) => {
  console.log("Redis error", error);
});

export const connectRedis = async function () {
  await redisClient.connect();
  console.log("Redis connected");
};
