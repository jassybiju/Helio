'use client'

import DoctorHeader from "@/src/features/doctor/dashboard/components/DoctorHeader";
import DoctorSidebar from "@/src/features/doctor/dashboard/components/DoctorSidebar";
import React, { useState } from "react";

type DoctorDashboardLayoutProps = {
  children: React.ReactNode;
};
const DoctorDashboardLayout = ({ children }: DoctorDashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden">
      <DoctorSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <DoctorHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto bg-slate-50 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboardLayout;
