"use client";

import React, { FC } from "react";
import { useCurrentUser } from "../hooks";

export const ProfileScreen: FC = () => {
  const { user } = useCurrentUser();

  return <div>Hello, {user?.email}</div>;
};
