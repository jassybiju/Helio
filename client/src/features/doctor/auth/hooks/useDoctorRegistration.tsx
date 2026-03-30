import axios from "axios";
import { authService } from "../services/auth.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DoctorRegisterFormData, doctorRegisterSchema } from "../schema/auth.schema";
import { useState } from "react";
import { useRouter } from "next/navigation";


  type IRegisterResponse = {
    message : string,
    data : {
      id : string
      otp_invalid_at : string
    }
  }

export const useDoctorRegistration = () => {
   const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<DoctorRegisterFormData>({
    resolver : zodResolver(doctorRegisterSchema)
  });

  const router = useRouter()


  const onSubmit = async (data: DoctorRegisterFormData) => {
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
   
      const res  = await authService.register(data) as IRegisterResponse;

      setSubmitSuccess(true);
      reset();
      router.push(`/verify-otp?otpId=${res.data.id}&expires=${res.data.otp_invalid_at                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                }`)
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