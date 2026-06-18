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
    <>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Today&apos;s Appointments
          </h1>
          <p className="text-slate-600 mt-1">
            View and manage all appointments for today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Total Appointments */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-blue-900 uppercase tracking-wide">
                Total Appointments
              </p>
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-4xl font-bold text-blue-900">{stats?.total}</p>
            <p className="text-xs text-blue-700">
              Today's scheduled consultations
            </p>
          </div>

          {/* Completed */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-green-900 uppercase tracking-wide">
                Completed
              </p>
              <Heart className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-4xl font-bold text-green-900">
              {stats?.completed}
            </p>
            <p className="text-xs text-green-700">Finished consultations</p>
          </div>

          {/* Upcoming */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border border-amber-200 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-amber-900 uppercase tracking-wide">
                Upcoming
              </p>
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-4xl font-bold text-amber-900">
              {stats?.upcoming}
            </p>
            <p className="text-xs text-amber-700">Waiting to be seen</p>
          </div>

          {/* Skipped */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-red-900 uppercase tracking-wide">
                Skipped
              </p>
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-4xl font-bold text-red-900">{stats?.skipped}</p>
            <p className="text-xs text-red-700">Missed appointments</p>
          </div>

          {/* No Shows */}
          {/* <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                No Shows
              </p>
              <Users className="w-5 h-5 text-slate-600" />
            </div>
            <p className="text-4xl font-bold text-slate-900">{stats?.noShows}</p>
            <p className="text-xs text-slate-600">Did not arrive</p>
          </div> */}

          {/* Shift Time */}
          {/* <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl border border-indigo-200 p-6 space-y-3">
            <p className="text-sm font-semibold text-indigo-900 uppercase tracking-wide">
              Your Shift
            </p>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-indigo-700 font-semibold mb-1">
                  Start Time
                </p>
                <p className="text-2xl font-bold text-indigo-900">9:00 AM</p>
              </div>
              <div className="h-px bg-indigo-300"></div>
              <div>
                <p className="text-xs text-indigo-700 font-semibold mb-1">
                  End Time
                </p>
                <p className="text-2xl font-bold text-indigo-900">6:00 PM</p>
              </div>
            </div>
          </div> */}
        </div>

        {/* Ongoing Section */}
        {ongoingAppointments.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 bg-amber-600 rounded-full"></div>
              <h2 className="text-base font-bold text-slate-900">Ongoing</h2>
              <span className="text-xs font-semibold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                {ongoingAppointments.length}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {ongoingAppointments.map((apt) => (
                <AppointmentCard key={apt.id} appointment={apt} />
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Section */}
        {next ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 bg-blue-600 rounded-full"></div>
              <h2 className="text-base font-bold text-slate-900">Upcoming</h2>
              <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                {/* {next.length} */}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              <AppointmentCard appointment={next} />
            </div>
          </div>
        ) : (
          ""
        )}
        {/* Skipped Section */}
        {skippedAppointments.length > 0 && (
          <div className="space-y-2">
            <button
              onClick={() => setExpandedSkippedSection(!expandedSkippedSection)}
              className="w-full flex items-center justify-between gap-2 p-2 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition"
            >
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 bg-slate-400 rounded-full"></div>
                <h2 className="text-base font-bold text-slate-900">Skipped</h2>
                <span className="text-xs font-semibold bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">
                  {skippedAppointments.length}
                </span>
              </div>
              <span className="text-slate-600 font-semibold">
                {expandedSkippedSection ? "−" : "+"}
              </span>
            </button>

            {expandedSkippedSection && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {skippedAppointments.map((apt) => (
                  <AppointmentCard key={apt.id} appointment={apt} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default DoctorTodaysAppointment;
