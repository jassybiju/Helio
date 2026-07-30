"use client";

import { useRouter } from "next/navigation";
import ConsultationChatList from "@/src/features/shared/chat/components/ConsultationChatList";
import { usePatientChat } from "../hooks/usePatientChat";

const PatientChatListComponent = () => {
  const router = useRouter();

  const { chatList } = usePatientChat(null);

  return (
    <div className="h-full overflow-y-auto">
      <ConsultationChatList
        list={chatList!}
        activeId={null} // derive this from useParams/usePathname
        setActiveId={(id) => router.push(`/dashboard/chat/${id}`)}
        baseUrl="/dashboard/chat"
      />
    </div>
  );
};

export default PatientChatListComponent;