import ConsultationChat from "@/src/features/shared/chat/components/ConsultationChat";
import ConsultationChatList from "@/src/features/shared/chat/components/ConsultationChatList";

export default async function ConsultationChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="h-[calc(100vh-140px)] overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="flex h-full">
        <ConsultationChatList
          activeId={id}
          baseUrl="/patient/dashboard/consultation-chat"
        />

        <ConsultationChat
          doctorName="Michael Chen"
          patientName="John Doe"
          userType="patient"
          consultationStatus="active"
        />
      </div>
    </div>
  );
}
``;
