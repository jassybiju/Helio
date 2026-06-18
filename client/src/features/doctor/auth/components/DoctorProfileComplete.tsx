"use client";

import React from "react";
import { useDoctorCompleteProfile } from "../hooks/useDoctorCompleteProfile";
import Input from "@/src/components/ui/Input";
import DoctorFileUpload from "./DoctorFileUpload";
import ClayButton from "@/src/components/ui/ClayButton";

const DoctorProfileComplete = () => {
  const { register, onSubmit, errors, isSubmitting, specialities } =
    useDoctorCompleteProfile();
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
      <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Specialization
          </label>
          <select
            {...register("specialization")}
            className={`w-full px-4 py-3 border text-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 ${
              errors.specialization ? "border-red-500" : "border-slate-200"
            }`}
          >
            <option value="">Select Specialization</option>
            {specialities?.data?.specialty?.map(x => (<option key={x.value} value={x.value}>
              {x.label}
            </option>))}
          </select>
          {errors.specialization && (
            <p className="text-red-600 text-sm mt-1">
              {errors.specialization.message}
            </p>
          )}
        </div>

      {/* Carrer Start Year */}
      <div>
        <label className="block text-sm font-semibold text-slate-900 mb-2">
          Carrer Start Yoer
        </label>
        <Input
          type="text"
          placeholder="2000"
          {...register("career_start_year")}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 ${
            errors.career_start_year ? "border-red-500" : "border-slate-200"
          }`}
        />
        {errors.career_start_year && (
          <p className="text-red-600 text-sm mt-1">
            {errors.career_start_year.message}
          </p>
        )}
      </div>

      {/* Gender */}

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
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && (
          <p className="text-red-600 text-sm mt-1">{errors.gender.message}</p>
        )}
      </div>
      {/* Specialization */}

      {/* Document Upload */}
      <div>
        <label className="block text-sm font-semibold text-slate-900 mb-2">
          Upload License / Certificate
        </label>
        <DoctorFileUpload register={register("document")} />

        {errors.document && (
          <p className="text-red-600 text-sm mt-1">
            {errors.document.message as string}
          </p>
        )}
      </div>

      {/* Submit */}
      <ClayButton type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Creating Account..." : "Create Doctor Account"}
      </ClayButton>
    </form>
  );
};

export default DoctorProfileComplete;
