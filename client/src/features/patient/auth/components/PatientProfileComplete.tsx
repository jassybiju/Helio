"use client";

import React from "react";
import { usePatientCompleteProfile } from "../hooks/usePatientCompleteProfile";
import Input from "@/src/components/ui/Input";
import ClayButton from "@/src/components/ui/ClayButton";
import DOBPicker from "@/src/components/ui/DOBPicker";

const PatientProfileComplete = () => {
  const { errors, setValue, onSubmit, register, isSubmitting, dobValue } =
    usePatientCompleteProfile();
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Success */}

      {/* Error */}
      {errors.root && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 font-medium">{errors.root.message}</p>
        </div>
      )}

      {/* Speciality */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Gender
          </label>
          <select
            {...register("gender")}
            className={`w-full px-4 py-3 border text-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 ${
              errors.gender ? "border-red-500" : "border-slate-200"
            }`}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-600 text-sm mt-1">{errors.gender.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            DOB
          </label>
          <DOBPicker
            value={dobValue}
            onChange={(date) => setValue("dob", date)}
          />
          {errors.dob && (
            <p className="text-red-600 text-sm mt-1">{errors.dob.message}</p>
          )}
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-900 mb-2">
          Phone Number
        </label>
        <Input
          type="tel"
          placeholder="+1 (555) 000-0000"
          {...register("phone")}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 ${
            errors.phone ? "border-red-500" : "border-slate-200"
          }`}
        />
        {errors.phone && (
          <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>

      {/* Submit */}
      <ClayButton type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Creating Account..." : "Complete Patientma Account"}
      </ClayButton>
    </form>
  );
};

export default PatientProfileComplete;
