"use client";

import { useRouter } from "next/navigation";
import React, { FormEventHandler, MouseEventHandler } from "react";
import { useState } from "react";
import { useLogin } from "../hooks";
import { hasErrors } from "@modules/core/utils";
import { SelectPostCategory } from "@modules/posts/components";
import { Box, TextField, Button, Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { title } from "process";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");  
  const router = useRouter();

  const { login } = useLogin();

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (event) => {
    try {
      event.preventDefault();

      const response = await login({ data: { email, password } });

      if (response !== undefined && hasErrors(response)) {
        return;
      }

      router.push("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <div>
    //     <label>Email:</label>
    //     <input
    //       type="email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       required
    //     />
    //   </div>
    //   <div>
    //     <label>Password:</label>
    //     <input
    //       type="password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       required
    //     />
    //   </div>
    //   {error && <p style={{ color: "red" }}>{error}</p>}
    //   <button type="submit">Enter</button>
    // </form>
    <Card sx={{ width: 400, padding: 2 }}>
      <CardContent>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Вхід
        </Typography>
        <TextField
          fullWidth
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Пароль"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}            
          >
            Вхід
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
