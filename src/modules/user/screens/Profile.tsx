"use client";

import React, { FC, useEffect } from "react";
import { useCurrentUser } from "../hooks";
import { LogoutButton } from "@modules/auth/components";
import { useRouter } from "next/navigation";

export const ProfileScreen: FC = () => {
  const router = useRouter();

  useEffect(() => {
    const tokenCookie = document.cookie.split('; ').find(row => row.startsWith('accessToken='));    
    if (!tokenCookie || tokenCookie.split('=')[1] === '') {
      router.push('/login');
    }
  }, []);

  const { user } = useCurrentUser();

  return (
  <>
    <div>Hello, {user?.email}</div>
    <LogoutButton />
  </>
  );
};
