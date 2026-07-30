"use client";

import { useRouter } from "next/navigation";
import { useDoctorChat } from "../hooks/useDoctorChat";
import ConsultationChatList from "@/src/features/shared/chat/components/ConsultationChatList";

const DoctorChatListComponent = () => {
  const router = useRouter();

  const { chatList } = useDoctorChat(null);

  return (
    <div className="h-full overflow-y-auto">
      <ConsultationChatList
        list={chatList!}
        activeId={null} // derive this from useParams/usePathname
        setActiveId={(id) => router.push(`/chat/${id}`)}
        baseUrl="/doctor/dashboard/chat"
      />
    </div>
  );
};

export default DoctorChatListComponent;