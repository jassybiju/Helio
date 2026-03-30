"use client";

import React, { useEffect } from "react";
import { USER_ROLES } from "../types/user.types";
import { useRouter } from "next/navigation";
import { redirectToRoleDashboard } from "../utils/redirectToRoleDashboard";
import { useAuth } from "../features/auth/hooks/useAuth";

type PropType = {
  children: React.ReactNode;
  role: USER_ROLES;
};

const ProtectedLayout = ({ children, role }: PropType) => {
  console.log("PROTECTED LAYOUT")
  const { user , isLoading, isError } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if(isLoading) return 
    if(isError || !user){
      console.log('REDIRECT TO LOGIN')
      router.replace('/login')
      return
    }
    if(user.role !== role ){
      console.log("HITTTT")
      redirectToRoleDashboard(user.role)
      return
    }
    
  }, [isError, router, role, isLoading,user]);

  if (isLoading) {
    return "Loading...";
  }

  if (!user || user.role !== role) {
    console.log('x')
    return null;
  }

  return <>{children}</>;
};

export default ProtectedLayout;
