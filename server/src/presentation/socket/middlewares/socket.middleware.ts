import type { Server } from "socket.io";
import jwt from "jsonwebtoken";
export const socketAuthMiddleware: Parameters<Server["use"]>[0] = (
  socket,
  next
) => {
  console.log("++++++++++ASB");
  try {
    const cookieHeader = socket.handshake.headers.cookie;

    if (!cookieHeader) {
      return next(new Error("No cookies found"));
    }

    const cookies = Object.fromEntries(
      cookieHeader.split("; ").map((cookie) => {
        const [key, value] = cookie.split("=");
        return [key, value];
      })
    );

    const payload = jwt.verify(
      cookies.accessToken,
      process.env.JWT_SECRET_KEY!
    ) as {
      id: string;
      role: string;
    };

    socket.data.user = {
      id: payload.id,
      role: payload.role,
    };
    next();
  } catch {
    next(new Error("Unauthroized"));
  }
};
