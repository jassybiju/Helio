"use client";

import DoctorChatListComponent from "@/src/features/doctor/dashboard/chat/components/DoctorChatListComponent";
import { useParams } from "next/navigation";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { id } = useParams<{ id?: string }>();

  return (
    <div className="flex h-full rounded-lg  bg-white overflow-hidden">
      {/* Desktop */}
      <aside className="hidden lg:block w-[340px] border-r">
        <DoctorChatListComponent />
      </aside>

      <main className="hidden lg:flex flex-1 min-w-0">
        {children}
      </main>

      {/* Mobile */}
      <div className="lg:hidden flex-1">
        {id ? children : <DoctorChatListComponent />}
      </div>
    </div>
  );
}