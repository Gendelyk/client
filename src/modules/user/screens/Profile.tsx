"use client";

import React, { FC, useEffect } from "react";
import { useCurrentUser } from "../hooks";
import { LogoutButton } from "@modules/auth/components";
import { useRouter } from "next/navigation";

export const ProfileScreen: FC = () => {
  const router = useRouter();    
  const tokenCookie = document.cookie.split('; ').find(row => row.startsWith('accessToken='));    

  useEffect(() => {            
    if (!tokenCookie || tokenCookie.split('=')[1] === '') {
      router.replace('/login');
    }
  }, [router, tokenCookie]);

  const { user } = useCurrentUser();
  if (user && !user?.email) {
    alert(typeof user)
  }

  return user?.id && (
  <>
    <div>Hello, {user?.email}</div>
    <LogoutButton />
  </>
  );
};
