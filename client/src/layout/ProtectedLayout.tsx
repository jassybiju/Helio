"use client";

import React, { useEffect } from "react";
import { DOCTOR_STATUS, USER_ROLES } from "../types/user.types";
import { usePathname, useRouter } from "next/navigation";
import { redirectToRole } from "../utils/redirectToRole";
import { useAuth } from "../features/auth/hooks/useAuth";
import { getSubdomain } from "../utils/getSubdomain";
import { getExpectedSubdomain } from "../utils/getExpectedSubdomain";
import { socket } from "../libs/socket";
import {  useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type PropType = {
  children: React.ReactNode;
  role: USER_ROLES;
};

const ProtectedLayout = ({ children, role }: PropType) => {
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
    if (user.role !== role) {
      redirectToRole(user.role, "/");
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
      redirectToRole(user.role, "/pending-approval");
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

  // * SOCKET FOR NOTIFICATION
  const queryClient = useQueryClient()
  useEffect(() => {
    if (!user) return;
    toast.success("!@#")
    const handler = () => {
      toast.success("NOTIFICATION")
      console.log("!@#!@LJDFLDSKFJL")
      queryClient.invalidateQueries({queryKey : ['notification']})
      // queryClient.setQueryData(
      //   ["notification"],
      //   (old: InfiniteData<any> | undefined) => {
      //     if (!old) return old;
      //     return {
      //       ...old,
      //       pages: old.pages.map((page, index) =>
      //         index === 0
      //           ? {
      //               ...page,
      //               data: {
      //                 ...page.data,
      //                 notifications: [notification, ...page.data.notifications],
      //               },
      //             }
      //           : page,
      //       ),
      //     };
      //   },
      // );
    };

    socket.on("notification:new", handler);
    return () => {
      socket.off("notification:new");
    };
  }, [user, queryClient]);
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
    return null;
  }

  return <>{children}</>;
};

export default ProtectedLayout;
