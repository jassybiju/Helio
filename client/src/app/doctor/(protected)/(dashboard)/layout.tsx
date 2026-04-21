import DoctorHeader from "@/src/features/doctor/dashboard/components/DoctorHeader";
import DoctorSidebar from "@/src/features/doctor/dashboard/components/DoctorSidebar";
import React from "react";

type DoctorDashboardLayoutProps = {
  children: React.ReactNode;
};
const DoctorDashboardLayout = ({ children }: DoctorDashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen w-screen bg-slate-50">
      {/* Sidebar */}
      <DoctorSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <DoctorHeader />
        {/* Content Area */}
        <main className="flex-1 overflow-auto px-5 py-5">{children}</main>
      </div>
    </div>
  );
};

export default DoctorDashboardLayout;
