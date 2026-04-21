"use client";

import ClayButton from "@/src/components/ui/ClayButton";
import Input from "@/src/components/ui/Input";
import React from "react";
import { useDoctorRegistration } from "../hooks/useDoctorRegistration";
import DoctorFileUpload from "./DoctorFileUpload";

const DoctorRegistrationForm = () => {
  const {
    register,
    onSubmit,
    errors,
    isSubmitting,
    submitError,
    submitSuccess,
  } = useDoctorRegistration();
  return (
    <>
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Success */}
        {submitSuccess && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium">
              Registration successful! Redirecting...
            </p>
          </div>
        )}

        {/* Error */}
        {submitError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 font-medium">{submitError}</p>
          </div>
        )}

        {/* Full Name */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Full Name
          </label>
          <Input
            type="text"
            placeholder="Dr. John Doe"
            {...register("full_name")}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 ${
              errors.full_name ? "border-red-500" : "border-slate-200"
            }`}
          />
          {errors.full_name && (
            <p className="text-red-600 text-sm mt-1">
              {errors.full_name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Email
          </label>
          <Input
            type="email"
            placeholder="doctor@clinic.com"
            {...register("email")}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 ${
              errors.email ? "border-red-500" : "border-slate-200"
            }`}
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
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
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Specialization
          </label>
          <Input
            type="text"
            placeholder="Cardiologist"
            {...register("specialization")}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 ${
              errors.specialization ? "border-red-500" : "border-slate-200"
            }`}
          />
          {errors.specialization && (
            <p className="text-red-600 text-sm mt-1">
              {errors.specialization.message}
            </p>
          )}
        </div>

        {/* Career Start Year */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Career Start Year
          </label>
          <Input
            type="number"
            placeholder="2015"
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

        {/* Password */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Password
          </label>
          <Input
            type="password"
            placeholder="••••••••"
            {...register("password")}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 ${
              errors.password ? "border-red-500" : "border-slate-200"
            }`}
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Confirm Password
          </label>
          <Input
            type="password"
            placeholder="••••••••"
            {...register("confirmPassword")}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 ${
              errors.confirmPassword ? "border-red-500" : "border-slate-200"
            }`}
          />
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm mt-1">
              {errors?.confirmPassword?.message}
            </p>
          )}
        </div>
        {/* Submit */}
        <ClayButton type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating Account..." : "Create Doctor Account"}
        </ClayButton>
      </form>
    </>
  );
};

export default DoctorRegistrationForm;
