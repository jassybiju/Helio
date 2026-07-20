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
import { useState } from "react";
import { useGetPatientsAppointmentQuery } from "../hooks/useGetPatientsAppointmentQuery";
import { APPOINTMENT_STATUS } from "@/src/types/appointment.types";
import { useGetPatientLiveQueueQuery } from "../hooks/useGetPatientLiveQueueQuery";
import { useModal } from "@/src/hooks/useModal";
import PatientAppointmentCancellationConfirmationModal from "./PatientAppointmentCancellationConfirmationModal";
import VideoCall from "@/src/components/VideoCall";
import { useCancelPatientAppointmentMutation } from "../hooks/useCancelPatientAppointment";
import PatientAppointmentCancellationModal from "./PatientAppointmentCancellationModal";

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

  const { mutate: cancelAppointment } =
    useCancelPatientAppointmentMutation(appointmentId);
  const { data: data } = useGetPatientsAppointmentQuery(appointmentId);
  const { data: liveData } = useGetPatientLiveQueueQuery(appointmentId);
  const { open } = useModal();

  const [doctorOnline, _setDoctorOnline] = useState<boolean>(false);

  const appointment = data?.data;

  const hasLiveData =
    !!liveData?.data &&
    appointment?.appointment.status === APPOINTMENT_STATUS.CONFIRMED;
  // Simulate live queue updates
  // useEffect(() => {
  //   if (!queue) return;

  //   const interval = setInterval(() => {
  //     setQueue((prev) => {
  //       if (!prev) return null;
  //       return {
  //         ...prev,
  //         currentQueueNumber: Math.max(
  //           prev.currentQueueNumber,
  //           Math.floor(Math.random() * 12) + 4,
  //         ),
  //         estimatedWaitTime: Math.max(2, prev.estimatedWaitTime - 1),
  //       };
  //     });
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, [queue]);

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

  const openCancellatonConfirmationModal = () => {
    open(PatientAppointmentCancellationConfirmationModal, {
      date: appointment?.appointment.startTime,
      fee: appointment?.appointment.consultationFee,
      appointmentId: appointment?.appointment.id,
    });
  };

  const handleCancelAppointment = () => {
    open(PatientAppointmentCancellationModal, {
      date: appointment?.appointment.startTime ?? null,
      fee: appointment?.appointment.consultationFee ?? null,
      appointmentId: appointment?.appointment.id ?? null,
    });
  };

  const statusConfig: Record<
    Partial<APPOINTMENT_STATUS>,
    { color: string; textColor: string; badge: string }
  > = {
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
    CANCELLED_BY_DOCTOR: {
      color: "bg-red-100",
      textColor: "text-red-700",
      badge: "Cancelled",
    },
    ONGOING: {
      badge: "Ongoing",
      color: "bg-green-100",
      textColor: "bg-green-700",
    },
    NO_SHOW: { badge: "No Show", color: "bg-red-100", textColor: "bg-red-700" },
    CONFIRMED: {
      badge: "Confirmed",
      color: "bg-green-100",
      textColor: "bg-green-700",
    },
    CANCELLED_BY_PATIENT: {
      badge: "Cancelled By Patient",
      color: "bg-red-100",
      textColor: "bg-red-700",
    },
    SKIPPED: { badge: "Skipped", color: "bg-red-100", textColor: "bg-red-700" },
    DOCTOR_CANCELLATION_REQUESTED: {
      badge: "Doctor Requested Cancellation",
      color: "bg-red-100",
      textColor: "bg-red-700",
    },
    EXPIRED: {
      badge: "Expired",
      color: "bg-gray-100",
      textColor: "bg-gray-700",
    },
  };

  const config = statusConfig[appointment.appointment.status];
  const fakeDate = new Date();
  fakeDate.setDate(new Date().getDate() + 1);
  fakeDate.setHours(0, 0, 0, 0);
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-sm sm:text-base text-blue-600 hover:text-blue-700 font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Appointmentsds
      </button>
      {appointment.appointment.status ===
        APPOINTMENT_STATUS.DOCTOR_CANCELLATION_REQUESTED && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 space-y-4">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-red-900 mb-1">
                Appointment Cancelled by Doctor
              </h2>
              <p className="text-red-800 mb-3">
                Cancellation Reason : {appointment.cancellationReason}
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
      <div className="bg-white rounded-lg border border-slate-200 p-4 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {" "}
              {appointment.doctor.name}
            </h1>
            <p className="text-slate-600">
              {appointment.doctor.specialization}
            </p>
          </div>
          <span
            className={`self-start sm:self-auto px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold ${config?.color} ${config.textColor}`}
          >
            {config?.badge ?? "UNKOWN"}
          </span>
        </div>
        {appointment.appointment.status}sdd
        {/* Appointment Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="border-l-4 border-blue-600 pl-4">
            <p className="text-xs font-semibold text-slate-600 uppercase mb-1">
              Date
            </p>
            <p className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              {new Date(appointment.appointment.startTime).toLocaleTimeString(
                [],
                {
                  hour: "2-digit",
                  minute: "2-digit",
                },
              )}
            </p>
          </div>

          <div className="border-l-4 border-blue-600 pl-4">
            <p className="text-xs font-semibold text-slate-600 uppercase mb-1">
              Time
            </p>
            <p className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              {new Date(appointment.appointment.startTime).toLocaleTimeString(
                [],
                {
                  hour: "2-digit",
                  minute: "2-digit",
                },
              )}
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
              Consultation Fees
            </p>
            <p className="text-lg font-bold text-slate-900 whitespace-nowrap">
              ${appointment.appointment.totalAmount}
            </p>
          </div>
        </div>
      </div>
      sddf
      {fakeDate.toString()}
      {fakeDate ===
        new Date(
          new Date(appointment.appointment.startTime).setHours(0, 0, 0, 0),
        ) && "true"}
      {fakeDate.toString() ===
        new Date(
          new Date(appointment.appointment.startTime).setHours(0, 0, 0, 0),
        ).toString() &&
        [APPOINTMENT_STATUS.CONFIRMED, APPOINTMENT_STATUS.ONGOING].includes(
          appointment.appointment.status,
        ) && (
          <VideoCall
            patientName={appointment.doctor.name}
            appointmentId={appointment.appointmentId}
          />
        )}
      {/* Doctor Information */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 sm:p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">
          Doctor Information {doctorOnline ? "ONLINE" : "OFFLINE"}
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <p className="text-xs font-semibold text-slate-600 uppercase mb-2">
                Your Queue Number
              </p>
              <p className="text-3xl sm:text-4xl font-bold text-blue-600">
                #{liveData.data.queueNumber}
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <p className="text-xs font-semibold text-slate-600 uppercase mb-2">
                Currently Serving
              </p>
              <p className="text-3xl sm:text-4xl font-bold text-slate-900">
                #{liveData.data.queueNumberOfOngoingAppointment}
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <p className="text-xs font-semibold text-slate-600 uppercase mb-2">
                Estimated Wait Time
              </p>
              <p className="text-3xl sm:text-4xl font-bold text-slate-900">
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
      {/* Consultation Details */}
      {appointment?.consultation && (
        <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-6">
          <h2 className="text-lg font-bold text-slate-900">
            Consultation Details
          </h2>

          {/* Vitals */}
          <div>
            <h3 className="text-md font-semibold text-slate-800 mb-3">
              Vitals
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <VitalCard
                label="Blood Pressure"
                value={appointment?.consultation?.vitals?.bloodPressure}
              />
              <VitalCard
                label="Oxygen Level"
                value={appointment.consultation.vitals?.oxygenLevel}
              />
              <VitalCard
                label="Heart Rate"
                value={appointment.consultation.vitals?.heartRate}
              />
              <VitalCard
                label="Temperature"
                value={appointment.consultation.vitals?.temperature}
              />
              <VitalCard
                label="Weight"
                value={appointment.consultation.vitals?.weight}
              />
              <VitalCard
                label="Height"
                value={appointment.consultation.vitals?.height}
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <h3 className="text-md font-semibold text-slate-800 mb-3">
              Clinical Notes
            </h3>

            <div className="space-y-2 text-sm text-slate-700">
              <p className="break-words">
                <span className="font-semibold">Primary Diagnosis:</span>{" "}
                {appointment.consultation.primaryDiagnosis || "-"}
              </p>
              <p className="break-words">
                <span className="font-semibold">Clinical Observation:</span>{" "}
                {appointment.consultation.clinicalObservation || "-"}
              </p>
              <p className="break-words">
                <span className="font-semibold">General Advice:</span>{" "}
                {appointment.consultation.generalAdvice || "-"}
              </p>
              <p className="break-words">
                <span className="font-semibold">Quick Note:</span>{" "}
                {appointment.consultation.quickNote || "-"}
              </p>
            </div>
          </div>

          {/* Prescriptions */}
          <div>
            <h3 className="text-md font-semibold text-slate-800 mb-3">
              Prescriptions
            </h3>
            {appointment.consultation.prescriptions?.length > 0 ? (
              <div className="space-y-2">
                {appointment.consultation.prescriptions.map(
                  (p, idx: number) => {
                    const timingList = [];

                    if (p.timings?.morning) timingList.push("Morning");
                    if (p.timings?.afternoon) timingList.push("Afternoon");
                    if (p.timings?.night) timingList.push("Night");

                    return (
                      <div
                        key={idx}
                        className="p-3 border rounded-lg bg-slate-50 text-sm break-words"
                      >
                        <p className="font-semibold">{p.name}</p>

                        <p className="text-slate-600">
                          {timingList.length > 0
                            ? timingList.join(", ")
                            : "No timing"}{" "}
                          • {p.durationInDays} days •{" "}
                          {p.foodTiming === 0
                            ? "Before Food"
                            : p.foodTiming === 1
                              ? "After Food"
                              : "Any Time"}
                        </p>

                        {p.instruction && (
                          <p className="text-xs text-slate-500 mt-1">
                            {p.instruction}
                          </p>
                        )}
                      </div>
                    );
                  },
                )}
              </div>
            ) : (
              <p className="text-sm text-slate-500">
                No prescriptions available
              </p>
            )}
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="w-full">
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

            {appointment.appointment.status ===
              APPOINTMENT_STATUS.COMPLETED && (
              <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition">
                <Download className="w-5 h-5" />
                Download Prescription
              </button>
            )}

            <button className="w-full sm:w-auto px-4 sm:px-6 py-3 border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold rounded-lg transition">
              View Notes
            </button>
          </div>
          {appointment.appointment.status === APPOINTMENT_STATUS.CONFIRMED && (
            <button
              onClick={handleCancelAppointment}
              className="w-full sm:w-auto px-4 sm:px-6 py-3 text-nowrap  border bg-red-300 border-slate-200 text-red-700 hover:bg-slate-50 font-semibold rounded-lg transition"
            >
              Cancel Appointment
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const VitalCard = ({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) => {
  return (
    <div className="p-3 border border-slate-200 rounded-lg bg-slate-50">
      <p className="text-xs text-slate-500 uppercase font-semibold">{label}</p>
      <p className="text-lg font-bold text-slate-900">{value ?? "-"}</p>
    </div>
  );
};
