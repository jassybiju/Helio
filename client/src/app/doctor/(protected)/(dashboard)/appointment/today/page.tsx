import DoctorTodaysAppointment from "@/src/features/doctor/dashboard/appointment/components/DoctorTodaysAppointment";
import React from "react";

const DoctorTodayAppointmentPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Appointments</h1>
        <p className="text-slate-600 mt-1">
          Manage and track all your patient appointments in real-time.
        </p>
      </div>
      <DoctorTodaysAppointment />
    </div>
  );
};

export default DoctorTodayAppointmentPage;
