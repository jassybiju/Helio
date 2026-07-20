"use client";

import UserAuthButtons from "@/src/components/UserAuthButtons";
import { Menu } from "lucide-react";
import React from "react";

interface DoctorHeaderProps {
  onMenuClick: () => void;
}


const DoctorHeader = ({onMenuClick} : DoctorHeaderProps) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center gap-3">
        {/* Mobile Menu */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md hover:bg-slate-100"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div>
          <h1 className="text-base lg:text-lg font-semibold">Welcome back</h1>
        </div>
      </div>

      <UserAuthButtons />
    </header>
  );
};

export default DoctorHeader;
