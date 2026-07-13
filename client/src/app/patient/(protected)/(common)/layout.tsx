import Navbar from "@/src/components/Navbar";
import AIChatBot from "@/src/features/patient/ai/components/AIChatBot";
import Script from "next/script";
import React from "react";

type PatientProtectedCommonLayoutType = {
  children: React.ReactNode;
};
const PatientProtectedCommonLayout = ({
  children,
}: PatientProtectedCommonLayoutType) => {
  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
      <Navbar>
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#"
            className="text-slate-700 hover:text-slate-900 font-medium text-sm"
          >
            Find a Doctor
          </a>
          <a
            href="#"
            className="text-slate-700 hover:text-slate-900 font-medium text-sm"
          >
            How it Works
          </a>
          <a
            href="#"
            className="text-slate-700 hover:text-slate-900 font-medium text-sm"
          >
            Pricing
          </a>
          <a
            href="#"
            className="text-slate-700 hover:text-slate-900 font-medium text-sm"
          >
            FAQ
          </a>
        </nav>
      </Navbar>
      <main className="flex items-center justify-center ">
        {children}
        <AIChatBot />
      </main>
      <footer className="text-center py-8 text-sm text-slate-500">
        © 2024 Helio Telemedicine Inc. All rights reserved.
      </footer>
    </>
  );
};

export default PatientProtectedCommonLayout;
