"use client";

import { useRouter } from "next/navigation";
import React, { FC, FormEventHandler } from "react";
import { useState } from "react";
import { hasErrors } from "@modules/core/utils";
import { useCreateCategory, useUpdateCategory } from "../hooks";
import { Category } from "../types";

export const EditCategoryForm: FC<{ category: Category }> = ({ category }) => {
  const [title, setTitle] = useState(category.title);  
  const router = useRouter();

  const { updateCategory } = useUpdateCategory();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    try {
      event.preventDefault();
      
      const response = await updateCategory({ data: { title, status: 'active' }, path: { id: category.id } });

      if (response !== undefined && hasErrors(response)) {
        return;
      }      

      router.replace(`/categories/${category.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
      <button type="submit">Enter</button>
    </form>
  );
};
