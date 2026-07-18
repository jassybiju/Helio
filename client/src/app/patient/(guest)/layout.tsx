import Navbar from "@/src/components/Navbar";
import GuestLayout from "@/src/layout/GuestLayout";
import React from "react";

type PropType = {
  children: React.ReactNode;
};

const layout = ({ children }: PropType) => {
  return (
    <GuestLayout>
      <Navbar isPatient>
     
      </Navbar>
      <main className="flex items-center justify-center ">{children}</main>
      <footer className="text-center py-8 text-sm text-slate-500">
        © 2024 Helio Telemedicine Inc. All rights reserved.
      </footer>
    </GuestLayout>
  );
};

export default layout;
