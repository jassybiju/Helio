"use client";
import React from "react";
import { authService } from "../services/auth.service";
import LoginForm from "../../auth/components/LoginForm";
import { useRouter } from "next/navigation";

const AdminLoginForm = () => {
  const router = useRouter();
  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    await authService.login({ email, password });
    router.replace("/");
  };
  return <LoginForm login={handleLogin} />;
};

export default AdminLoginForm;
