"use client";

import PatientChatListComponent from "@/src/features/patient/dashboard/chat/components/PatientChatListComponent";
import { useParams } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { id } = useParams<{ id?: string }>();

  return (
    <div className="flex h-full w-full rounded-lg  bg-white overflow-hidden">
      {/* Desktop */}
      <aside className="hidden lg:block w-[340px] border-r">
        <PatientChatListComponent />
      </aside>

      <main className="hidden lg:flex w-full   ">{children}</main>

      {/* Mobile */}
      <div className="lg:hidden flex-1">
        {id ? children : <PatientChatListComponent />}
      </div>
    </div>
  );
}
