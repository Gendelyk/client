"use client";

import { useRouter } from "next/navigation";
import React, { FormEventHandler } from "react";
import { useState } from "react";
import { hasErrors } from "@modules/core/utils";
import { useCreateCategory } from "../hooks";
import { Box, TextField, Button } from "@mui/material";

export const CreateCategoryForm = () => {
  const [title, setTitle] = useState("");  
  const router = useRouter();

  const { createCategory } = useCreateCategory();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    try {
      event.preventDefault();
      
      const response = await createCategory({ data: { title } });

      // if (response !== undefined && hasErrors(response)) {
      //   return;
      // }      
      router.replace('/home');
    } catch (error) {
      console.error(error);
    }
  };

  return  (
    <Box
    component="form"
    onSubmit={handleSubmit}
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: 3,
      width: "100%",
      maxWidth: "500px",
      p: 4,
      border: "1px solid #ccc",
      borderRadius: "8px",
      backgroundColor: "#fff",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    }}
  >        
    
    <TextField
      label="Назва категорії"
      variant="outlined"
      fullWidth
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      required
    />
    
    <Button type="submit" variant="contained" color="primary" fullWidth>
      Створити
    </Button>
  </Box>
  );
};
