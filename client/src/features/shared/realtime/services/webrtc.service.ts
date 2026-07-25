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


type PeerWithPC = Peer.Instance & {
  _pc: RTCPeerConnection;
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
  }) as PeerWithPC;

  peer.on("signal", (signal) => {
    socket.emit("webrtc:signal", { appointmentId, to: targetSocketId, signal });
  });
  peer._pc.addEventListener("icegatheringstatechange", () => {
  });

  peer._pc.addEventListener("iceconnectionstatechange", () => {
  });

  peer.on("connect", () => {
    peer.send("Hello From custom room peer");
  });

  peer.on("data", (_data) => {
  });

  peer.on("error", (err) => {
    // Ignore expected aborts when closing
    if (err.message === 'User-Initiated Abort, reason=Close called' ) {
      return;
    }
  });

  return peer;
};
