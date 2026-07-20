import Navbar from "@/src/components/Navbar";
import GuestLayout from "@/src/layout/GuestLayout";
import React from "react";

type PropType = {
  children: React.ReactNode;
};

const layout = ({ children }: PropType) => {
  return (
    <GuestLayout>
      {" "}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Navbar>
          
        </Navbar>
        <main className="flex items-center justify-center py-12 px-4">
          {children}{" "}
        </main>
        <footer className="text-center py-8 text-sm text-slate-500">
          © 2024 Helio Telemedicine Inc. All rights reserved.
        </footer>
      </div>
    </GuestLayout>
  );
};

export default layout;
