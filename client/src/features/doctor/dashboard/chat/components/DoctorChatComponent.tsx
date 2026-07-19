"use client";

import ConsultationChat from "@/src/features/shared/chat/components/ConsultationChat";
import ConsultationChatList from "@/src/features/shared/chat/components/ConsultationChatList";
import React, { useState } from "react";
import { useDoctorChat } from "../hooks/useDoctorChat";

const DoctorChatComponent = () => {
  const [showChat, setShowChat] = useState(false);
  const {
    chatData,
    chatList,
    activeSessionId,
    setActiveSessionId,
    onSendMessage,
    sendeeData,
    isExpired,
  } = useDoctorChat();
  return (
    <>
      <div className="flex h-full w-full">
        {/* Sidebar */}
        <div
          className={`
          w-full lg:w-[340px] lg:block
          ${showChat ? "hidden lg:block" : "block"}
        `}
        >
          {" "}
          <ConsultationChatList
            list={chatList!}
            activeId={activeSessionId}
            setActiveId={(id) => {
              setActiveSessionId(id);
              setShowChat(true);
            }}
            baseUrl="/patient/dashboard/consultation-chat"
          />
        </div>
        <div
          className={` flex-1 ${showChat ? "flex" : "hidden lg:flex"} flex-col `}
        >
        {activeSessionId && !chatData ? (
          "LOADING"
        ) : (
          <ConsultationChat
            onBack={() => setShowChat(false)}
            onSendMessage={onSendMessage}
            chatData={chatData}
            sendeeData={sendeeData}
            chatId={activeSessionId}
            userType="doctor"
            consultationStatus={!isExpired ? "active" : "expired"}
          />
        )}
      </div>
      </div>
    </>
  );
};

export default DoctorChatComponent;
