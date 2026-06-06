import {
  Clock,
  ExternalLink,
  Eye,
  LogOut,
  Play,
  Users,
  Video,
  XCircle,
} from "lucide-react";
import React from "react";
import { ITodayAppointmentCardDTO } from "../../../services/appointment.service";
import {
  APPOINTMENT_STATUS,
  CONSULTATION_TYPE,
} from "@/src/types/appointment.types";
import Link from "next/link";
import useDoctorTodayAppointment from "../hooks/useDoctorTodayAppointment";
import { useRouter } from "next/navigation";

const AppointmentCard = ({
  appointment,
}: {
  appointment: ITodayAppointmentCardDTO;
}) => {
  const router = useRouter();
  const {skipAppointment, startConsultation } = useDoctorTodayAppointment();
  const isOngoing = appointment.status === APPOINTMENT_STATUS.ONGOING;

  const viewOngoingConsultation = () => {
    router.push("/appointment/consultation/" + appointment.id);
  };
  return (
    <div
      className={`rounded-xl overflow-hidden transition-all hover:shadow-lg border ${
        isOngoing
          ? "bg-white border-amber-200 shadow-md"
          : appointment.status === APPOINTMENT_STATUS.SKIPPED
            ? "bg-white border-slate-200"
            : "bg-white border-blue-200 shadow-md"
      }`}
    >
      {/* Header with colored accent */}
      <div
        className={`h-1 ${
          isOngoing
            ? "bg-linear-to-r from-amber-400 to-orange-400"
            : appointment.status === APPOINTMENT_STATUS.SKIPPED
              ? "bg-slate-300"
              : "bg-linear-to-r from-blue-400 to-blue-600"
        }`}
      ></div>

      <div className="p-3 space-y-2">
        {/* Queue Number and Type Badge */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className={`text-xl font-bold ${
                isOngoing
                  ? "text-amber-700"
                  : appointment.status === APPOINTMENT_STATUS.SKIPPED
                    ? "text-slate-600"
                    : "text-blue-700"
              }`}
            >
              #{appointment.queue}
            </span>
          </div>

          <div
            className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold transition ${
              appointment.type === CONSULTATION_TYPE.ONLINE
                ? "bg-blue-50 text-blue-700"
                : "bg-emerald-50 text-emerald-700"
            }`}
          >
            {appointment.type === CONSULTATION_TYPE.ONLINE ? (
              <>
                <Video className="w-3 h-3" /> Online
              </>
            ) : (
              <>
                <Users className="w-3 h-3" /> In
              </>
            )}
          </div>
        </div>

        {/* Patient Info Row */}
        <div className="flex items-center gap-2">
          <div
            className={`w-10 h-10 rounded-full  flex items-center justify-center text-white font-bold text-xs shrink-0`}
          >
            {appointment?.patient?.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 truncate">
              {appointment?.patient?.name}
            </p>
            <div className="flex items-center gap-1">
              <span
                className={`text-xs px-1.5 py-0.5 rounded ${
                  appointment.patient?.gender === "male"
                    ? "bg-blue-50 text-blue-700"
                    : "bg-pink-50 text-pink-700"
                }`}
              >
                {appointment.patient?.gender === "male" ? "M" : "F"}
              </span>
              <Clock className="w-3 h-3 text-slate-500" />
              <span className="text-xs text-slate-600">{appointment.time}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-1.5 pt-1">
          {!isOngoing && appointment.status !== APPOINTMENT_STATUS.SKIPPED && (
            <button onClick={()=>skipAppointment(appointment.id)} className="flex-1 px-2 py-1.5 text-xs font-semibold rounded bg-red-50 text-red-700 hover:bg-red-100 transition-colors border border-red-200 flex items-center justify-center gap-1">
              <XCircle className="w-3 h-3" />
              Skip
            </button>
          )}

          {appointment.status === APPOINTMENT_STATUS.ONGOING && (
            <>
              <button className="flex-1 px-2 py-1.5 text-xs font-semibold rounded bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1">
                <LogOut className="w-3 h-3" />
                End
              </button>
              <button
                onClick={viewOngoingConsultation}
                className="flex-1 px-2 py-1.5 text-xs font-semibold rounded bg-amber-700 text-white hover:bg-amber-500 transition-colors flex items-center justify-center gap-1 p-2 text-red-600  rounded-lg transition"
                title="Cancel appointment"
              >
                <ExternalLink className="w-4 h-4" /> View
              </button>
            </>
          )}

          {appointment.status === APPOINTMENT_STATUS.CONFIRMED && (
            <>
              <button
                onClick={() => startConsultation(appointment.id)}
                className="flex-1 px-2 py-1.5 text-xs font-semibold rounded bg-green-600 text-white hover:bg-green-700 transition-colors flex items-center justify-center gap-1"
              >
                <Play className="w-3 h-3 fill-current" />
                Start
              </button>
            </>
          )}

          {/* <Link href={'/appointment/'+appointment.id} className="flex-1 px-2 py-1.5 text-xs font-semibold rounded bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1">
            <Eye className="w-3 h-3" />
            Start Consultation
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
