import React, { useRef } from "react";
import { useState, useEffect } from "react";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Phone,
  Share2,
  Settings,
} from "lucide-react";
import { useWebRTC } from "../features/shared/realtime/hooks/useWebRTC";

const VideoCall = ({
  appointmentId,
  patientName,
}: {
  appointmentId: string;
  patientName: string;
}) => {
  const { join, leave, isJoined, userVideoRef, streamRef, remoteMediaStream } =
    useWebRTC(appointmentId);

  const [callTime, setCallTime] = useState("00:00");
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const remoteVideoRef = useRef(null);

  useEffect(() => {
    if (remoteVideoRef.current && remoteMediaStream) {
      remoteVideoRef.current.srcObject = remoteMediaStream;
    }
  }, [remoteMediaStream]);

  useEffect(() => {
    if (
      userVideoRef.current &&
      streamRef.current &&
      userVideoRef.current.srcObject !== streamRef.current
    ) {
      userVideoRef.current.srcObject = streamRef.current;
    }
  });

  const toggleMic = () => {
    const audioTracks = streamRef.current?.getAudioTracks();
    audioTracks?.forEach((track) => {
      track.enabled = !track.enabled;
    });
    setIsMicOn((prev) => !prev);
  };
  const toggleCamera = () => {
    const videoTracks = streamRef.current?.getVideoTracks();
    videoTracks?.forEach((track) => {
      track.enabled = !track.enabled;
    });
    setIsCameraOn((prev) => !prev);
  };

  if (!isJoined) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 aspect-video flex flex-col items-center justify-center gap-6">
          <div className="w-24 h-24 bg-blue-700 rounded-full flex items-center justify-center">
            <span className="text-4xl font-bold text-white">
              {patientName?.charAt(0) ?? "?"}
            </span>
          </div>
          <div className="text-center">
            <p className="text-white text-xl font-semibold">{patientName}</p>
            <p className="text-slate-400 text-sm mt-1">Waiting to join...</p>
          </div>
          <button
            onClick={join}
            className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition-all flex items-center gap-2"
          >
            <Video className="w-5 h-5" />
            Join Now
          </button>
        </div>
      </div>
    );
  }


    return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <div className="bg-black relative aspect-video flex items-center justify-center">
        <div className="w-full h-full bg-gradient-to-br from-blue-900 to-blue-800 flex items-center justify-center relative">
          
          {/* Remote video */}
          {remoteMediaStream ? (
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center">
              <div className="w-24 h-24 mx-auto bg-blue-700 rounded-full flex items-center justify-center mb-4">
                <span className="text-4xl font-bold text-white">
                  {patientName?.charAt(0) ?? "?"}
                </span>
              </div>
              <p className="text-white text-lg font-semibold">{patientName}</p>
              <p className="text-blue-200 text-sm mt-1">Connecting...</p>
            </div>
          )}

          {/* Local PiP */}
          <div className="absolute bottom-4 right-4 w-32 h-24 bg-slate-700 rounded-lg border-2 border-white shadow-lg overflow-hidden">
            <video
              ref={userVideoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover ${isCameraOn ? "block" : "hidden"}`}
            />
            {!isCameraOn && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <VideoOff className="w-6 h-6 text-white" />
                <p className="text-white text-xs mt-1">Camera Off</p>
              </div>
            )}
          </div>

          {/* Timer */}
          {/* <div className="absolute top-4 left-4 bg-black bg-opacity-60 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            {callTime}
          </div> */}
        </div>
      </div>

      {/* Controls */}
      <div className="bg-slate-50 border-t border-slate-200 px-6 py-4">
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={toggleMic}
            className={`p-3 rounded-full transition-all ${isMicOn ? "bg-slate-200 hover:bg-slate-300 text-slate-900" : "bg-red-100 hover:bg-red-200 text-red-700"}`}
          >
            {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>

          <button
            onClick={toggleCamera}
            className={`p-3 rounded-full transition-all ${isCameraOn ? "bg-slate-200 hover:bg-slate-300 text-slate-900" : "bg-red-100 hover:bg-red-200 text-red-700"}`}
          >
            {isCameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </button>

          {/* <button
            onClick={() => setIsScreenSharing(!isScreenSharing)}
            className={`p-3 rounded-full transition-all ${isScreenSharing ? "bg-blue-100 hover:bg-blue-200 text-blue-700" : "bg-slate-200 hover:bg-slate-300 text-slate-900"}`}
          >
            <Share2 className="w-5 h-5" />
          </button>

          <button className="p-3 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-900 transition-all">
            <Settings className="w-5 h-5" />
          </button> */}

          {/* End Call → back to waiting */}
          <button
            onClick={leave}
            className="p-3 rounded-full bg-red-600 hover:bg-red-700 text-white transition-all ml-2"
            title="End call"
          >
            <Phone className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-3 text-center">
          <p className="text-xs text-slate-600">
            {isScreenSharing && "Screen sharing active • "}
            {isMicOn ? "Microphone on" : "Microphone off"} •{" "}
            {isCameraOn ? "Camera on" : "Camera off"}
          </p>
        </div>
      </div>
    </div>
  );
};
export default VideoCall;
