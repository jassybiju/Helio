"use client";

import { useForm, useWatch } from "react-hook-form";
import {
  patientRegisterSchema,
  PatientRegistrationFormData,
} from "../schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "../../services/auth.service";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type IRegisterResponse = {
  message: string;
  data: {
    id: string;
    otp_invalid_at: string;
  };
};

export const usePatientRegistration = () => {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<PatientRegistrationFormData>({
    resolver: zodResolver(patientRegisterSchema),
    mode: "onBlur",
  });

  const dobValue = useWatch({
    control,
    name: "dob",
  });

  const onSubmit = async (data: PatientRegistrationFormData) => {
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const res = (await authService.register(data)) as IRegisterResponse;
      setSubmitSuccess(true);
      reset();
      router.push(
        `/verify-otp?otpId=${res.data.id}&expires=${res.data.otp_invalid_at}`,
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setSubmitError(error.response?.data.message || "Something Went wrong");
      } else {
        setSubmitError("An error occurred. Please try again.");
      }
    }
  };

  return {
    register,
    handleSubmit,
    setValue,
    errors,
    reset,
    isSubmitting,
    submitError,
    submitSuccess,
    dobValue,
    onSubmit: handleSubmit(onSubmit),
  };
};
