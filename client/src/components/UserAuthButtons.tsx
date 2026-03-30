"use client";

import Link from "next/link";
import React from "react";
import ClayButton from "./ui/ClayButton";
import { useLogout } from "../features/auth/hooks/useLogout";
import { useAuth } from "../features/auth/hooks/useAuth";

const UserAuthButtons = () => {
  console.log("RENDERED")
  const data = useAuth();
 const {logout} = useLogout()
  return (
    <div className="flex items-center gap-4">
      {data?.user?.email ? (
        <>
          <ClayButton onClick={logout}>Logout</ClayButton>
        </>
      ) : (
        <>
          <Link href={"/login"}>
            <ClayButton variant="primary" size="md">
              Login
            </ClayButton>
          </Link>

          <Link href={"/register"}>
            <ClayButton variant="secondary" size="md">
              Sign Up
            </ClayButton>
          </Link>
        </>
      )}
    </div>
  );
};

export default UserAuthButtons;
