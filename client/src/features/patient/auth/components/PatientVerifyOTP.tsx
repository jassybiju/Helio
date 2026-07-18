"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { authService } from "../../services/auth.service";
import VerifyOTPForm from "@/src/features/auth/components/VerifyOTPForm";
import { toast } from "react-toastify";

const PatientVerifyOTP = ({ id, expires }: { id: string; expires: string }) => {
  const router = useRouter();

  // patient implementation for verifying otp
  const handleVerifyOTP = async ({ id, otp }: { id: string; otp: string }) => {
    await authService.verify_otp({ id, otp });
    toast.success("OTP Verified Successfully");
    router.push("/login");
  };

  const hadnleResendOTP = async ({ id }: { id: string }) => {
    const res = (await authService.resend_otp({ id })) as {
      data: { invalidAt: string };
    };
    toast.success("OTP Resent Successfully");

    router.replace(`/verify-otp?otpId=${id}&expires=${res.data.invalidAt}`);
  };
  return (
    <VerifyOTPForm
      id={id}
      otp_invalid_at={expires}
      verifyOTP={handleVerifyOTP}
      resendOTP={hadnleResendOTP}
    />
  );
};

export default PatientVerifyOTP;
