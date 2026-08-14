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
import Image from "next/image";

const DoctorBookingComponent = ({ id }: { id: string }) => {
  const [page, setPage] = useState(1);
  const LIMIT = 1;
  const { data, isError } = useDoctorSlotQuery(id, page, LIMIT);
  const { mutate } = useCreateAppointment();
  const resData = data?.data.slots ?? {};

  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedType, setSelectedType] = useState<
    "in-clinic" | "online" | null
  >(null);
  const firstDate = Object.keys(resData)[0] ?? null;
  const activeDate = selectedDate ?? firstDate;
  if (isError) return null;

  const doctor = data?.data.doctor;
  const reviews = data?.data.reviews;
  const totalReviews =
    data?.data.totalCount.reduce((acc, cur) => acc + cur, 0) ?? 0;
  const sumReview =
    data?.data.totalCount.reduce((acc, cur, i) => acc + cur * (i + 1), 0) ?? 0;
  const avgRatings = totalReviews > 0 ? sumReview / totalReviews : 0;
  const totalPages = Math.ceil(totalReviews! / LIMIT);
  // Generate week days starting from today
  const inClinicSlots = activeDate
    ? (resData[activeDate]?.clinic?.slots ?? [])
    : [];

  const onlineSlots = activeDate
    ? (resData[activeDate]?.online?.slots ?? [])
    : [];

  const handleBooking = () => {
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Doctor Profile Card - Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-slate-200 p-4 sm:p-6 lg:sticky lg:top-24">
              {" "}
              {/* Doctor Image */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 mx-auto  mb-4  bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-3xl sm:text-4xl relative">
                <div className=" relative w-full h-full overflow-hidden rounded-full flex items-center justify-center">
                  {doctor?.profilePic ? (
                    <Image
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="100vw"
                      className="w-full h-full"
                      src={doctor.profilePic}
                      alt=""
                    />
                  ) : (
                    doctor?.fullName[0]
                  )}
                </div>
                {/* <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></span> */}
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
                      ₹{doctor?.onlineFee} - ₹{doctor?.clinicFee}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Interface - Main Content */}
          <div className="lg:col-span-3  space-y-4 md:space-y-6">
            {/* DATE */}
            <div className="bg-white p-4 sm:p-6 rounded-lg border">
              {" "}
              <h3 className="font-bold mb-4">Select Date</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {" "}
                {Object.keys(resData).map((date) => (
                  <button
                    key={date}
                    onClick={() => changeDate(date)}
                    className={`min-w-[100px] text-nowrap flex-shrink-0  p-2 rounded ${
                      activeDate === date
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {new Date(date).toLocaleDateString("en-IN", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    })}{" "}
                  </button>
                ))}
              </div>
            </div>

            {/* CLINIC */}
            <div className="bg-white p-6 text-nowrap rounded-lg border">
              <h3 className="font-bold mb-4">In-Clinic</h3>
              {inClinicSlots.length !== 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {inClinicSlots?.map((slot, i: number) => (
                    <button
                      key={i}
                      disabled={slot.status !== "AVAILABLE"}
                      onClick={() => {
                        if (slot.status !== "AVAILABLE") return;

                        setSelectedTime(slot.time);
                        setSelectedType("in-clinic");
                      }}
                      className={`p-2 rounded border transition ${
                        selectedTime === slot.time &&
                        selectedType === "in-clinic"
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
              ) : (
                "No Slots Available"
              )}
            </div>

            {/* ONLINE */}
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="font-bold mb-4">Online</h3>
              {onlineSlots.length !== 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
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
              ) : (
                "No Slots Available"
              )}
            </div>

            {/* BOOK */}
            {selectedTime && selectedType && activeDate && (
              <button
                onClick={handleBooking}
                className="w-full mb-4 sm:w-auto bg-blue-600 text-white px-6 py-3 rounded"
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
                totalReviewCount={data.data.totalCount}
                averageRating={avgRatings}
                totalReviews={totalReviews}
                reviews={reviews!}
                onPageChange={(page) => setPage(page)}
                currentPage={page}
                totalPage={totalPages}
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default DoctorBookingComponent;
