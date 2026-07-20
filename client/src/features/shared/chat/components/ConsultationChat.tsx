"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Clock, Send } from "lucide-react";
import { IDoctorGetChat } from "@/src/features/doctor/services/chat.service";
import { ChatMessageType, ChatType, SendeeType } from "../types/chat.type";
// interface Message {
//   id: string;
//   sender: "doctor" | "patient";
//   content: string;
//   timestamp: string;
// }

interface Props {
  chatId: string | null;
  chatData: ChatMessageType[] | undefined;
  sendeeData: SendeeType | undefined;
  userType: "doctor" | "patient";
  consultationStatus: "active" | "expired";
  onSendMessage: (message: string) => void;
  onBack?: () => void;
}

export default function ConsultationChat({
  chatId,
  userType,
  sendeeData,
  chatData,
  consultationStatus,
  onSendMessage,
  onBack,
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
    onSendMessage(message);

    setMessage("");
  };

  if (!chatId) {
    return null;
  }
  return (
    <div className="flex flex-1 h-full  flex-col bg-white overflow-y-scroll">
      <div className="flex h-16 items-center justify-between border-b bg-white px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="mr-1 rounded-md p-1 hover:bg-slate-100 lg:hidden"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div className="h-9 w-9 sm:h-10 sm:w-10 overflow-hidden rounded-full bg-blue-100 flex items-center justify-center">
            {sendeeData?.profilePic ? (
              <img
                src={sendeeData.profilePic}
                className="h-full w-full object-cover"
              />
            ) : (
              sendeeData?.name?.[0]
            )}
          </div>

          <div>
            <h2 className="text-base font-semibold">{sendeeData?.name}</h2>

            <p className="text-xs text-slate-500">
              {/* Internal Medicine Specialist */}
            </p>
          </div>
        </div>
        {/* <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
          View Appointment
        </button> */}
      </div>

      {/* <div className="border-b border-blue-100 bg-blue-50 px-6 py-3">
        <div className="border-b bg-slate-50 px-6 py-2 text-xs text-slate-500">
          <Clock className="h-4 w-4" />
          {/* <span>Active follow-up period • 7 days remaining</span> */}
        {/* </div> */}
      {/* </div> */} 

      <div className="flex-1 overflow-y-auto bg-slate-100 px-3 py-3 sm:px-5 lg:px-8">
        {" "}
        <div className="mx-auto w-full  space-y-4 sm:space-y-6">
          {" "}
          {chatData?.map((msg) => {
            const mine = msg.sendBy === userType;

            return (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${
                  mine ? "justify-end" : "justify-start"
                }`}
              >
                {!mine && (
                  <div
                    className={`h-min rounded-full   ${
                      mine
                        ? "bg-blue-600  text-white"
                        : "border border-slate-200 bg-white text-slate-900 shadow-sm"
                    }`}
                  >
                    <div className="h-7 w-7 overflow-hidden rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold">
                      {sendeeData?.profilePic ? (
                        <img
                          className="w-full h-full"
                          src={sendeeData.profilePic}
                        />
                      ) : (
                        sendeeData?.name?.[0]
                      )}
                    </div>{" "}
                  </div>
                )}
                <div
                  className={`max-w-[85%] sm:max-w-[75%] lg:max-w-[70%] rounded-2xl px-4 py-3 ${
                    mine
                      ? "rounded-br-md bg-blue-600 text-white"
                      : "rounded-bl-md border border-slate-200 bg-white text-slate-900 shadow-sm"
                  }`}
                >
                  <p className="text-sm leading-6">{msg.message}</p>

                  <div
                    className={`mt-1 flex justify-end text-[11px] ${
                      mine ? "text-blue-100" : "text-slate-400"
                    }`}
                  >
                    {new Date(msg.sendAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  {/* <p>{msg.status && "SENDING"}s</p> */}
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
      </div>

      {consultationStatus === "active" && (
        <div className="border-t border-slate-200 bg-white p-3 sm:p-4">
          {" "}
          <div className="flex items-center gap-2 sm:gap-3 rounded-2xl border border-slate-200 bg-white px-3 sm:px-4 py-2 sm:py-3 shadow-sm">
            {" "}
            {/* <Paperclip className="h-5 w-5 text-slate-400" /> */}
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
            {/* <Smile className="h-5 w-5 text-slate-400" /> */}
            <button
              onClick={handleSendMessage}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 transition hover:bg-blue-700"
            >
              <Send className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
