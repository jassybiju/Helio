"use client";

import ConsultationChat from "@/src/features/shared/chat/components/ConsultationChat";
import ConsultationChatList from "@/src/features/shared/chat/components/ConsultationChatList";
import React from "react";
import { usePatientChat } from "../hooks/usePatientChat";

const PatientChatComponent = () => {
  const {
    chatList,
    activeSessionId,
    setActiveSessionId,
    chatData,
    onSendMessage,
    sendeeData,
  } = usePatientChat();
 

  return (
    <>
      {" "}
      <ConsultationChatList
        list={chatList!}
        activeId={activeSessionId}
        setActiveId={setActiveSessionId}
        baseUrl="/patient/dashboard/consultation-chat"
      />
      {activeSessionId && !chatData ? (
        "LOADING"
      ) : (
        <ConsultationChat
          onSendMessage={onSendMessage}
          chatData={chatData}
          sendeeData={sendeeData}
          chatId={activeSessionId}
          userType="patient"
          consultationStatus={"active"}
        />
      )}
    </>
  );
};

export default PatientChatComponent;
