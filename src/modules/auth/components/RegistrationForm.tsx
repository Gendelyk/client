"use client";

import { useRouter } from "next/navigation";
import React, { FormEvent, FormEventHandler, MouseEventHandler } from "react";
import { useState } from "react";
import { useRegister } from "../hooks";
import { hasErrors } from "@modules/core/utils";
import { Card, CardContent, Typography, TextField, Box, Button, CircularProgress } from "@mui/material";

export const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const { register } = useRegister();

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (event) => {
    try {
      event.preventDefault();          

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
    <Card sx={{ width: 400, padding: 2 }}>
      <CardContent>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Реєстрація
        </Typography>
        <TextField
          fullWidth
          label="Ім'я"
          variant="outlined"
          margin="normal"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Прізвище"
          variant="outlined"
          margin="normal"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
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
            Реєстрація
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
