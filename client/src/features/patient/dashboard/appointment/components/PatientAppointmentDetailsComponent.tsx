"use client";

import { useRouter, useParams } from "next/navigation";
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  Users,
  ArrowLeft,
  MessageSquare,
  Download,
  User,
  AlertTriangle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useGetPatientsAppointmentQuery } from "../hooks/useGetPatientsAppointmentQuery";
import { APPOINTMENT_STATUS } from "@/src/types/appointment.types";
import { useGetPatientLiveQueueQuery } from "../hooks/useGetPatientLiveQueueQuery";
import { useModal } from "@/src/hooks/useModal";
import PatientAppointmentCancellationConfirmationModal from "./PatientAppointmentCancellationConfirmationModal";

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  type: "video" | "in-person";
  status: "upcoming" | "completed" | "cancelled";
  fee: number;
}

interface QueueInfo {
  appointmentId: string;
  patientQueueNumber: number;
  currentQueueNumber: number;
  estimatedWaitTime: number;
  totalPatientsInQueue: number;
}



const queueDataMap: Record<string, QueueInfo> = {
  "1": {
    appointmentId: "1",
    patientQueueNumber: 8,
    currentQueueNumber: 5,
    estimatedWaitTime: 18,
    totalPatientsInQueue: 12,
  },
};

