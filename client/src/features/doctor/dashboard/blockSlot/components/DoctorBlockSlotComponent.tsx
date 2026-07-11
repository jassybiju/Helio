"use client";

import TableComponent from "@/src/components/TableComponent";
import { Lightbulb } from "lucide-react";
import React from "react";
import { useDoctorBlockSlot } from "../hooks/useDoctorBlockSlot";

const DoctorBlockSlotComponent = () => {
  const { register, errors, onSubmit, column, data } = useDoctorBlockSlot();
  console.log(errors);
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="grid grid-cols-3 gap-8">
        {/* Add New Slot Form */}
        <div className="bg-white col-span-1 rounded-lg border border-slate-200 p-8 space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl"> ➕ </span>
            <h2 className="text-2xl font-bold text-slate-900">
              Add New Block Slot
            </h2>
          </div>

          <div className="space-y-4">
            {/* Start and End Time */}
            <div>
              <div>
                <label className="text-sm font-semibold text-slate-900 mb-2 block">
                  Start Time
                </label>
                <input
                  type="datetime-local"
                  {...register("startTime")}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.startTime && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.startTime.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <div>
                <label className="text-sm font-semibold text-slate-900 mb-2 block">
                  End Time
                </label>
                <input
                  type="datetime-local"
                  {...register("endTime")}
                  className="w-full px-4 py-3    border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.endTime && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.endTime.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-900 mb-2 block">
                Reason
              </label>
              <input
                type="text"
                {...register("reason")}
                placeholder="Enter Reason"
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.reason && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.reason.message}
                </p>
              )}
            </div>

            {/* Create Button */}
            <button
              type="button"
              onClick={onSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg mt-6 flex items-center justify-center gap-2 transition-colors"
            >
              <span>+</span> Create Time Slot
            </button>
          </div>
        </div>

        {/* Existing Schedule */}
        <div className="space-y-6 col-span-2">
          <h2 className="text-2xl font-bold text-slate-900">
            Existing Schedule
          </h2>

          <div className="overflow-x-auto">
            {/* <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  {["Day", "Time Window", "Type", "Location", "Actions"].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {slots.map((slot) => (
                  <tr
                    key={slot.id}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      {slot.day}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">
                        {slot.startTime} - {slot.endTime}
                      </div>
                      <div className="text-xs text-slate-500">
                        {slot.duration} min intervals
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                          slot.type === "ONLINE"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {slot.type === "ONLINE" ? "📹" : "🏥"} {slot.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {slot.location}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleDeleteSlot(slot.id)}
                        className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> */}
            <TableComponent columns={column} data={data} />
          </div>

          {/* Pro Tip */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
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

export default DoctorBlockSlotComponent;
