import Navbar from "@/src/components/Navbar";
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
      <Navbar isPatient>
     
      </Navbar>
      <main className="flex items-center justify-center ">
        {children}
      </main>
      <footer className="text-center py-8 text-sm text-slate-500">
        © 2024 Helio Telemedicine Inc. All rights reserved.
      </footer>
    </>
  );
};

export default PatientProtectedCommonLayout;
