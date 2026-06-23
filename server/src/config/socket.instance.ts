import type { Server } from "socket.io";

let io: Server | null = null;

export const getIO = (): Server => {
  if (!io) {
    throw new Error("Socket IO has not been initalized");
  }
  return io;
};

export const setIO = (server: Server) => {
  io = server;
};
