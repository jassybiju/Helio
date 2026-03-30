import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "../schema/auth.schema";
import axios from "axios";
import {  useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLogin = ({
  login,
}: {
  login: ({
    email,
    password,
  }: {
    email: string;
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
    resolver: zodResolver(loginSchema),
  });
  const queryClient = useQueryClient()
  const router = useRouter()

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await login(data);
      reset();
      queryClient.invalidateQueries({queryKey : ['me']})
      router.replace('/')
      return res;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          "root",
          {message : 
          error.response?.data.message || "Something went wrong",

           }
        );
      } else {
        console.log(error)
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
