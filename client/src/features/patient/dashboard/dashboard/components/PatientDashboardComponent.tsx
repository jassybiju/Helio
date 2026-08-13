"use client";

import {
  Calendar,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Pill,
  Clock,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { useGetPatientDashboardQuery } from "../hooks/useGetPatientDashboardQuery";

interface VitalStatus {
  status: "normal" | "warning" | "critical";
}

const getVitalStatus = (v: string | undefined, name: string): VitalStatus => {
  if (!v) {
    return { status: "normal" };
  }
  const value = Number(v);
  if (Number.isNaN(value)) {
    return { status: "normal" };
  }
  // Heart rate: 60-100 bpm normal
  if (name === "heart_rate") {
    if (value >= 60 && value <= 100) return { status: "normal" };
    return { status: "critical" };
  }
  // Blood pressure systolic: < 120 normal, 120-129 elevated, > 130 high
  if (name === "blood_pressure") {
    if (value < 120) return { status: "normal" };
    if (value < 130) return { status: "warning" };
    return { status: "critical" };
  }
  // Oxygen: 95-100 normal
  if (name === "oxygen") {
    if (value >= 95) return { status: "normal" };
    return { status: "critical" };
  }
  // Temperature: 36.5-37.5 normal
  if (name === "temperature") {
    if (value >= 36.5 && value <= 37.5) return { status: "normal" };
    return { status: "critical" };
  }
  return { status: "normal" };
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "normal":
      return {
        bg: "bg-green-50",
        border: "border-green-200",
        text: "text-green-700",
        icon: "text-green-600",
      };
    case "warning":
      return {
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        text: "text-yellow-700",
        icon: "text-yellow-600",
      };
    case "critical":
      return {
        bg: "bg-red-50",
        border: "border-red-200",
        text: "text-red-700",
        icon: "text-red-600",
      };
    default:
      return {
        bg: "bg-slate-50",
        border: "border-slate-200",
        text: "text-slate-700",
        icon: "text-slate-600",
      };
  }
};

