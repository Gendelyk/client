"use client";

import { useRouter } from "next/navigation";
import React, { FC, FormEventHandler } from "react";
import { useState } from "react";
import { hasErrors } from "@modules/core/utils";
import { useCreatePost } from "../hooks";
import { useGetAllCategories } from "@modules/categories/hooks";
import { SelectPostCategory } from "./SelectPostCategory";

export const CreatePostForm: FC = () => {  
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const router = useRouter();
  const { categories } = useGetAllCategories();
  let selectCategory: React.ReactNode;
  const { createPost } = useCreatePost();

  if (categories != null) {
    selectCategory = <SelectPostCategory categories={categories} categoryId={categoryId} setCategoryId={setCategoryId}/>
  }

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

  return categories !== null ? (
    <form onSubmit={handleSubmit}>
      {selectCategory}
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Body:</label>
        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
      </div>
      {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
      <button type="submit">Enter</button>
    </form>
  ) : <div>Loading...</div>;
};
