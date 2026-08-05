import { Queue } from "bullmq";

export const notificationQueue = new Queue("email-queue", {
  connection: { host: "redis", port: 6379 },
});
