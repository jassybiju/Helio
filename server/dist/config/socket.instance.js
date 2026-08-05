let io = null;
export const getIO = () => {
    if (!io) {
        throw new Error("Socket IO has not been initalized");
    }
    return io;
};
export const setIO = (server) => {
    io = server;
};
//# sourceMappingURL=socket.instance.js.map