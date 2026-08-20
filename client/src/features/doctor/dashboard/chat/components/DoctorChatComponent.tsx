"use client";

import { useParams, useRouter } from "next/navigation";
import ConsultationChat from "@/src/features/shared/chat/components/ConsultationChat";
import { useDoctorChat } from "../hooks/useDoctorChat";

const DoctorChatComponent = () => {
  const router = useRouter()
  const { id } = useParams<{ id: string }>();

  const { chatData, onSendMessage, sendeeData, isExpired } = useDoctorChat(id);

  if (!chatData) {
    return <div className="flex h-full items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex h-full w-full flex-col">
      <ConsultationChat
      onBack={()=>router.push('/chat')}
        onSendMessage={onSendMessage}
        chatData={chatData}
        sendeeData={sendeeData}
        chatId={id}
        userType="doctor"
        consultationStatus={isExpired ? "expired" : "active"}
      />
    </div>
  );
};

export default DoctorChatComponent;