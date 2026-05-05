import { connectDB } from "@config/mongo.config.ts";
import { app } from "./app.ts";
import { connectRedis } from "@config/redis.config.ts";
import { startSlotGenerationJob } from "@infrastructure/jobs/slotGeneration.job.ts";
import { logger } from "@shared/utils/logger.utils.ts";

const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await connectRedis();
    await connectDB();
    app.listen(PORT, () => {
      console.log("Listening to PORT 5000");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
