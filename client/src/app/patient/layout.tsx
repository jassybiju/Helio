import AIChatBot from "@/src/features/patient/ai/components/AIChatBot";
import React from "react";

const PatientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {children}
        <AIChatBot />

    </div>
  );
};

export default PatientLayout;
