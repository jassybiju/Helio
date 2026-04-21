import ClayButton from "@/src/components/ui/ClayButton";
import Input from "@/src/components/ui/Input";
import React from "react";
import { useForgetPassword } from "../hooks/useForgetPassword";

const ForgetPasswordForm = ({
  forgetPassword,
}: {
  forgetPassword: ({ email }: { email: string }) => Promise<unknown>;
}) => {
  const { handleSubmit, errors, register, isSubmitting } = useForgetPassword({
    forgetPassword,
  });
  return (
    <>
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Success Message */}
        {/* {submitSuccess && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium">
              Registration successful! Redirecting...
            </p>
          </div>
        )}

        {/* Error Message */}
        {errors.root && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 font-medium">{errors.root.message}</p>
          </div>
        )}

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Email
          </label>
          <Input
            type="email"
            placeholder="doctor@stitch.com"
            {...register("email")}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 ${
              errors.email ? "border-red-500" : "border-slate-200"
            }`}
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
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
            {isSubmitting ? "Requesting..." : "Request Reset Link"}
          </ClayButton>
        </div>
      </form>
    </>
  );
};

export default ForgetPasswordForm;
