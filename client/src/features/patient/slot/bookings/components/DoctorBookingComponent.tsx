"use client";

import {
  Star,
  MapPin,
  ArrowLeft,
  Calendar,
  Clock,
  MapPinIcon,
  Video,
} from "lucide-react";
import { act, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { useDoctorSlotQuery } from "../hooks/useDoctorSlotQuery";
import { useCreateAppointment } from "../hooks/useCreateAppointment";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

const DoctorBookingComponent = ({ id }: { id: string }) => {
  const { data, isError } = useDoctorSlotQuery(id);
  const { mutate, isPending } = useCreateAppointment();
  const resData = data?.data.slots?? {};

  const router = useRouter();

  console.log(resData);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedType, setSelectedType] = useState<
    "in-clinic" | "online" | null
  >(null);
  console.log(selectedTime, selectedType, selectedDate);
  const firstDate = Object.keys(resData)[0] ?? null;
  const activeDate = selectedDate ?? firstDate;
  if (isError) return null;

  const doctor = data?.data.doctor

  // Generate week days starting from today
  const inClinicSlotsTimes =
    activeDate && resData[activeDate]?.clinic?.times
      ? resData[activeDate].clinic.times
      : [];

  const onlineSlotsTimes =
    activeDate && resData[activeDate]?.online?.times
      ? resData[activeDate].online.times
      : [];

  const handleBooking = () => {
    console.log(activeDate, selectedTime, selectedType)
    if (!activeDate || !selectedTime || !selectedType) return;

    mutate(
      {
        doctorId: id,
        startTime: selectedTime, // already ISO from backend
        consultationType: selectedType === "online" ? "ONLINE" : "CLINIC",
      },
      {
        onSuccess: (res) => {
          const appointmentId = res.appointmentId;
          console.log(res)
          toast.success("Appointment Created")
          // ✅ Redirect to payment page
          router.push(`/appointments/${appointmentId}/checkout`);
        },
        onError: (err) => {
          if(isAxiosError(err)) toast.error(err?.response?.data?.message || "Booking failed");
        },
      },
    );
  };

  const changeDate = (value: string) => {
    setSelectedDate(value);
    setSelectedTime("");
    setSelectedType(null);
  };

  return (
    <main className="min-h-screen text-black bg-slate-50">
      {/* Header - navigated via PatientHeader in layout */}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Doctor Profile Card - Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-slate-200 p-6 sticky top-24">
              {/* Doctor Image */}
              <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-4xl relative">
                {doctor?.fullName[0]}
                <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></span>
              </div>

              {/* Doctor Info */}
              <h2 className="text-xl font-bold text-slate-900 text-center">
                {doctor?.fullName}
              </h2>
              <p className="text-sm text-blue-600 text-center font-semibold mb-4">
                {doctor?.speciality}
              </p>

              {/* Rating
              <div className="flex items-center justify-center gap-1 mb-4">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-slate-900">
                  {doctor?.rating}
                </span>
                <span className="text-sm text-slate-600">
                  ({doctor?.reviews} Reviews)
                </span>
              </div> */}

              <div className="space-y-3 border-t border-slate-200 pt-4">
                {/* Experience */}
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-slate-600" />
                  <div>
                    <p className="text-xs text-slate-600 uppercase font-semibold">
                      Experience
                    </p>
                    <p className="text-sm font-semibold text-slate-900">
                      {doctor?.yearsOfExperience} Years
                    </p>
                  </div>
                </div>

                {/* Location */}
                {/* <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-slate-600" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {doctor?.location}
                    </p>
                    <p className="text-xs text-slate-600">
                      {doctor?.locationSubtext}
                    </p>
                  </div>
                </div> */}

                {/* Fee */}
                <div className="flex items-center gap-3">
                  <span className="text-lg text-slate-600">💵</span>
                  <div>
                    <p className="text-xs text-slate-600 uppercase font-semibold">
                      Consultation Fee
                    </p>
                    <p className="text-sm font-semibold text-slate-900">
                      ${doctor?.onlineFee} - ${doctor?.clinicFee}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Interface - Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* DATE */}
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="font-bold mb-4">Select Date</h3>

              <div className="grid grid-cols-4 gap-2">
                {Object.keys(resData).map((date) => (
                  <button
                    key={date}
                    onClick={() => changeDate(date)}
                    className={`p-2 rounded ${
                      activeDate === date
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>

            {/* CLINIC */}
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="font-bold mb-4">In-Clinic</h3>

              <div className="grid grid-cols-3 gap-2">
                {inClinicSlotsTimes.map((slot: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedTime(slot);
                      setSelectedType("in-clinic");
                    }}
                    className={`p-2 rounded border ${
                      activeDate === slot && selectedType === "in-clinic"
                        ? "bg-blue-600 text-white"
                        : "text-black"
                    }`}
                  >
                    {new Date(slot).toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                  </button>
                ))}
              </div>
            </div>

            {/* ONLINE */}
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="font-bold mb-4">Online</h3>

              <div className="grid grid-cols-3 gap-2">
                {onlineSlotsTimes.map((slot: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedTime(slot);
                      setSelectedType("online");
                    }}
                    className={`p-2 rounded border ${
                      selectedTime === slot && selectedType === "online"
                        ? "bg-blue-600 text-white"
                        : "text-black"
                    }`}
                  >
                    {new Date(slot).toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                  </button>
                ))}
              </div>
            </div>

            {/* BOOK */}
            {selectedTime && selectedType && activeDate && (
              <button
                onClick={handleBooking}
                className="bg-blue-600 text-white px-6 py-3 rounded"
              >
                Continue Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DoctorBookingComponent;
