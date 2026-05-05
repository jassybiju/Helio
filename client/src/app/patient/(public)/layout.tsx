import Navbar from "@/src/components/Navbar";
import React from "react";

type PatientPublicLayoutProps = {
  children: React.ReactNode;
};

const PatientPublicLayout = ({ children }: PatientPublicLayoutProps) => {
  return (
    <>
      <Navbar>
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="/search"
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
      <main className="flex items-center justify-center ">{children}</main>
      <footer className="text-center py-8 text-sm text-slate-500">
        © 2024 Helio Telemedicine Inc. All rights reserved.
      </footer>
    </>
  );
};

export default PatientPublicLayout;
