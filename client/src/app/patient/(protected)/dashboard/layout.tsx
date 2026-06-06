import PatientHeader from "@/src/features/patient/dashboard/components/PatientHeader";
import PatientSidebar from "@/src/features/patient/dashboard/components/PatientSidebar";
import Script from "next/script";
import React from "react";

type PatientDashboardLayoutProps = {
  children: React.ReactNode;
};
const PatientDashboardLayout = ({ children }: PatientDashboardLayoutProps) => {
  
  return (
    <>   <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
      
    <div className="flex min-h-screen w-screen bg-slate-50">
      {/* Sidebar */}
      <PatientSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <PatientHeader></PatientHeader>
        {/* Content Area */}
        <main className="flex-1 overflow-auto px-5 py-5">{children}</main>
      </div>
    </div>
    </>
  );
};

export default PatientDashboardLayout;
