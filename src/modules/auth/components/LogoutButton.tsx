"use client";

import { useRouter } from "next/navigation";
import React, { FormEventHandler, MouseEventHandler } from "react";
import { useLogout } from "../hooks";
import { hasErrors } from "@modules/core/utils";
import { Button } from "@mui/material";

export const LogoutButton = () => {
  const router = useRouter();

  const { logout } = useLogout();

  const handleLogout: MouseEventHandler<HTMLButtonElement> = logout;

  return (
    <Button variant="outlined" color="error" onClick={handleLogout}>
      Вийти
    </Button>
  );
};
