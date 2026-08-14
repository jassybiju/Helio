import DoctorProfileComplete from "@/src/features/doctor/auth/components/DoctorProfileComplete";
import React from "react";

const DoctorProfileCompletePage = () => {
  return (
    <div className="w-full max-w-2xl">
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
            Complete Your Profile to Continue{" "}
          </h1>
          <p className="text-slate-600 text-lg">
            {/* Join over 500,000 patients who trust Helio for their virtual care needs. Secure, fast and personalized */}
          </p>
        </div>
         <DoctorProfileComplete /> 
        <p className="text-center text-sm text-slate-600">
          By signing up, you agree to helixo's
          <a href="#" className="text-blue-600 hover:underline">
            Terms of Service
          </a>
          and
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default DoctorProfileCompletePage;
