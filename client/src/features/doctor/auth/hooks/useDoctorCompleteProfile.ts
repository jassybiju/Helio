'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {  DoctorCompleteProfileFormData, doctorCompleteProfileSchema } from "../schema/profile.schema";
import { useRouter } from "next/navigation";
import axios from "axios";
import { invalidateQuery } from "@/src/libs/queryClient";
import { doctorProfileService } from "../../services/profile.service";

export const useDoctorCompleteProfile = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    setError,
    handleSubmit,
    reset
  } = useForm({
    resolver: zodResolver(doctorCompleteProfileSchema),
  });

  const router = useRouter()
  console.log(errors)
  const onSubmit =async (data : DoctorCompleteProfileFormData) => {
    try {
      const res = await doctorProfileService.completeProfile(data)
      reset()
      invalidateQuery('me')
      router.replace('/')
    } catch (error) {
       if (axios.isAxiosError(error)) {
        setError( 'root',
          {message : error.response?.data?.message || "Complete Profile Failed"}
        );
      } else {
        setError('root', {message : "Unexpected error occurred"});
      }
    }
  }


  return {
    register,
    errors,
    onSubmit : handleSubmit(onSubmit),
    isSubmitting
  }
};
