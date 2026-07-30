"use client";

import ConsultationChat from "@/src/features/shared/chat/components/ConsultationChat";
import ConsultationChatList from "@/src/features/shared/chat/components/ConsultationChatList";
import React, { useState } from "react";
import { usePatientChat } from "../hooks/usePatientChat";
import { useParams, useRouter } from "next/navigation";

const PatientChatComponent = () => {
  const router = useRouter()
  const {id} = useParams<{id : string }>()
  const {
    chatList,
    chatData,
    onSendMessage,
    sendeeData,
    isExpired,
  } = usePatientChat(id);
  if (!chatData) {
    return <div className="flex h-full items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex h-full w-full flex-col">
      <ConsultationChat
      onBack={()=>router.push('/dashboard/ead chat')}
        onSendMessage={onSendMessage}
        chatData={chatData}
        sendeeData={sendeeData}
        chatId={id}
        userType="patient"
        consultationStatus={isExpired ? "expired" : "active"}
      />
    </div>
  );
};

export default PatientChatComponent;
