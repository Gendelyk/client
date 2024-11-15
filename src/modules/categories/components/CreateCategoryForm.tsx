"use client";

import { useRouter } from "next/navigation";
import React, { FormEventHandler } from "react";
import { useState } from "react";
import { hasErrors } from "@modules/core/utils";
import { useCreateCategory } from "../hooks";

export const CreateCategoryForm = () => {
  const [title, setTitle] = useState("");  
  const router = useRouter();

  const { createCategory } = useCreateCategory();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    try {
      event.preventDefault();
      
      const response = await createCategory({ data: { title } });

      if (response !== undefined && hasErrors(response)) {
        return;
      }      
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
