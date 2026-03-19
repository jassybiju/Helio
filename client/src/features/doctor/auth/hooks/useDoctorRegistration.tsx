import axios from "axios";
import { authService } from "../services/auth.service";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DoctorRegisterFormData, doctorRegisterSchema } from "../schema/registration.schema";
import { useState } from "react";

export const useDoctorRegistration = () => {
   const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
    control //remove
  } = useForm<DoctorRegisterFormData>({
    resolver : zodResolver(doctorRegisterSchema)
  });

  const v =  useWatch({
    control,
    name : "document"
  })
  console.log(v)

  const onSubmit = async (data: DoctorRegisterFormData) => {
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
   
      await authService.register(data);

      setSubmitSuccess(true);
      reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setSubmitError(
          error.response?.data?.message || "Registration failed"
        );
      } else {
        setSubmitError("Unexpected error occurred");
      }
    }
  };

  return {
    register,
    handleSubmit,
    setValue,
    errors,
    isSubmitting,
    submitError,
    submitSuccess,
    onSubmit: handleSubmit(onSubmit),
  };
}