export default function PatientDashboardComponent() {
  const { data } = useGetPatientDashboardQuery();
  const nextVisit = data?.data.nextAppointment;
  const stats = data?.data.stats;
  const vitalsData = data?.data.vitals;
  const medications = data?.data.medications;
 

  const vitals = [
    {
      label: "Heart Rate",
      value: vitalsData?.heartRate,
      unit: "bpm",
      name: "heart_rate",
    },
    {
      label: "Blood Pressure",
      value: vitalsData?.bloodPressure,
      unit: "mmHg",
      name: "blood_pressure",
    },
    {
      label: "Oxygen Saturation",
      value: vitalsData?.oxygenLevel,
      unit: "%",
      name: "oxygen",
    },
    {
      label: "Temperature",
      value: vitalsData?.temperature,
      unit: "°C",
      name: "temperature",
    },
    { label: "Height", value: vitalsData?.height, unit: "cm", name: "height" },
    { label: "Weight", value: vitalsData?.weight, unit: "kg", name: "weight" },
  ];

  const getFoodTimingLabel = (foodTiming: number) => {
  switch (foodTiming) {
    case 0:
      return "Before food";

    case 1:
      return "After food";

    default:
      return "As directed";
  }
};

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Good morning, Alex
        </h1>
        <p className="text-slate-600">
          Here&apos;s what&apos;s happening with your health today.
        </p>
      </div>

      {/* Next Visit - Prominent Card */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Next Visit
            </h2>
            <p className="text-blue-100">
              You have an upcoming appointment scheduled
            </p>
            <div className="space-y-2 mt-4">
              <p className="text-sm">
                <span className="font-semibold">Date:</span> {nextVisit?.date}{" "}
                at{" "}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Doctor:</span>{" "}
                {nextVisit?.doctorName} -{" "}
              </p>
            </div>
          </div>
          <button className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
            Reschedule
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-600 uppercase">
              Total Appointments
            </h3>
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900">
            {stats?.totalAppointments}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-600 uppercase">
              Completed
            </h3>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900">
            {stats?.completedAppointments}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-600 uppercase">
              Cancelled/No Show
            </h3>
            <AlertCircle className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900">
            {stats?.cancelledAppointments}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-600 uppercase">
              Upcoming
            </h3>
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900">
            {stats?.upcomingAppointments}
          </p>
        </div>
      </div>

      {/* Vitals with Status Indicators */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Your Vitals</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {vitals.map((vital) => {
            const vitalStatus = getVitalStatus(vital.value, vital.name);
            const colors = getStatusColor(vitalStatus.status);
            return (
              <div
                key={vital.name}
                className={`rounded-lg border ${colors.bg} ${colors.border} p-6`}
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-semibold text-slate-600 uppercase">
                    {vital.label}
                  </p>
                  {vitalStatus.status === "critical" ? (
                    <AlertTriangle className={`w-5 h-5 ${colors.icon}`} />
                  ) : (
                    <CheckCircle className={`w-5 h-5 ${colors.icon}`} />
                  )}
                </div>
                <p className={`text-3xl font-bold ${colors.text}`}>
                  {vital.value}{" "}
                  <span className="text-sm text-slate-500">{vital.unit}</span>
                </p>
                <p className={`text-xs mt-2 ${colors.text} font-semibold`}>
                  {vitalStatus.status === "normal"
                    ? "In Range"
                    : vitalStatus.status === "warning"
                      ? "Elevated"
                      : "Out of Range"}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Medications Grouped by Doctor */}
   <div className="bg-white rounded-lg border border-slate-200">
  <div className="p-4 border-b border-slate-200 flex items-center gap-2">
    <Pill className="w-5 h-5 text-blue-600" />
    <h2 className="text-lg font-bold text-slate-900">
      Active Medications
    </h2>
  </div>

  <div className="divide-y divide-slate-200">
    {medications?.length ? (
      medications.map((medication, index) => (
        <div
          key={`${medication.fromAppointemnts}-${index}`}
          className="p-4"
        >
          {/* Doctor Header */}
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-slate-700">
              Dr. {medication.doctorName}
            </p>

            <Link
              href={`/dashboard/appointment/${medication.fromAppointemnts}`}
              className="text-blue-600 hover:text-blue-700 font-semibold text-xs"
            >
              View →
            </Link>
          </div>

          {/* Compact Medication Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {medication.prescription.map((med) => {
              const timing = [
                med.timing.morning && "Morning",
                med.timing.afternoon && "Afternoon",
                med.timing.night && "Night",
              ].filter(Boolean);

              return (
                <div
                  key={med.name}
                  className="rounded-md border border-slate-200 bg-slate-50 p-3"
                >
                  {/* Name + Duration */}
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-sm text-slate-900 truncate">
                      {med.name}
                    </p>

                    <span className="shrink-0 text-[11px] text-slate-500">
                      {med.durationInDays}d
                    </span>
                  </div>

                  {/* Schedule */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {timing.map((time,i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded"
                      >
                        {time}
                      </span>
                    ))}
                  </div>

                  {/* Instructions */}
                  {med.instructions && (
                    <p className="text-[11px] text-slate-500 mt-2 line-clamp-2">
                      {med.instructions}
                    </p>
                  )}

                  {/* Food Timing / Valid Till */}
                  <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-slate-200">
                    <span className="text-[10px] text-slate-500">
                      {getFoodTimingLabel(med.foodTiming)}
                    </span>

                    {med.validTill && (
                      <span className="text-[10px] text-slate-500">
                        Until{" "}
                        {new Date(med.validTill).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                          }
                        )}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))
    ) : (
      <div className="p-8 text-center">
        <Pill className="w-8 h-8 text-slate-300 mx-auto mb-2" />
        <p className="text-sm font-medium text-slate-600">
          No active medications
        </p>
        <p className="text-xs text-slate-400 mt-1">
          You currently have no active prescriptions.
        </p>
      </div>
    )}
  </div>

  <div className="p-4 border-t border-slate-200">
    
  </div>
</div>  

      {/* Quick Actions */}
      <div className="flex gap-4">
        <Link
          href="/search"
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
        >
          Book a Doctor
        </Link>
        <Link
          href="/dashboard/appointment"
          className="px-6 py-3 border-2 border-slate-200 text-slate-900 font-medium rounded-lg hover:bg-slate-50"
        >
          View Appointments
        </Link>
      </div>
    </div>
  );
}
