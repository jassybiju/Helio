"use client";
import React, { useEffect } from "react";
import {  useRouter } from "next/navigation";
import { getSubdomain } from "../utils/getSubdomain";
import { redirectToRole } from "../utils/redirectToRole";
import { getExpectedSubdomain } from "../utils/getExpectedSubdomain";
import { useAuth } from "../features/auth/hooks/useAuth";

type PropType = {
  children: React.ReactNode;
};

const GuestLayout = ({ children }: PropType) => {
  console.log("REDIRECTED to GUEST");
  const { user, isLoading, isError } = useAuth();
  console.log(user,isLoading, isError)
  const router = useRouter();
  useEffect(() => {
    console.log("ISSUES")
    if (isLoading) return;
    if (isError || !user) {
      return;
    }

    const currentSubdomaian = getSubdomain();
    const expectedSubdomain = getExpectedSubdomain(user.role);
    if (currentSubdomaian !== expectedSubdomain) {
      redirectToRole(user.role,'/');
    } else {
      router.replace("/");
    }
  }, [user, isLoading, isError,router]);

  if (isLoading) {
    return "is Loading.....";
  }

  // if(isError){
  //   return 'hi'
  // }

  if (user) {
    return null;
  }

  return <>{children}</>;
};

export default GuestLayout;
