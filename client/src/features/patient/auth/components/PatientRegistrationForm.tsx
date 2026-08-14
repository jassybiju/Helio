"use client";
import React, { useState } from "react";
import { usePatientRegistration } from "../hooks/usePatientRegisteration";
import Input from "@/src/components/ui/Input";
import DOBPicker from "@/src/components/ui/DOBPicker";
import ClayButton from "@/src/components/ui/ClayButton";
import { Eye, EyeOff } from "lucide-react";

const PatientRegistrationForm = () => {
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
  });
  const {
    register,
    onSubmit,
    errors,
    dobValue,
    setValue,
    isSubmitting,
    submitError,
    submitSuccess,
  } = usePatientRegistration();

  return (
    <>
      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Success Message */}
        {submitSuccess && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium">
              Registration successful! Redirecting...
            </p>
          </div>
        )}

        {/* Error Message */}
        {submitError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 font-medium">{submitError}</p>
          </div>
        )}

        {/* First Name & Last name */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              First Name
            </label>
            <Input
              type="text"
              placeholder="Dr. Jane Doe"
              {...register("first_name")}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 ${
                errors.first_name ? "border-red-500" : "border-slate-200"
              }`}
            />
            {errors.first_name && (
              <p className="text-red-600 text-sm mt-1">
                {errors.first_name.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Last Name
            </label>
            <Input
              type="text"
              placeholder="Dr. Jane Doe"
              {...register("last_name")}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 ${
                errors.first_name ? "border-red-500" : "border-slate-200"
              }`}
            />
            {errors.first_name && (
              <p className="text-red-600 text-sm mt-1">
                {errors.first_name.message}
              </p>
            )}
          </div>
        </div>

        {/* Gender and DOB */}
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
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-600 text-sm mt-1">
                {errors.gender.message}
              </p>
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

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Email
          </label>
          <Input
            type="email"
            placeholder="doctor@helixo.com"
            {...register("email")}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 ${
              errors.email ? "border-red-500" : "border-slate-200"
            }`}
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone Number */}
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

        {/* Password Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative mt-2">
            <label className="block text-sm font-semibold text-slate-900 mb-2">
               Password
            </label>
            <div className="relative">
            <Input
              {...register("password")}
              type={showPasswords.current ? "text" : "password"}
              placeholder="••••••••"
              className={`w-full px-4 py-3 border rounded-lg ${
                errors.password ? "border-red-500" : "border-slate-200"
              }`}
            />

            <button
              type="button"
              onClick={() =>
                setShowPasswords((prev) => ({
                  ...prev,
                  current: !prev.current,
                }))
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
            >
              {showPasswords.current ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
            </div>
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
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        {/* Create Account Button */}
        <div className="mt-8">
          <ClayButton
            variant="primary"
            size="lg"
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </ClayButton>
        </div>
      </form>


     
    </>
  );
};

export default PatientRegistrationForm;
