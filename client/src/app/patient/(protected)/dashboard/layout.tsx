import PatientSidebar from "@/src/features/patient/dashboard/components/PatientSidebar";
import React from "react";

type PatientDashboardLayoutProps = {
  children : React.ReactNode
}
const PatientDashboardLayout = ({children} : PatientDashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen w-screen bg-slate-50">
      {/* Sidebar */}
      <PatientSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}

        {/* Content Area */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default PatientDashboardLayout;
