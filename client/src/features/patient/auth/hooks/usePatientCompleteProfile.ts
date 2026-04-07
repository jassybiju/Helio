import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { PatientCompleteProfileFormData, patientCompleteProfileSchema } from "../schemas/profile.schema";
import { profileService } from "../services/profile.service";
import { invalidateQuery } from "@/src/libs/queryClient";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

export const usePatientCompleteProfile = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
    setValue,
    setError,
    reset,
  } = useForm({resolver : zodResolver(patientCompleteProfileSchema)});

  const router = useRouter();

  const onSubmit = async (data: PatientCompleteProfileFormData) => {
    try {
      const res = await profileService.completeProfile(data);
      reset();
      invalidateQuery("me");
      toast.success("Patient Profile Completed")
      router.replace("/dashboard");
    } catch (error) {
      console.log(error)
      if (axios.isAxiosError(error)) {
        setError("root", {
          message: error.response?.data?.message || "Complete Profile Failed",
        });
      } else {
        setError("root", { message: "Unexpected error occured" });
      }
    }
  };

  const dobValue = useWatch({name : "dob", control})

  return {
    register,
    errors,
    onSubmit: handleSubmit(onSubmit),
    isSubmitting,
    setValue,
    dobValue
  };
};
