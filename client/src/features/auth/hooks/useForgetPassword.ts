import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  ForgetPasswordData,
  forgetPasswordSchema,
} from "../schema/auth.schema";
import axios from "axios";
import { toast } from "react-toastify";

export const useForgetPassword = ({
  forgetPassword,
}: {
  forgetPassword: ({ email }: { email: string }) => Promise<unknown>;
}) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(forgetPasswordSchema),
  });
  console.log(forgetPassword);
  const onSubmit = async (data: ForgetPasswordData) => {
    try {
      const res = await forgetPassword(data);
      reset();
      toast.success("New Password Email send successfully");
      return res;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError("root", {
          message: error.response?.data.message || "Something went wrong",
        });
      } else {
        console.log(error);
        setError("root", { message: "An Error occured. Please try again" });
      }
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
  };
};