export default function PatientAppointmentDetailsComponent() {
  const router = useRouter();
  const params = useParams();
  const appointmentId = params.id as string;

  const { data: data } = useGetPatientsAppointmentQuery(appointmentId);
  const { data: liveData } = useGetPatientLiveQueueQuery(appointmentId);
  const {open} = useModal()
  const [queue, setQueue] = useState<QueueInfo | null>(
    queueDataMap[appointmentId] || null,
  );
  const appointment = data?.data;

  const hasLiveData = !!liveData?.data;
  // Simulate live queue updates
  useEffect(() => {
    if (!queue) return;

    const interval = setInterval(() => {
      setQueue((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          currentQueueNumber: Math.max(
            prev.currentQueueNumber,
            Math.floor(Math.random() * 12) + 4,
          ),
          estimatedWaitTime: Math.max(2, prev.estimatedWaitTime - 1),
        };
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [queue]);

  const openCancellatonConfirmationModal = () => {
    open(PatientAppointmentCancellationConfirmationModal,{date : appointment?.appointment.startTime, fee : appointment?.appointment.consultationFee, appointmentId : appointment?.appointment.id})
  }

  if (!appointment) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-slate-600 mb-4">Appointment not found</p>
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:underline font-medium"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  const statusConfig: Record<Partial<APPOINTMENT_STATUS>, object> = {
    PENDING: {
      color: "bg-blue-100",
      textColor: "text-blue-700",
      badge: "Upcoming",
    },
    COMPLETED: {
      color: "bg-green-100",
      textColor: "text-green-700",
      badge: "Completed",
    },
    CANCELLED: {
      color: "bg-red-100",
      textColor: "text-red-700",
      badge: "Cancelled",
    },
    ONGOING: {},
    NO_SHOW: {},
    CONFIRMED: {},
    EXPIRED: {},
  };

  const config = statusConfig[appointment.appointment.status] ?? {};
 

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Appointmentsds
      </button>

          {appointment.appointment.status === APPOINTMENT_STATUS.DOCTOR_CANCELLATION_REQUESTED && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-red-900 mb-1">
                      Appointment Cancelled by Doctor
                    </h2>
                    <p className="text-red-800 mb-3">
                      {appointment.cancellationReason}
                    </p>
                    <p className="text-sm text-red-700">
                      Cancelled on{" "}
                      {new Date(
                        appointment.cancellationDate || "",
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={openCancellatonConfirmationModal}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition"
                >
                  Choose Reschedule or Accept Refund
                </button>
              </div>
            )}
      {/* Header */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {appointment.doctor.name}
            </h1>
            <p className="text-slate-600">
              {appointment.doctor.specialization}
            </p>
          </div>
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${config?.color} ${config.textColor}`}
          >
            {config.badge}
          </span>
        </div>
        {appointment.appointment.status}sdd 
        {/* Appointment Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="border-l-4 border-blue-600 pl-4">
            <p className="text-xs font-semibold text-slate-600 uppercase mb-1">
              Date
            </p>
            <p className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              {new Date(appointment.appointment.startTime).toLocaleDateString()}
            </p>
          </div>

          <div className="border-l-4 border-blue-600 pl-4">
            <p className="text-xs font-semibold text-slate-600 uppercase mb-1">
              Time
            </p>
            <p className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              {new Date(appointment.appointment.startTime).toLocaleTimeString()}
            </p>
          </div>

          <div className="border-l-4 border-blue-600 pl-4">
            <p className="text-xs font-semibold text-slate-600 uppercase mb-1">
              Type
            </p>
            <p className="text-lg font-bold text-slate-900 flex items-center gap-2">
              {appointment.appointment.consultationType === "ONLINE" ? (
                <>
                  <Video className="w-5 h-5 text-blue-600" />
                  Video Call
                </>
              ) : (
                <>
                  <MapPin className="w-5 h-5 text-blue-600" />
                  In-Person
                </>
              )}
            </p>
          </div>

          <div className="border-l-4 border-blue-600 pl-4">
            <p className="text-xs font-semibold text-slate-600 uppercase mb-1">
              Consultation Fee
            </p>
            <p className="text-lg font-bold text-slate-900">
              ${appointment.appointment.totalAmount}
            </p>
          </div>
        </div>
      </div>

      {/* Doctor Information */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">
          Doctor Information
        </h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
            <User className="w-5 h-5 text-slate-400" />
            <div>
              <p className="text-xs font-semibold text-slate-600 uppercase">
                Full Name
              </p>
              <p className="text-slate-900 font-medium">
                {appointment.doctor.name}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
            <span className="w-5 h-5 text-slate-400">🎯</span>
            <div>
              <p className="text-xs font-semibold text-slate-600 uppercase">
                Specialty
              </p>
              <p className="text-slate-900 font-medium">
                {appointment.doctor.specialization}
              </p>
            </div>
          </div>

          {/* <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-slate-400" />
            <div>
              <p className="text-xs font-semibold text-slate-600 uppercase">Email</p>
              <p className="text-slate-900 font-medium">{appointment}</p>
            </div>
          </div> */}
        </div>
      </div>

      {/* Live Queue Status */}
      {hasLiveData && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-600" />
            Live Queue Status
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <p className="text-xs font-semibold text-slate-600 uppercase mb-2">
                Your Queue Number
              </p>
              <p className="text-4xl font-bold text-blue-600">
                #{liveData.data.queueNumber}
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <p className="text-xs font-semibold text-slate-600 uppercase mb-2">
                Currently Serving
              </p>
              <p className="text-4xl font-bold text-slate-900">
                #{liveData.data.queueNumberOfOngoingAppointment}
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <p className="text-xs font-semibold text-slate-600 uppercase mb-2">
                Estimated Wait Time
              </p>
              <p className="text-4xl font-bold text-slate-900">
                {liveData.data.timeLeftSeconds}{" "}
                <span className="text-sm">min</span>
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-blue-100 space-y-3">
            {/* <div className="flex justify-between items-center">
              <span className="text-slate-600 font-medium">Position ahead of you</span>
              <span className="text-xl font-bold text-slate-900">{positionAhead} patient{positionAhead !== 1 ? 's' : ''}</span>
            </div> */}
            {/* <div className="flex justify-between items-center">
              <span className="text-slate-600 font-medium">Total patients in queue</span>
              <span className="text-xl font-bold text-slate-900">{queue.totalPatientsInQueue} patient{queue.totalPatientsInQueue !== 1 ? 's' : ''}</span>
            </div> */}
            {/* <div className="space-y-2 pt-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Your progress</span>
                <span className="font-semibold text-slate-900">{Math.round((positionAhead / queue.totalPatientsInQueue) * 100)}% remaining</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${((queue.totalPatientsInQueue - positionAhead) / queue.totalPatientsInQueue) * 100}%`,
                  }}
                />
              </div>
            </div> */}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 flex gap-3">
        {appointment.appointment.status === "ONGOING" && (
          <>
            <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition">
              <Video className="w-5 h-5" />
              Join Consultation
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold rounded-lg transition">
              <MessageSquare className="w-5 h-5" />
              Message Doctor
            </button>
          </>
        )}

        {appointment.status === "completed" && (
          <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition">
            <Download className="w-5 h-5" />
            Download Prescription
          </button>
        )}

        <button className="px-6 py-3 border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold rounded-lg transition">
          View Notes
        </button>
      </div>
    </div>
  );
}
