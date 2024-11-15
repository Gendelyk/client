"use client";

import React, { FC, useEffect } from "react";
import { useCurrentUser } from "../hooks";
import { LogoutButton } from "@modules/auth/components";
import { useRouter } from "next/navigation";
import { queryClient } from "@modules/core/queryClient";

export const ProfileScreen: FC = () => {
  const router = useRouter();

  if(queryClient.getQueryData(['currentUse']) === undefined) {
    router.replace('/login');
    return;
  }

  const { user } = useCurrentUser();

  return (
  <>
    <div>Hello, {user?.email}</div>
    <LogoutButton />
  </>
  );
};
