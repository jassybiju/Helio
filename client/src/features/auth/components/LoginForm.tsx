"use client";

import React from "react";
import { useLogin } from "../hooks/useLogin";
import Input from "@/src/components/ui/Input";
import ClayButton from "@/src/components/ui/ClayButton";
import Link from "next/link";
import LoginByGoogleComponent from "@/src/layout/LoginByGoogleComponent";
import { GoogleLoginFn, LoginFn } from "../types/auth.types";

type PropType = {
  login: LoginFn;
  googleLogin?: GoogleLoginFn;
};

const LoginForm = ({ login, googleLogin }: PropType) => {
  const { handleSubmit, register, errors, isSubmitting } = useLogin({ login });
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

        {/* Password Fields */}
        <div>
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
            {isSubmitting ? "Logging In..." : "Login"}
          </ClayButton>
        </div>
      </form>

      <Link href={"/forget-password"} className="text-red-500 mt-10 m-2">
        Forget Password?
      </Link>
      {/* Social Login Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-slate-500">Or join with</span>
        </div>
        {googleLogin && (
          <LoginByGoogleComponent
            googleLogin={googleLogin}
          ></LoginByGoogleComponent>
        )}
      </div>

      {/* Social Login Icons */}
     
    </>
  );
};

export default LoginForm;
