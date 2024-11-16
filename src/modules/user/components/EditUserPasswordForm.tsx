"use client";

import { useRouter } from "next/navigation";
import React, { FC, FormEventHandler } from "react";
import { useState } from "react";
import { hasErrors } from "@modules/core/utils";
import { useCurrentUser, useUpdateUser } from "../hooks";
import { getMe } from "../api";

export const EditUserFirstNameForm: FC = async () => {
  const router = useRouter();
  
  const { updateUser } = useUpdateUser();
  const user = await getMe({});
  if (user.isError) {
    return;
  }
  const [oldPassword, setOldPassword] = useState("");  
  const [newPassword, setNewPassword] = useState("");    
  
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    try {
      event.preventDefault();
      
      const response = await updateUser({ data: { id: user.data.id, firstName: user.data.firstName, lastName: user.data.lastName, oldPassword, newPassword } });

      if (response !== undefined && hasErrors(response)) {
        return;
      }      

      router.replace('/profile');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Old password:</label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label>New password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>
      {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
      <button type="submit">Enter</button>
    </form>
  );
};
