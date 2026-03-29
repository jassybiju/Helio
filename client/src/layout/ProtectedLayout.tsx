"use client";

import React, { useEffect } from "react";
import { USER_ROLES } from "../types/user.types";
import { useMe } from "../features/auth/hooks/useMe";
import { useRouter } from "next/navigation";
import { redirectToRoleDashboard } from "../utils/redirectToRoleDashboard";

type PropType = {
  children: React.ReactNode;
  role: USER_ROLES;
};

const ProtectedLayout = ({ children, role }: PropType) => {
  console.log("PROTECTED LAYOUT")
  const { data , isLoading, isError } = useMe();
  const router = useRouter();

  useEffect(() => {
    if(isLoading) return 
    if(isError || !data){
      console.log('REDIRECT TO LOGIN')
      router.replace('/login')
      return
    }
    if(data?.data.role !== role ){
      console.log("HITTTT")
      redirectToRoleDashboard(data.data.role)
      return
    }
    
  }, [isError, router, role, isLoading,data]);

  if (isLoading) {
    return "Loading...";
  }
  console.log(data)

  if (!data || data.data.role !== role) {
    console.log('x')
    return null;
  }

  return <>{children}</>;
};

export default ProtectedLayout;
