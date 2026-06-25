"use client";

import { Clock } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { useDoctorSlotQuery } from "../hooks/useDoctorSlotQuery";
import { useCreateAppointment } from "../hooks/useCreateAppointment";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { ReviewsSection } from "./ReviewsSection";
import { AddReview } from "./AddReview";

const mockReviews = {
  "1": [
    {
      id: "1",
      author: "John Smith",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Great doctor! Very attentive and took time to understand my concerns. Highly recommended!",
      avatar: "JS",
    },
    {
      id: "2",
      author: "Emily Johnson",
      rating: 4,
      date: "1 month ago",
      comment:
        "Good consultation. Dr. Chen was professional and provided clear guidance on my treatment.",
      avatar: "EJ",
    },
    {
      id: "3",
      author: "Michael Rodriguez",
      rating: 5,
      date: "1 month ago",
      comment:
        "Excellent care and very personable. Definitely coming back for follow-ups!",
      avatar: "MR",
    },
  ],
  "2": [
    {
      id: "1",
      author: "Lisa Chen",
      rating: 5,
      date: "3 weeks ago",
      comment:
        "Dr. Miller is amazing! She solved my skin issue completely. Very professional.",
      avatar: "LC",
    },
    {
      id: "2",
      author: "Amanda White",
      rating: 4,
      date: "2 months ago",
      comment:
        "Good treatment and helpful advice. Saw improvement in a few weeks.",
      avatar: "AW",
    },
  ],
  "3": [
    {
      id: "1",
      author: "Robert Taylor",
      rating: 5,
      date: "1 week ago",
      comment:
        "Dr. Wilson is an excellent cardiologist. Very knowledgeable and caring. Trust him completely.",
      avatar: "RT",
    },
    {
      id: "2",
      author: "Patricia Lee",
      rating: 5,
      date: "3 weeks ago",
      comment:
        "Outstanding doctor. My heart condition has improved significantly under his care.",
      avatar: "PL",
    },
    {
      id: "3",
      author: "James Brown",
      rating: 4,
      date: "1 month ago",
      comment:
        "Professional and thorough. Explained everything clearly. Very satisfied.",
      avatar: "JB",
    },
  ],
};

const DoctorBookingComponent = ({ id }: { id: string }) => {
  const { data, isError } = useDoctorSlotQuery(id);
  const { mutate } = useCreateAppointment();
  const resData = data?.data.slots ?? {};

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

  const doctor = data?.data.doctor;

  // Generate week days starting from today
  const inClinicSlots = activeDate
    ? (resData[activeDate]?.clinic?.slots ?? [])
    : [];

  const onlineSlots = activeDate
    ? (resData[activeDate]?.online?.slots ?? [])
    : [];

  const handleBooking = () => {
    console.log(activeDate, selectedTime, selectedType);
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
          console.log(res);
          toast.success("Appointment Created");
          // ✅ Redirect to payment page
          router.push(`/appointments/${appointmentId}/checkout`);
        },
        onError: (err) => {
          if (isAxiosError(err))
            toast.error(err?.response?.data?.message || "Booking failed");
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
                {inClinicSlots.map((slot, i: number) => (
                  <button
                    key={i}
                    disabled={slot.status !== "AVAILABLE"}
                    onClick={() => {
                      if (slot.status !== "AVAILABLE") return;

                      setSelectedTime(slot.time);
                      setSelectedType("in-clinic");
                    }}
                    className={`p-2 rounded border transition ${
                      selectedTime === slot.time && selectedType === "in-clinic"
                        ? "bg-blue-600 text-white"
                        : slot.status === "AVAILABLE"
                          ? "bg-green-100 text-black"
                          : slot.status === "BOOKED"
                            ? "bg-red-200 text-red-800 cursor-not-allowed"
                            : "bg-gray-300 text-gray-700 cursor-not-allowed"
                    }`}
                  >
                    {new Date(slot.time).toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </button>
                ))}
              </div>
            </div>

            {/* ONLINE */}
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="font-bold mb-4">Online</h3>
              <div className="grid grid-cols-3 gap-2">
                {onlineSlots.map((slot, i: number) => (
                  <button
                    key={i}
                    disabled={slot.status !== "AVAILABLE"}
                    onClick={() => {
                      if (slot.status !== "AVAILABLE") return;

                      setSelectedTime(slot.time);
                      setSelectedType("online");
                    }}
                    className={`p-2 rounded border transition ${
                      selectedTime === slot.time && selectedType === "online"
                        ? "bg-blue-600 text-white"
                        : slot.status === "AVAILABLE"
                          ? "bg-green-100 text-black"
                          : slot.status === "BOOKED"
                            ? "bg-red-200 text-red-800 cursor-not-allowed"
                            : "bg-gray-300 text-gray-700 cursor-not-allowed"
                    }`}
                  >
                    {new Date(slot.time).toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
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
        {doctor && (
          <>
            <AddReview doctorId={doctor?.doctorId} />
            <div className="mt-12">
              <ReviewsSection
                doctorName={doctor.name}
                doctorRole={doctor.role}
                averageRating={20}
                totalReviews={doctor.totalReviews}
                reviews={mockReviews["2"]}
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default DoctorBookingComponent;
