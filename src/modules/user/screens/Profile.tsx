"use client";

import React, { FC } from "react";
import { useCurrentUser } from "../hooks";
import { LogoutButton } from "@modules/auth/components";

export const ProfileScreen: FC = () => {
  const { user } = useCurrentUser();

  return (
  <>
    <div>Hello, {user?.email}</div>
    <LogoutButton />
  </>
  );
};
