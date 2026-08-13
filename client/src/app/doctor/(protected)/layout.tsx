'use client'


import ProtectedLayout from "@/src/layout/ProtectedLayout";
import { USER_ROLES } from "@/src/types/user.types";
import React from "react";

type PropType = {
  children: React.ReactNode;
};

const layout = ({ children }: PropType) => {
  return <ProtectedLayout role={USER_ROLES.DOCTOR}>{children}</ProtectedLayout>;
};

export default layout;
