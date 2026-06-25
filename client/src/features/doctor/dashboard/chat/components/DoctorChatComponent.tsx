"use client";

import ConsultationChat from "@/src/features/shared/chat/components/ConsultationChat";
import ConsultationChatList from "@/src/features/shared/chat/components/ConsultationChatList";
import React from "react";
import { useDoctorChat } from "../hooks/useDoctorChat";
import { useConsultationChat } from "@/src/features/shared/chat/hooks/useConsultationChat";
import { USER_ROLES } from "@/src/types/user.types";

const DoctorChatComponent = () => {
 const {chatData, chatList, activeSessionId, setActiveSessionId, onSendMessage,sendeeData } = useDoctorChat()
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
          userType="doctor"
          consultationStatus={'active'}
        />
      )}
    </>
  );
};

export default DoctorChatComponent;
