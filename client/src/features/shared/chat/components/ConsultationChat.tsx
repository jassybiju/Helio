"use client";

import { useEffect, useRef, useState } from "react";
import { Clock, Paperclip, Send, Smile } from "lucide-react";
import { IDoctorGetChat } from "@/src/features/doctor/services/chat.service";
import { useDoctorSendMessageMutation } from "@/src/features/doctor/dashboard/chat/hooks/useDoctorSendMessageMutation";
import { SendeeType } from "../types/chat.type";
import { socket } from "@/src/libs/socket";
import { toast } from "react-toastify";

interface Message {
  id: string;
  sender: "doctor" | "patient";
  content: string;
  timestamp: string;
}

interface Props {
  chatId: string | null;
  chatData: IDoctorGetChat['chats'] | undefined;
  sendeeData : SendeeType | undefined,
  userType: "doctor" | "patient";
  consultationStatus: "active" | "ended";
   onSendMessage: (
    message: string,
  ) => void;
}

export default function ConsultationChat({
  chatId,
userType,
  sendeeData,
  chatData,
  consultationStatus, 
  onSendMessage
}: Props) {
  const [message, setMessage] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);
  



  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chatData]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    onSendMessage(message, );

    setMessage("");
  };

  if (!chatId) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col bg-white">
      <div className="flex h-20 items-center justify-between border-b border-slate-200 px-6">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold">
            MC
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">{sendeeData?.name}</h2>

            <p className="text-xs text-slate-500">
              {/* Internal Medicine Specialist */}
            </p>
          </div>
        </div>

        <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
          View Appointment
        </button>
      </div>

      <div className="border-b border-blue-100 bg-blue-50 px-6 py-3">
        <div className="flex items-center gap-2 text-sm text-blue-700">
          <Clock className="h-4 w-4" />
          <span>Active follow-up period • 7 days remaining</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-slate-50 px-6 py-6">
        <div className="mx-auto max-w-3xl space-y-4">
          {chatData?.map((msg) => {
            const mine = msg.sendBy === userType;

            return (
              <div
                key={msg.id}
                className={`flex ${
                  mine
                    ? "justify-start flex-row-reverse"
                    : "justify-start flex-row"
                }`}
              >
                <div
                  className={`h-min rounded-full  p-4 ${
                    mine
                      ? "bg-blue-600  text-white"
                      : "border border-slate-200 bg-white text-slate-900 shadow-sm"
                  }`}
                >
                  FM
                </div>
                <div
                  className={`max-w-[75%] rounded-2xl px-5 py-4 ${
                    mine
                      ? "bg-blue-600 text-white"
                      : "border border-slate-200 bg-white text-slate-900 shadow-sm"
                  }`}
                >
                  <p className="text-sm leading-6">{msg.message}</p>

                  <p
                    className={`mt-2 text-xs ${
                      mine ? "text-blue-100" : "text-slate-400"
                    }`}
                  >
                    {new Date(msg.sendAt)?.toLocaleDateString()}
                  </p>
                </div>
              </div>
            );
          })}

          <div ref={bottomRef} />
        </div>
      </div>

      {consultationStatus === "active" && (
        <div className="border-t border-slate-200 bg-white p-4">
          <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
            <Paperclip className="h-5 w-5 text-slate-400" />

            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
              placeholder="Type your message..."
              className="flex-1 bg-transparent text-sm outline-none"
            />

            <Smile className="h-5 w-5 text-slate-400" />

            <button
              onClick={handleSendMessage}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600"
            >
              <Send className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
