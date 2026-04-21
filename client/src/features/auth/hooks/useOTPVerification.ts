import { useForm } from "react-hook-form";
import { OTPFormData, otpSchema } from "../schema/OTP.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import axios from "axios";

export const useOTPVerification = (
  otpId: string,
  otpInvalidAt: string,
  verifyOTP: ({ id, otp }: { id: string; otp: string }) => Promise<unknown>,
  resendOTP: ({ id }: { id: string }) => Promise<unknown>,
) => {
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [resendLoading, setResendLoading] = useState(false);

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "", id: otpId },
  });

  const otpValue = watch("otp");

  useEffect(() => {
    if (!otpInvalidAt) return;
    const calculateRemainingTime = () => {
      const now = new Date().getTime();
      const expiryTime = new Date(Number(otpInvalidAt)).getTime();
      const remaining = Math.max(0, Math.floor((expiryTime - now) / 1000));
      console.log(otpInvalidAt);
      setSecondsRemaining(remaining);
      return remaining;
    };

    calculateRemainingTime();

    const interval = setInterval(() => {
      const remaining = calculateRemainingTime();
      if (remaining == 0) {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [otpInvalidAt]);

  const onSubmit = async (data: OTPFormData) => {
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const response = await verifyOTP({
        id: otpId,
        otp: data.otp,
      });

      setSubmitSuccess(true);
      reset();
      return response;
    } catch (error) {
      console.log(error, axios.isAxiosError(error));

      if (axios.isAxiosError(error)) {
        setSubmitError(error.response?.data?.message || "Registration failed");
      } else {
        setSubmitError("Unexpected error occurred");
      }
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    setSubmitError(null);
    try {
      await resendOTP({ id: otpId });

      reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setSubmitError(error.response?.data.message || "Resend Failed");
      }
    } finally {
      setResendLoading(false);
    }
  };

  const formatTimeRemaining = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} : ${secs.toString().padStart(2, "0")}`;
  };

  const isExpired = secondsRemaining === 0;

  return {
    otpValue,
    setValue,
    otpFormSubmit: handleSubmit(onSubmit),
    otpVerifySubmitting: isSubmitting,
    onSubmit,
    errors,
    submitError,
    submitSuccess,
    secondsRemaining,
    handleResendOTP,
    isResending: resendLoading == true,
    formatTimeRemaining,
    isExpired,
  };
};
