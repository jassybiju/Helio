"use client";

import TableComponent from "@/src/components/TableComponent";
import { Lightbulb } from "lucide-react";
import React from "react";
import { useDoctorBlockSlot } from "../hooks/useDoctorBlockSlot";

const DoctorBlockSlotComponent = () => {
  const { register, errors, onSubmit, column, data } = useDoctorBlockSlot();
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        {/* Add New Slot Form */}
        <div className="bg-white xl:col-span-1 rounded-xl border border-slate-200 p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl"> ➕ </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Add New Block Slot
            </h2>
          </div>

          <div className="space-y-5">
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
                  className="
w-full
px-4
py-3
text-sm
sm:text-base
border
border-slate-200
rounded-lg
focus:outline-none
focus:ring-2
focus:ring-blue-500
"
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
              className="
w-full
bg-blue-600
hover:bg-blue-700
text-white
font-semibold
py-3
px-4
rounded-lg
mt-6
flex
items-center
justify-center
gap-2
transition-colors
"
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

          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <div className="min-w-[700px]">
                <TableComponent columns={column} data={data} />
              </div>
            </div>
          </div>

          {/* Pro Tip */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col sm:flex-row gap-3">
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
