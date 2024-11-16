"use client";

import { useRouter } from "next/navigation";
import React, { FC, FormEventHandler } from "react";
import { useState } from "react";
import { hasErrors } from "@modules/core/utils";
import { useCurrentUser, useUpdateUser } from "../hooks";
import { getMe } from "../api";

export const EditUserNameForm: FC = () => {
  const router = useRouter();
  
  const { updateUser } = useUpdateUser();
  const { user } = useCurrentUser();

  if (!user?.id) {
    return;
  }

  const [firstName, setFirstName] = useState(user.firstName);  
  const [lastName, setLastName] = useState(user.lastName);  
  const [password, setPassword] = useState("");    
  
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    try {
      event.preventDefault();
      
      const response = await updateUser({ data: { id: user.id, firstName, lastName, oldPassword: password, newPassword: password } });

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
        <label>First name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Last name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
      <button type="submit">Enter</button>
    </form>
  );
};
