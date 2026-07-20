import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ResetPasswordData, resetPasswordSchema } from "../schema/auth.schema";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

export const useResetPassword = ({
  resetPassword,
}: {
  resetPassword: ({
    token,
    password,
  }: {
    token: string;
    password: string;
  }) => Promise<unknown>;
}) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") as string;
  const onSubmit = async (data: ResetPasswordData) => {
    try {
      const res = await resetPassword({ token, password: data.password });
      reset();
      router.replace("/");
      toast.success("Password Changed Succesfully");
      return res;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError("root", {
          message: error.response?.data.message || "Something went wrong",
        });
      } else {
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
