import { io, Socket } from "socket.io-client";
import { getRuntimeConfig } from "./config";

const config = getRuntimeConfig();

export const socket: Socket = io(config.backendWsUrl, {
  withCredentials: true,
  reconnection: true,
});

socket.on("connect_error", (error) => {
  console.error("Socket connection error:", error.message);
});

socket.on("connect", () => {
  console.log("CONNECTED");
});

socket.on("disconnect", (reason) => {
  console.log("Disconnected", reason);
});