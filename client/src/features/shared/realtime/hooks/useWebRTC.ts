// 'use client'

import { useCallback, useEffect, useRef, useState } from "react";
import { initPeer } from "../services/webrtc.service";
import type Peer from "simple-peer";
import { getSocket } from "@/src/libs/socket";

export const useWebRTC = (appointmentId: string) => {
  const [remoteMediaStream, setRemoteMediaStream] =
    useState<MediaStream | null>();
    const socket = getSocket()
  // const [isMicOn, setIsMicOn] = useState(true);
  // const [isCameraOn, setIsCameraOn] = useState(true);
  const userVideoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<Peer.Instance | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isJoined, setIsJoined] = useState(false);
  const join = async () => {
    if (streamRef.current) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      streamRef.current = stream;

      if (userVideoRef.current) {
        userVideoRef.current.srcObject = stream;
      }
      console.log(streamRef);
      socket.emit("webrtc:join-room", { appointmentId });

      socket.on("webrtc:user-joined", (_incomingSocketId) => {
        // if (peerRef.current) return;
        // const peerInstance = initPeer(
        //   incomingSocketId,
        //   true,
        //   stream,
        //   appointmentId,
        // );
        // peerRef.current = peerInstance;
        // peerInstance.on("stream", (remoteStream) => {
        //   setRemoteMediaStream(remoteStream);
        // });
      });
      socket.on("webrtc:existing-users", (existingSocketIds: string[]) => {
        existingSocketIds.forEach((socketId) => {
          if (peerRef.current) return;
          const peerInstance = initPeer(socketId, true, stream, appointmentId);
          peerRef.current = peerInstance;
          peerInstance.on("stream", (remoteStream) => {
            setRemoteMediaStream(remoteStream);
          });
        });
      });

      socket.on("webrtc:signal", ({ signal, from }) => {
        if (peerRef.current) {
          peerRef.current.signal(signal);
        } else {
          const peerInstance = initPeer(from, false, stream, appointmentId);
          peerRef.current = peerInstance;
          peerInstance.on("stream", (remoteStream) => {
            setRemoteMediaStream(remoteStream);
          });
          peerInstance.signal(signal);
        }
      });

      socket.on("webrtc:user-left", () => {
        peerRef.current?.destroy();
        peerRef.current = null;
        setRemoteMediaStream(null);
      });

      setIsJoined(true);
    } catch (err) {
      console.log('ERROR JOINIGN', err)
    }
  };

  const leave = useCallback(() => {
    socket.emit("webrtc:leave-room", { appointmentId });
    socket.off("webrtc:user-joined");
    socket.off("webrtc:signal");
    socket.off("webrtc:user-left");
    socket.off("webrtc:existing-users");

    peerRef.current?.destroy();
    peerRef.current = null;

    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;

    if (userVideoRef.current) userVideoRef.current.srcObject = null;
    setRemoteMediaStream(null);
    setIsJoined(false);
  }, [appointmentId]);
  useEffect(() => {
    return () => {
      leave();
    };
  }, [leave]);

  return { isJoined, join, leave, userVideoRef, streamRef, remoteMediaStream };
};
