"use client";

import { useRouter } from "next/navigation";
import React, { FormEventHandler, MouseEventHandler } from "react";
import { useLogout } from "../hooks";
import { hasErrors } from "@modules/core/utils";

export const LogoutButton = () => {
  const router = useRouter();

  const { logout } = useLogout();

  const handleLogout: MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      const response = await logout();

      if (hasErrors(response!)) {
        return;
      }

      router.push("/home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};
