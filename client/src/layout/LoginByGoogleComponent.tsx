"use client";

import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import React from "react";
import { GoogleLoginFn } from "../features/auth/types/auth.types";

const LoginByGoogleComponent = ({
  googleLogin,
}: {
  googleLogin: GoogleLoginFn;
}) => {
  const handleLoginSuccess = async (
    credientialResponse: CredentialResponse,
  ) => {
    try {
      console.log("Token:", credientialResponse);
      await googleLogin(credientialResponse.credential!);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
  const handleLoginError = () => {
    console.log("Login Failed");
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
      ></GoogleLogin>
    </GoogleOAuthProvider>
  );
};

export default LoginByGoogleComponent;
