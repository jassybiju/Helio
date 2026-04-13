"use client";

import LoginForm from "@/src/features/auth/components/LoginForm";
import React from "react";
import { authService } from "../../services/auth.service";
import { useRouter } from "next/navigation";
import { GoogleLoginFn } from "@/src/features/auth/types/auth.types";
import { invalidateQuery } from "@/src/libs/queryClient";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

const PatientLoginForm = () => {
  const router = useRouter();

  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    await authService.login({ email, password });
    router.push("/dashboard");
  };

  const handleGoogleLogin: GoogleLoginFn = async (credential: string) => {
    try {
      const response = await authService.googleLogin({
        credential: credential!,
      });
      invalidateQuery("me");
      console.log(response.data.isProfileComplete);
      if (!response.data.isProfileComplete) {
        router.replace("/profile-complete");
      } else {
        router.replace("/");
      }
    } catch (error) {
      if(isAxiosError(error)){

        toast.error(error.response?.data.message)
        return
      }
      toast.error("Error when logging in")
    }
  };
  return <LoginForm login={handleLogin} googleLogin={handleGoogleLogin} />;
};

export default PatientLoginForm;
