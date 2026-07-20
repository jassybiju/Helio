import { Queue } from "bullmq";

export const notificationQueue = new Queue("email-queue", {
  connection: { host: "redis_cache", port: 6379 },
});
