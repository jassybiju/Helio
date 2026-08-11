import Config from "@/config";
import { io } from "socket.io-client";

export const socket = io(Config.BACKEND_WSURL, {
  // transports: ["websocket"]/,
  withCredentials: true,
});
// export const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
//   withCredentials: true,
//   reconnection: true,
// });
socket.on("connect_error", (error: Error) => {
  console.log(error.message);
  // console.log(error.description);
  // console.log(error.context);
});

socket.on('connect',()=>{
  console.log("CONNECTED")
})
socket.on('disconnect',(reason)=>{
  console.log("Disconnected", reason)
})
