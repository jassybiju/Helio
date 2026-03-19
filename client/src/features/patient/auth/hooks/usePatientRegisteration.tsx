'use client'

import { useForm, useWatch } from "react-hook-form";
import {
  patientRegisterSchema,
  PatientRegistrationFormData,
} from "../schemas/registration.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "../services/auth.service";
import { useState } from "react";
import axios from "axios";

export const usePatientRegistration = () => {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
    control
  } = useForm<PatientRegistrationFormData>({
    resolver: zodResolver(patientRegisterSchema),
    mode: "onBlur",
  });

  const dobValue = useWatch({
    control,
    name : "dob"
  });

  const onSubmit = async (data: PatientRegistrationFormData) => {
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      await authService.register(data);
      setSubmitSuccess(true);
      reset();
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
