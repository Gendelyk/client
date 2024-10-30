"use client";

import { useRouter } from "next/navigation";
import React, { FormEventHandler } from "react";
import { useState } from "react";
import { useLogin } from "../hooks";
import { hasErrors } from "@modules/core/utils";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const { login } = useLogin();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    try {
      event.preventDefault();

      const response = await login({ data: { email, password } });

      if (hasErrors(response!)) {
        return;
      }

      router.push("/profile");
    } catch (error) {
      console.error(error);
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
