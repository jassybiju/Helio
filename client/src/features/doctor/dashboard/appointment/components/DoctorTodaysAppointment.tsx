"use client";

import React, { useState } from "react";
import useDoctorAppointment from "../hooks/useDoctorAppointment";
import { Calendar, Clock, Heart, Search, Users, XCircle } from "lucide-react";
import {
  APPOINTMENT_STATUS,
  CONSULTATION_TYPE,
} from "@/src/types/appointment.types";
import TableComponent from "@/src/components/TableComponent";
import Pagination from "@/src/components/Pagination";
import AppointmentCard from "./AppointmentCard";
import useDoctorTodayAppointment from "../hooks/useDoctorTodayAppointment";

const DoctorTodaysAppointment = () => {
  const fakeToday = new Date();
  fakeToday.setDate(fakeToday.getDate() + 1);
  const today = fakeToday.toISOString().split("T")[0];

  const [expandedSkippedSection, setExpandedSkippedSection] = useState(false);
  const { stats, ongoingAppointments, skippedAppointments, next } =
    useDoctorTodayAppointment();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Today's Appointments
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your consultations and patient flow
          </p>
        </div>

        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Stats */}
      <div
        className="
      grid 
      grid-cols-2 
      xl:grid-cols-4 
      gap-3 
      sm:gap-5
    "
      >
        <StatCard
          title="Total"
          value={stats?.total}
          icon={<Calendar />}
          color="blue"
          subtitle="Scheduled"
        />

        <StatCard
          title="Completed"
          value={stats?.completed}
          icon={<Heart />}
          color="green"
          subtitle="Finished"
        />

        <StatCard
          title="Upcoming"
          value={stats?.upcoming}
          icon={<Clock />}
          color="amber"
          subtitle="Waiting"
        />

        <StatCard
          title="Skipped"
          value={stats?.skipped}
          icon={<XCircle />}
          color="red"
          subtitle="Missed"
        />
      </div>

      {/* Ongoing */}
      <AppointmentSection
        title="Ongoing"
        count={ongoingAppointments.length}
        color="amber"
      >
        {ongoingAppointments.length ? (
          <div
            className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-3
          gap-4
        "
          >
            {ongoingAppointments.map((apt) => (
              <AppointmentCard key={apt.id} appointment={apt} />
            ))}
          </div>
        ) : (
          <EmptyState text="No ongoing appointments" />
        )}
      </AppointmentSection>

      {/* Upcoming */}
      <AppointmentSection title="Next Appointment" color="blue">
        {next ? (
          <div
            className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-3
        "
          >
            <AppointmentCard appointment={next} />
          </div>
        ) : (
          <EmptyState text="No upcoming appointments" />
        )}
      </AppointmentSection>

      {/* Skipped */}
      {skippedAppointments.length > 0 && (
        <div className="rounded-xl border border-slate-200 overflow-hidden">
          <button
            onClick={() => setExpandedSkippedSection(!expandedSkippedSection)}
            className="
            w-full
            flex
            justify-between
            items-center
            p-4
            bg-slate-50
            hover:bg-slate-100
            transition
          "
          >
            <div className="flex items-center gap-3">
              <div
                className="
              w-2
              h-8
              bg-slate-400
              rounded-full
            "
              />

              <div className="text-left">
                <h2 className="font-bold text-slate-900">
                  Skipped Appointments
                </h2>

                <p className="text-xs text-slate-500">
                  Review missed consultations
                </p>
              </div>

              <span
                className="
              px-2
              py-1
              rounded-full
              text-xs
              font-bold
              bg-slate-200
              text-slate-700
            "
              >
                {skippedAppointments.length}
              </span>
            </div>

            <span className="text-xl">
              {expandedSkippedSection ? "−" : "+"}
            </span>
          </button>

          {expandedSkippedSection && (
            <div
              className="
            p-4
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-3
            gap-4
          "
            >
              {skippedAppointments.map((apt) => (
                <AppointmentCard key={apt.id} appointment={apt} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DoctorTodaysAppointment;

const StatCard = ({ title, value, subtitle, icon, color }: any) => {
  const styles: any = {
    blue: "bg-blue-50 border-blue-200 text-blue-700",
    green: "bg-green-50 border-green-200 text-green-700",
    amber: "bg-amber-50 border-amber-200 text-amber-700",
    red: "bg-red-50 border-red-200 text-red-700",
  };

  return (
    <div
      className={`
rounded-2xl
border
p-4
sm:p-6
${styles[color]}
`}
    >
      <div
        className="
flex
justify-between
items-center
"
      >
        <p className="text-xs sm:text-sm font-bold uppercase">{title}</p>

        {React.cloneElement(icon, {
          className: "w-5 h-5",
        })}
      </div>

      <p
        className="
text-3xl
sm:text-4xl
font-black
mt-3
"
      >
        {value ?? 0}
      </p>

      <p className="text-xs opacity-80">{subtitle}</p>
    </div>
  );
};

const AppointmentSection = ({ title, count, children, color }: any) => (
  <section className="space-y-4">
    <div className="flex items-center gap-3">
      <div
        className={`
w-1.5
h-6
rounded-full
${color === "blue" ? "bg-blue-600" : "bg-amber-500"}
`}
      />

      <h2 className="font-bold text-lg text-slate-900">{title}</h2>

      {count && (
        <span
          className="
bg-slate-100
px-2
py-1
rounded-full
text-xs
font-bold
"
        >
          {count}
        </span>
      )}
    </div>

    {children}
  </section>
);

const EmptyState = ({ text }: { text: string }) => (
  <div
    className="
border
border-dashed
rounded-xl
p-8
text-center
text-slate-400
text-sm
"
  >
    {text}
  </div>
);
