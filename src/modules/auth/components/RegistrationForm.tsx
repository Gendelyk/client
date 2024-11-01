"use client";

import { useRouter } from "next/navigation";
import React, { FormEvent, FormEventHandler } from "react";
import { useState } from "react";
import { useRegister } from "../hooks";
import { hasErrors } from "@modules/core/utils";

export const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    try {
      event.preventDefault();    

      const { register } = useRegister();

      const response = await register({ data: { email, password, firstName, lastName } })

      if (response !== undefined && hasErrors(response)) {
        return;
      }

      router.push("/profile") 
    } catch (error) {
      console.log(error);
    }    
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Enter</button>
    </form>
  );
};
