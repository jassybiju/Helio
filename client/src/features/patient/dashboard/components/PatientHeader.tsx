"use client";

import UserAuthButtons from "@/src/components/UserAuthButtons";
import React from "react";
import { Menu } from "lucide-react";

interface PatientHeaderProps {
  onMenuClick: () => void;
}

const PatientHeader = ({ onMenuClick }: PatientHeaderProps) => {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded hover:bg-slate-100"
        >
          <Menu className="w-6 h-6" />
        </button>

        <h1 className="text-lg font-semibold">Welcome Back</h1>
      </div>

      <UserAuthButtons />
    </header>
  );
};

export default PatientHeader;
