import { socket } from "@/src/libs/socket";
import Peer from "simple-peer";

export const createPeer = (stream: MediaStream, appointmentId: string) => {
  const peer = new Peer({ initiator: true, trickle: true, stream });

  peer.on("signal", (signal) => {
    socket.emit("webrtc:signal", { appointmentId, signal });
  });

  return peer;
};

export const addPeer = (
  incomingSignal: string,
  stream: MediaStream,
  appointmentId: string,
) => {
  const peer = new Peer({ initiator: false, trickle: true, stream });

  peer.on("signal", (signal) => {
    socket.emit("webrtc:signal", { signal, appointmentId });
  });

  peer.signal(incomingSignal);

  return peer;
};

export const initPeer = (
  targetSocketId: string,
  isInitator: boolean,
  stream: MediaStream,
  appointmentId: string,
) => {
  const peer = new Peer({
    initiator: isInitator,
    trickle: false,
    stream,
  });

  peer.on("signal", (signal) => {
    console.log("SIGNAL SEND", {
      isInitator,
      targetSocketId,
      type: signal.type,
    });
    socket.emit("webrtc:signal", { appointmentId, to: targetSocketId, signal });
  });
  peer._pc.addEventListener("icegatheringstatechange", () => {
    console.log("ICE gathering state:", peer._pc.iceGatheringState);
  });

  peer._pc.addEventListener("iceconnectionstatechange", () => {
    console.log("ICE connection state:", peer._pc.iceConnectionState);
  });

  peer.on("connect", () => {
    console.log("P2p connection establised");
    peer.send("Hello From custom room peer");
  });

  peer.on("data", (data) => {
    console.log("Receieved message", data.toString());
  });

  peer.on("error", (err) => {
    // Ignore expected aborts when closing
    if (err.message === 'User-Initiated Abort, reason=Close called' ) {
      return;
    }
    console.error("Peer error:", err.message,err.message === 'User-Initiated Abort, reason=Close called' );
  });

  return peer;
};
