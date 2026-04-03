"use client";

import React, { useEffect } from "react";
import { USER_ROLES } from "../types/user.types";
import { usePathname, useRouter } from "next/navigation";
import { redirectToRoleDashboard } from "../utils/redirectToRoleDashboard";
import { useAuth } from "../features/auth/hooks/useAuth";

type PropType = {
  children: React.ReactNode;
  role: USER_ROLES;
};

const ProtectedLayout = ({ children, role }: PropType) => {
  console.log("PROTECTED LAYOUT");
  const { user, isLoading, isError } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isProfileCompletePage = pathname === "/profile-complete";
  console.log(user)
  useEffect(() => {
    if (isLoading) return;
    if (isError || !user) {
      console.log("REDIRECT TO LOGIN");
      router.replace("/login");
      return;
    }
    if (!isProfileCompletePage && !user.isProfileComplete) {
      router.replace("/profile-complete");
      return;
    }
    if (user.role !== role) {
      console.log("HITTTT");
      redirectToRoleDashboard(user.role);
      return;
    }
  }, [isError, router, role, isLoading, user]);

  if (isLoading) {
    return <p className="text-black">"Loading..."</p>;
  }

  if (!isProfileCompletePage && !user?.isProfileComplete) {
    return null;
  }

  if (!user || user.role !== role) {
    console.log("x");
    return null;
  }

  return <>{children}</>;
};

export default ProtectedLayout;
