"use client";

import React, { useEffect } from "react";
import { DOCTOR_STATUS, USER_ROLES } from "../types/user.types";
import { usePathname, useRouter } from "next/navigation";
import { redirectToRole } from "../utils/redirectToRole";
import { useAuth } from "../features/auth/hooks/useAuth";
import { getSubdomain } from "../utils/getSubdomain";
import { getExpectedSubdomain } from "../utils/getExpectedSubdomain";

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
  const isPendingApprovalsPage = pathname === "/pending-approval";

  useEffect(() => {
    if (isLoading) return;
    if (isError || !user) {
      router.replace("/login");
      return;
    }

    const currentSubdomain = getSubdomain();
    const expectedSubdomain = getExpectedSubdomain(user.role);

    if (currentSubdomain !== expectedSubdomain) {
      redirectToRole(user.role, pathname);
      return;
    }

    if (!isProfileCompletePage && !user.isProfileComplete) {
      redirectToRole(user.role, "/profile-complete");
      return;
    }

    if (
      user.role === USER_ROLES.DOCTOR &&
      user.isProfileComplete &&
      user.status !== DOCTOR_STATUS.APPROVED &&
      !isPendingApprovalsPage
    ) {
      console.log("REDIREECEREFJALDKFDSLFK");
      redirectToRole(user.role, "/pending-approval");
      return;
    }
    if (user.role !== role) {
      console.log("HITTTT");
      redirectToRole(user.role, "/");
      return;
    }
  }, [
    isError,
    router,
    role,
    isLoading,
    user,
    pathname,
    isPendingApprovalsPage,
    isProfileCompletePage,
  ]);

  if (isLoading) {
    return <p className="text-black">"Loading..."</p>;
  }

  if (!user) {
    return;
  }

  if (!isProfileCompletePage && !user?.isProfileComplete) {
    return null;
  }

  if (
    user.role === USER_ROLES.DOCTOR &&
    user.isProfileComplete &&
    user.status !== DOCTOR_STATUS.APPROVED &&
    !isPendingApprovalsPage
  ) {
    return null;
  }

  if (!user || user.role !== role) {
    console.log("x");
    return null;
  }

  return <>{children}</>;
};

export default ProtectedLayout;
