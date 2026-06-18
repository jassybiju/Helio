import { connectDB } from "@config/mongo.config.ts";
import { app } from "./app.ts";
import { connectRedis } from "@config/redis.config.ts";
import http from "http";
import { SocketServer } from "@infrastructure/socket/SocketServer.ts";

const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    console.log("🚀 SERVER STARTED PID:", process.pid);
    await connectRedis();
    await connectDB();
    const server = http.createServer(app);
    const socketServer = new SocketServer(server);
    socketServer.initialize();

    // ,    registerSocketHandlers(io);
    // io.use(socketAuthMiddleware);
    console.log(3);

    server.listen(PORT, () => {
      console.log("Listening to PORT 5000");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
