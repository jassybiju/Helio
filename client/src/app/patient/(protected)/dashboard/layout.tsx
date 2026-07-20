'use client'

import PatientHeader from "@/src/features/patient/dashboard/components/PatientHeader";
import PatientSidebar from "@/src/features/patient/dashboard/components/PatientSidebar";
import Script from "next/script";
import React, { useState } from "react";

type PatientDashboardLayoutProps = {
  children: React.ReactNode;
};
const PatientDashboardLayout = ({ children }: PatientDashboardLayoutProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {" "}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
      <div className="flex h-screen bg-slate-50 overflow-hidden">
        <PatientSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="flex flex-1 flex-col overflow-hidden">
          <PatientHeader onMenuClick={() => setSidebarOpen(true)} />

          <main className="flex-1 overflow-y-auto px-4 py-4 lg:px-6 lg:py-6">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default PatientDashboardLayout;
