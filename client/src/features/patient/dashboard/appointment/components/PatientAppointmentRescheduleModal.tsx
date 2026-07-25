"use client";

import React, { useMemo, useState } from "react";
import { Calendar, Clock, Stethoscope, AlertTriangle, X } from "lucide-react";

import { ModalProps } from "@/src/layout/ModalProvider";
import { useGetPatientRescheduleSlotsQuery } from "../hooks/useGetPatientRescheduleSlotsQuery";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { UseMutateFunction } from "@tanstack/react-query";
import { APIResponse } from "@/src/types/API.types";

const PatientAppointmentRescheduleModal = ({
  close,
  appointmentId,
  rescheduleAppointment,
}: ModalProps & {
  appointmentId: string;
  rescheduleAppointment: UseMutateFunction<APIResponse<unknown>, unknown, {consultationType : "ONLINE" | "CLINIC", startTime : string}, unknown>
}) => {
  const { data, isLoading } = useGetPatientRescheduleSlotsQuery(appointmentId);

  const doctor = data?.data?.doctor;
  const slotsData = useMemo(
  () => data?.data.slots ?? [],
  [data?.data.slots]
);

  const [selectedType, setSelectedType] = useState<"online" | "clinic" | null>(
    null,
  );

  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const [selectedSlot, setSelectedSlot] = useState<{
    time: string;
    status: string;
  } | null>(null);

  const availableDates = useMemo(() => {
    if (!selectedType) return [];

    return Object.entries(slotsData)
      .filter(([_, day]) => {
        const slots =
          selectedType === "online" ? day.online.slots : day.clinic.slots;

        return slots.some((s) => s.status === "AVAILABLE");
      })
      .map(([date]) => date);
  }, [slotsData, selectedType]);

  const activeDate = selectedDate ?? availableDates[0];

  const availableSlots = useMemo(() => {
    if (!activeDate || !selectedType) return [];

    const day = slotsData[activeDate];

    if (!day) return [];

    const slots =
      selectedType === "online" ? day.online.slots : day.clinic.slots;

    return slots.filter((slot) => slot.status === "AVAILABLE");
  }, [slotsData, activeDate, selectedType]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (iso: string) => {
    return new Date(iso).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleTypeSelect = (type: "online" | "clinic") => {
    setSelectedType(type);
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  const handleConfirm = () => {
    if (!selectedSlot || !selectedType) return;


    toast.success("HIHDSOF");
    rescheduleAppointment(
      {
        consultationType: selectedType === "online" ? "ONLINE" : "CLINIC",
        startTime: selectedSlot.time,
      },
      {
        onSuccess() {
          toast.success("Appointment Created Successfully");
          close();
        },
        onError(error) {
          if (isAxiosError(error)) {
            toast.error(error.response?.data.message);
          }
        },
      },
    );
    // mutation here
  };

  if (isLoading) {
    return <div className="bg-white rounded-xl p-8">Loading slots...</div>;
  }

  return (
    <div className="w-full max-w-5xl rounded-xl bg-white shadow-xl">
      {/* Header */}
      <div className="border-b p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Reschedule Appointment
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              Choose a new appointment slot.
            </p>
          </div>

          <button onClick={close} className="rounded-lg p-2 hover:bg-slate-100">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Warning */}
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <div className="flex gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />

            <div>
              <h3 className="font-semibold text-amber-900">
                Doctor requested cancellation
              </h3>

              <p className="mt-1 text-sm text-amber-700">
                Your doctor is unavailable for the scheduled appointment. Please
                choose a new slot to continue your consultation.
              </p>
            </div>
          </div>
        </div>

        {/* Doctor Card */}
        <div className="rounded-xl border bg-slate-50 p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-600 text-lg font-bold text-white">
              {doctor?.name?.charAt(0)}
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">{doctor?.name}</h3>

              <div className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                <Stethoscope className="h-4 w-4" />
                {doctor?.specialty}
              </div>

              <p className="mt-1 text-xs text-slate-500">
                Doctor ID: {doctor?.id}
              </p>
            </div>
          </div>
        </div>

        {/* Consultation Type */}
        <div>
          <h3 className="mb-3 font-semibold text-slate-900">
            Consultation Type
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleTypeSelect("online")}
              className={`rounded-xl border-2 p-4 font-semibold transition ${
                selectedType === "online"
                  ? "border-teal-500 bg-teal-50 text-teal-700"
                  : "border-slate-200"
              }`}
            >
              Online
            </button>

            <button
              onClick={() => handleTypeSelect("clinic")}
              className={`rounded-xl border-2 p-4 font-semibold transition ${
                selectedType === "clinic"
                  ? "border-teal-500 bg-teal-50 text-teal-700"
                  : "border-slate-200"
              }`}
            >
              Clinic Visit
            </button>
          </div>
        </div>

        {/* Dates */}
        {selectedType && (
          <div>
            <h3 className="mb-3 font-semibold text-slate-900">
              Available Dates
            </h3>

            <div className="flex flex-wrap gap-2">
              {availableDates.map((date) => (
                <button
                  key={date}
                  onClick={() => handleDateSelect(date)}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
                    activeDate === date
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {formatDate(date)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Slots */}
        {selectedType && activeDate && (
          <div>
            <h3 className="mb-3 font-semibold text-slate-900">
              Available Time Slots
            </h3>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {availableSlots.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => setSelectedSlot(slot)}
                  className={`rounded-lg border p-3 text-sm font-medium transition ${
                    selectedSlot?.time === slot.time
                      ? "border-teal-500 bg-teal-100 text-teal-800"
                      : "border-slate-200 hover:border-teal-300"
                  }`}
                >
                  {formatTime(slot.time)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Summary */}
        {selectedSlot && (
          <div className="rounded-xl border border-teal-200 bg-teal-50 p-4">
            <h4 className="font-semibold text-teal-900">New Appointment</h4>

            <div className="mt-2 flex flex-wrap gap-4 text-sm text-teal-800">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(activeDate!)}
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {formatTime(selectedSlot.time)}
              </div>

              <div>
                {selectedType === "online"
                  ? "Online Consultation"
                  : "Clinic Visit"}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="flex justify-end gap-3 border-t p-6">
        <button
          onClick={close}
          className="rounded-lg border px-5 py-2 font-medium"
        >
          Close
        </button>

        <button
          disabled={!selectedSlot}
          onClick={handleConfirm}
          className="rounded-lg bg-teal-600 px-5 py-2 font-medium text-white hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Confirm Reschedule
        </button>
      </div>
    </div>
  );
};

export default PatientAppointmentRescheduleModal;
