import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "../schema/auth.schema";
import axios from "axios";

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

  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log('Started', login)
      const res = await login(data);
      console.log("Finished")
      reset();
      return res;
    } catch (error) {
      console.log(error)
      if (axios.isAxiosError(error)) {
        setError(
          "root",
          error.response?.data.message || "Something went wrong",
        );
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
