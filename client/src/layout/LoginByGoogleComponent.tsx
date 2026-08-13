"use client";

import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import React from "react";
import { GoogleLoginFn } from "../features/auth/types/auth.types";
import { toast } from "react-toastify";
import { getRuntimeConfig } from "../libs/config";

const LoginByGoogleComponent = ({
  googleLogin,
}: {
  googleLogin: GoogleLoginFn;
}) => {
  const handleLoginSuccess = async (
    credientialResponse: CredentialResponse,
  ) => {
    try {
      await googleLogin(credientialResponse.credential!);
      toast.success('Google Login Success')
    } catch  {
      toast.error("Google Login Error")
    }
  };
  const handleLoginError = () => {
    console.log("Login Failed");
  };

  const CLIENT_ID = getRuntimeConfig()

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID.googleClientID!}>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
      ></GoogleLogin>
    </GoogleOAuthProvider>
  );
};

export default LoginByGoogleComponent;
