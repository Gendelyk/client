"use client";

import React, { FC, useEffect } from "react";
import { useCurrentUser } from "../hooks";
import { LogoutButton } from "@modules/auth/components";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const ProfileScreen: FC = () => {  
  const { user } = useCurrentUser();

  return user !== null ? (
  <>
    <div>Hello, {user.firstName} {user.lastName}</div>
    <Link href={'/profile/change-name'}>Change name</Link>
    <Link href={'/profile/change-password'}>Change password</Link>
    <LogoutButton />
  </> 
  ) : <div>Loading...</div>;
};
