"use client";
import { Trash2, Calendar, Lightbulb } from "lucide-react";
import React from "react";
import { useSetScheduleMutation } from "../hooks/useSetScheduleMutation";
import {
  DAY_OF_WEEK,
  SetDoctorScheduleFormData,
  setDoctorScheduleSchema,
} from "../../schemas/schedule.schema";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetScheduleQuery } from "../hooks/useGetScheduleQuery";
import { IGetDoctorScheduleDTO } from "../../../services/schedule.service";
import { useDeleteScheduleMutation } from "../hooks/useDeleteScheduleMutation";
import { useModal } from "@/src/hooks/useModal";
import { ConfirmModal } from "@/src/components/ConfirmModal";
import ClayWrapper from "@/src/components/ui/ClayWrapper";

const DoctorScheduleComponent = () => {
  const { mutate: setSchedule } = useSetScheduleMutation();
  const { data: schedulesData } = useGetScheduleQuery();
  const { mutate: deleteSchedule } = useDeleteScheduleMutation();
  const { open } = useModal();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<SetDoctorScheduleFormData>({
    resolver: zodResolver(setDoctorScheduleSchema),
    defaultValues: {
      dayOfWeek: [],
      startTime: "",
      endTime: "",
      consultationType: "ONLINE",
      location: "",
      slotIntervalInMinutes: 30,
      capacityPerSlot: 1,
    },
  });

  const watchType = useWatch({ control, name: "consultationType" });
  const watchDuration = useWatch({ control, name: "slotIntervalInMinutes" });

  const selectedDays = useWatch({ control, name: "dayOfWeek" });
  const groupedSchedules = Object.values(DAY_OF_WEEK).reduce(
    (acc, day) => {
      acc[day] =
        schedulesData?.data.filter((schedule) => schedule.dayOfWeek === day) ||
        [];

      return acc;
    },
    {} as Record<DAY_OF_WEEK, IGetDoctorScheduleDTO[]>,
  );
  const toggleDay = (day: DAY_OF_WEEK) => {
    if (selectedDays.includes(day)) {
      setValue(
        "dayOfWeek",
        selectedDays.filter((d) => d !== day),
      );
    } else {
      setValue("dayOfWeek", [...selectedDays, day]);
    }
  };

  const onSubmit = (formData: SetDoctorScheduleFormData) => {
    setSchedule(formData, {
      onSuccess: () => {
        // setSlots((prev) => [...prev, data]);
        reset();
      },
    });
  };
  // const daysOfWeek = [
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday",
  //   "Sunday",
  // ];

  const handleDeleteSlot = (id: string) => {
    open(ConfirmModal, {
      title: "Confirm Delete Schedule",
      message: "Are you sure you want to delete",
      onConfirm: () => deleteSchedule(id),
    });
  };

  // const column: ColumnType<IGetDoctorScheduleDTO> = [
  //   {
  //     key: "dayOfWeek",
  //     title: "Day",
  //     render: (value) => value,
  //   },
  //   {
  //     key: "startTime",
  //     title: "Time Window",
  //     render: (_value, row) => (
  //       <div>
  //         <div className="font-semibold text-slate-900">
  //           {row.startTime} - {row.endTime}
  //         </div>
  //         <div className="text-xs text-slate-500">
  //           {row.slotIntervalInMinutes} min intervals
  //         </div>
  //       </div>
  //     ),
  //   },
  //   {
  //     key: "consultationType",
  //     title: "Type",
  //     render: (_value, row) => (
  //       <span
  //         className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
  //           row.consultationType === "ONLINE"
  //             ? "bg-blue-100 text-blue-700"
  //             : "bg-purple-100 text-purple-700"
  //         }`}
  //       >
  //         {row.consultationType === "ONLINE" ? "📹" : "🏥"}{" "}
  //         {row.consultationType}
  //       </span>
  //     ),
  //   },
  //   {
  //     key: "location",
  //     title: "Location",
  //     render: (_value, row) => (
  //       <span className="text-slate-600">
  //         {row.location !== "" ? row.location : "—"}
  //       </span>
  //     ),
  //   },
  //   {
  //     key: "id",
  //     title: "Actions",
  //     render: (_value, row) => (
  //       <button
  //         onClick={() => handleDeleteSlot(row.id)}
  //         className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
  //       >
  //         <Trash2 className="w-5 h-5" />
  //       </button>
  //     ),
  //   },
  // ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3">
        {" "}
        <Calendar className="w-6 h-6 text-blue-600" />
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Weekly Summary
        </h1>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        {" "}
        {/* Add New Slot Form */}
        <div className="bg-white xl:col-span-1 rounded-xl border border-slate-200 p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">➕</span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Add New Slot
            </h2>
          </div>

          <div className="space-y-4">
            {/* Day of Week */}
            <div>
              <label className="text-sm font-semibold text-slate-900 mb-2 block">
                Day of Week
              </label>
              {/* <select
                {...register("dayOfWeek")}
                className="w-full px-4 py-3 border text-black border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.values(DAY_OF_WEEK).map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select> */}
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {" "}
                {Object.values(DAY_OF_WEEK).map((day) => {
                  const isSelected = selectedDays.includes(day);

                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={` h-12 rounded-xl border text-sm
font-semibold
transition-all
duration-200
${
  isSelected
    ? "bg-blue-600 text-white border-blue-600 shadow-md"
    : "bg-white text-slate-700 border-slate-200 hover:bg-blue-50"
}
`}
                    >
                      <div className="text-base">{day.slice(0, 3)}</div>
                      <div className="text-[10px] opacity-80"></div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Start and End Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-slate-900 mb-2 block">
                  Start Time
                </label>
                <input
                  type="time"
                  {...register("startTime")}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.startTime && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.startTime.message}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-900 mb-2 block">
                  End Time
                </label>
                <input
                  type="time"
                  {...register("endTime")}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.endTime && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.endTime.message}
                  </p>
                )}
              </div>
            </div>

            {/* Consultation Type */}
            <div>
              <label className="text-sm font-semibold text-slate-900 mb-3 block">
                Consultation Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setValue("consultationType", "ONLINE")}
                  className={`py-3 px-4 rounded-lg border-2 font-semibold transition-colors ${
                    watchType === "ONLINE"
                      ? "border-blue-600 bg-blue-50 text-blue-600"
                      : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <span className="text-xl mr-1">📹</span> Online
                </button>
                <button
                  type="button"
                  onClick={() => setValue("consultationType", "CLINIC")}
                  className={`py-3 px-4 rounded-lg border-2 font-semibold transition-colors ${
                    watchType === "CLINIC"
                      ? "border-blue-600 bg-blue-50 text-blue-600"
                      : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <span className="text-xl mr-1">🏥</span> In-Clinic
                </button>
              </div>
            </div>

            {/* Slot Duration */}
            <div>
              <label className="text-sm font-semibold text-slate-900 mb-3 block">
                Slot Duration (min)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[15, 30, 45, 60].map((duration) => (
                  <button
                    type="button"
                    key={duration}
                    onClick={() => setValue("slotIntervalInMinutes", duration)}
                    className={`py-3 font-semibold rounded-lg border-2 transition-colors ${
                      watchDuration === duration
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    {duration}
                  </button>
                ))}
              </div>
              <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <input
                  min={5}
                  placeholder="Custom"
                  value={
                    [15, 30, 45, 60].includes(watchDuration)
                      ? ""
                      : watchDuration
                  }
                  onChange={(e) =>
                    setValue("slotIntervalInMinutes", Number(e.target.value))
                  }
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-500 whitespace-nowrap">
                  min
                </span>
              </div>
              {errors.slotIntervalInMinutes && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.slotIntervalInMinutes.message}
                </p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="text-sm font-semibold text-slate-900 mb-2 block">
                Location / Clinic
              </label>
              <input
                type="text"
                {...register("location")}
                placeholder="Enter clinic room or link"
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.location && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* Capacity */}
            <div>
              <label className="text-sm font-semibold text-slate-900 mb-2 block">
                Capacity Per Slot
              </label>
              <input
                type="number"
                {...register("capacityPerSlot", { valueAsNumber: true })}
                min={1}
                max={10}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.capacityPerSlot && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.capacityPerSlot.message}
                </p>
              )}
            </div>

            {/* Create Button */}
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg mt-6 flex items-center justify-center gap-2 transition-colors"
            >
              <span>+</span> Create Time Slot
            </button>
          </div>
        </div>
        {/* Existing Schedule */}
        <div className="space-y-6 xl:col-span-2 min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Existing Schedule
          </h2>

          <div className="w-full max-h-[75vh] overflow-y-auto rounded-xl border border-slate-200 p-3 sm:p-5">
            <div className="space-y-6 ">
              {Object.values(DAY_OF_WEEK).map((day) => {
                const schedules = groupedSchedules[day];

                return (
                  <ClayWrapper
                    variant="secondary"
                    key={day}
                    className="bg-white rounded-xl border border-slate-200 overflow-hidden p-0!"
                  >
                    {/* Day Header */}
                    <div className="flex items-center justify-between px-5 py-4 bg-slate-50 border-b">
                      <div>
                        <h3 className="font-bold text-lg text-slate-900">
                          {day}
                        </h3>

                        <p className="text-sm text-slate-500">
                          {schedules.length === 0
                            ? "No schedules"
                            : `${schedules.length} time slot${
                                schedules.length > 1 ? "s" : ""
                              }`}
                        </p>
                      </div>
                    </div>

                    {/* Slots */}
                    <div className="p-5 space-y-3">
                      {schedules.length === 0 ? (
                        <div className="text-sm text-slate-400 italic py-3">
                          No availability added
                        </div>
                      ) : (
                        schedules.map((slot) => (
                          <div
                            key={slot.id}
                            className="
 rounded-xl
 border
 border-slate-200
 p-4
 sm:p-5
 space-y-4
 hover:shadow-md
 transition
 "
                          >
                            {/* Time */}
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="font-semibold text-slate-900 text-base sm:text-lg">
                                  {slot.startTime} - {slot.endTime}
                                </p>

                                <p className="text-sm text-slate-500">
                                  ⏱ {slot.slotIntervalInMinutes} min intervals
                                </p>
                              </div>

                              <button
                                onClick={() => handleDeleteSlot(slot.id)}
                                className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>

                            {/* Details */}
                            <div className="flex flex-wrap gap-2 w-full">
                              {" "}
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  slot.consultationType === "ONLINE"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-purple-100 text-purple-700"
                                }`}
                              >
                                {slot.consultationType === "ONLINE"
                                  ? "📹 Online"
                                  : "🏥 Clinic"}
                              </span>
                              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                                👥 {slot.capacityPerSlot}/slot
                              </span>
                              {slot.location && (
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                                  📍 {slot.location}
                                </span>
                              )}
                            </div>

                            {/* Delete */}
                            <button
                              onClick={() => handleDeleteSlot(slot.id)}
                              className="self-end sm:self-center p-2 rounded-lg text-red-600 hover:bg-red-50 transition"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </ClayWrapper>
                );
              })}
            </div>
            {/* <TableComponent columns={column} data={schedulesData?.data} /> */}
          </div>

          {/* Pro Tip */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col sm:flex-row gap-3">
            {" "}
            <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-900">Pro Tip</p>
              <p className="text-sm text-slate-700">
                Patients can only book slots that are enabled. Disabling a slot
                will prevent new bookings but keep existing ones.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorScheduleComponent;
