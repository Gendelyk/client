"use client";

import { useRouter } from "next/navigation";
import React, { FC, FormEventHandler, use, useEffect } from "react";
import { useState } from "react";
import { hasErrors } from "@modules/core/utils";
import { useCreatePost } from "../hooks";
import { useGetAllCategories } from "@modules/categories/hooks";
import { SelectPostCategory } from "./SelectPostCategory";
import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useCurrentUser } from "@modules/user/hooks";
import { Loader } from "@modules/common/components";

export const CreatePostForm: FC = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [categoryId, setCategoryId] = useState(0);  
  const { categories } = useGetAllCategories();
  const { createPost } = useCreatePost();  
  const router = useRouter();
  
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    try {
      event.preventDefault();
      
      const response = await createPost({ data: { title, body, categoryId } });

      // if (response === undefined || response.isError) {
      //   return;
      // }      
      router.replace(`/home`);
    } catch (error) {
      console.error(error);
    }
  };

  // return categories !== null ? (
  //   <form onSubmit={handleSubmit}>
  //     {selectCategory}
  //     <div>
  //       <label>Title:</label>
  //       <input
  //         type="text"
  //         value={title}
  //         onChange={(e) => setTitle(e.target.value)}
  //         required
  //       />
  //     </div>
  //     <div>
  //       <label>Body:</label>
  //       <input
  //         type="text"
  //         value={body}
  //         onChange={(e) => setBody(e.target.value)}
  //         required
  //       />
  //     </div>
  //     {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
  //     <Button type="submit">Enter</Button>
  //   </form>
  // ) : <div>Loading...</div>;
  return categories === null ? <Loader /> : (
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
      {/* Вибір категорії */}
      <SelectPostCategory categories={categories} categoryId={categoryId} setCategoryId={setCategoryId}/>

      {/* Назва поста */}
      <TextField
        label="Назва поста"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      {/* Тіло поста */}
      <TextField
        label="Тіло поста"
        variant="outlined"
        fullWidth
        multiline
        rows={6}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />

      {/* Кнопка створення */}
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Опублікувати пост
      </Button>
    </Box>
  );
};
