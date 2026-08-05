import jwt from "jsonwebtoken";
export const socketAuthMiddleware = (socket, next) => {
    try {
        const cookieHeader = socket.handshake.headers.cookie;
        if (!cookieHeader) {
            return next(new Error("No cookies found"));
        }
        const cookies = Object.fromEntries(cookieHeader.split("; ").map((cookie) => {
            const [key, value] = cookie.split("=");
            return [key, value];
        }));
        const payload = jwt.verify(cookies.accessToken, process.env.JWT_SECRET_KEY);
        socket.data.user = {
            id: payload.id,
            role: payload.role,
        };
        next();
    }
    catch {
        next(new Error("Unauthroized"));
    }
};
//# sourceMappingURL=socket.middleware.js.map