import Navbar from "@/src/components/Navbar";
import React from "react";

type PatientPublicLayoutProps = {
  children: React.ReactNode;
};

const PatientPublicLayout = ({ children }: PatientPublicLayoutProps) => {

  return (
    <>
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

export default PatientPublicLayout;
