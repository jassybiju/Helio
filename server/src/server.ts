import { connectDB } from "#config/mongo.config.js";
import { app } from "./app.js";
import { connectRedis } from "#config/redis.config.js";
import http from "http";
import { SocketServer } from "#infrastructure/socket/SocketServer.js";

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

    server.listen(PORT, () => {
      console.log("Listening to PORT 5000");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
